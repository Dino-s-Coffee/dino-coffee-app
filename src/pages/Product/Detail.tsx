import {
  IonContent,
  IonPage,
  IonButton,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonBackButton,
  IonIcon,
  IonTitle,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonRadioGroup,
  IonRadio,
  IonText
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { heart as heartFill, heartOutline } from 'ionicons/icons';
import { fetchProductById } from '../api/product';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addProduct } from '../../features/cart/cartSlice';
import { toggleProduct, selectFavorite, checkFavorite } from '../../features/favorite/favoriteSlice';
// import styles from './Cart.module.css';

interface ProductDetailPageProps extends RouteComponentProps<{ id: string }> { }

const ProductDetail: React.FC<ProductDetailPageProps> = ({ match }) => {
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<Product>();
  const [isReadMore, setIsReadMore] = useState(true);

  const productId = match.params.id;
  const favorite = useAppSelector(selectFavorite);
  const isFavorite = checkFavorite(favorite.products, productId);

  const sizes = ['Small', 'Medium', 'Large'];

  function toggleFavorite(e: any) {
    e.stopPropagation();
    e.preventDefault();
    product && dispatch(toggleProduct(product));
  }
  useEffect(() => {
    fetchProductById(productId)
      .then(product => {
        if (product) {
          setProduct(product);
        }
      })
  }, [productId]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'><IonBackButton /></IonButtons>
          {product && <IonTitle>{product.name}</IonTitle>}
          <IonIcon
            slot='end'
            color='primary'
            size='large'
            onClick={toggleFavorite}
            icon={isFavorite ? heartFill : heartOutline}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding' >
        {
          product &&
          <>
            <img src={product.image} alt={product.name} />
            <IonCardHeader>
              <IonCardTitle>{product.name}</IonCardTitle>
              <IonCardSubtitle>{product.price}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              {isReadMore ? product.description.slice(0, 80) + '...' : product.description}
              <a onClick={() => setIsReadMore(!isReadMore)}>{isReadMore ? 'read more' : <p>show less</p>}</a>
            </IonCardContent>
          </>
        }
        {product ? (
          <>
            <div>
              <h4>Size<span style={{ color: 'red' }}>*</span></h4>
              <p>Choose one size:</p>
            </div>
            <IonRadioGroup>
              {sizes.map(size => (
                <IonItem key={size}>
                  <IonRadio slot="start" value={size} />
                  <IonLabel>{size}</IonLabel>
                  <IonText slot="end">{product.price}</IonText>
                </IonItem>
              ))}
            </IonRadioGroup>
          </>
        ) : (
          <IonText style={{ textAlign: 'center' }}>No product found</IonText>
        )}
        <IonButton expand="block" onClick={() => product && dispatch(addProduct(product))}>Add to cart</IonButton>
      </IonContent>
    </IonPage >
  );
};
export default ProductDetail;
