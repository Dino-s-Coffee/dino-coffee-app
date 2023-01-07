import {
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonCard,
  IonToolbar,
  IonIcon,
  IonCol,
  IonGrid,
  IonRow,
  useIonToast,
} from '@ionic/react';
import { heart as heartFill, heartOutline } from 'ionicons/icons';
import { toggleProduct, selectFavorite, checkFavorite } from '../features/favorite/favoriteSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

interface ProductItemProps {
  product: Product
}

const ProductCard: React.FC<ProductItemProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const favorite = useAppSelector(selectFavorite);
  const isFavorite = checkFavorite(favorite.products, product.id);
  const [present] = useIonToast();

  function toggleFavorite(e: any) {
    present({
      message: isFavorite ? 'Removed from favorites' : 'Added to favorites',
      duration: 1500,
      color: isFavorite ? 'danger' : 'success',
      position: 'top',
    });
    e.stopPropagation()
    e.preventDefault();
    dispatch(toggleProduct(product));
  }

  return (
    <IonCard button routerLink={`/product/detail/${product.id}`} color='light' >
      <IonGrid>
        <IonRow>
          <IonCol size="4">
            <img src={product.image} alt={product.name} />
          </IonCol>
          <IonCol size="8">
            <IonCardHeader>
              <IonCardTitle>{product.name}</IonCardTitle>
              <IonCardSubtitle>{product.basePrice}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonToolbar color='light'>
                <IonIcon
                  color='primary'
                  size='large'
                  onClick={toggleFavorite}
                  slot="end"
                  icon={isFavorite ? heartFill : heartOutline}
                />
              </IonToolbar>
            </IonCardContent>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCard>
  );
};

export default ProductCard;
