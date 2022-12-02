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
  IonTitle,
} from '@ionic/react';
import { addOutline, removeOutline, trashOutline } from 'ionicons/icons';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addProduct, removeProduct, selectCart } from '../features/cart/cartSlice';

interface ProductItemProps {
  product: Product
}

const ProductCard: React.FC<ProductItemProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);
  const quantity = cart.items.find(item => item.product.id === product.id)?.quantity || 0;

  function addButton(e: any) {
    e.stopPropagation()
    e.preventDefault();
    dispatch(addProduct(product));
  }
  function removeButton(e: any) {
    e.stopPropagation()
    e.preventDefault();
    dispatch(removeProduct(product));
  }

  return (
    <IonCard color='light' button>
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
                  style={{ zIndex: 1 }}
                  color='primary'
                  size='large'
                  slot="start"
                  onClick={removeButton}
                  icon={quantity === 1 ? trashOutline : removeOutline}
                />
                <IonTitle className='ion-no-padding'><span>{quantity}</span></IonTitle>
                <IonIcon
                  color='primary'
                  size='large'
                  slot="end"
                  onClick={addButton}
                  icon={addOutline}
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
