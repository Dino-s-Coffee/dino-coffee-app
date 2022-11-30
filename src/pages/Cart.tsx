import {
  IonContent,
  IonPage,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonFooter,
  IonText,
  IonIcon
} from '@ionic/react';
import { chevronForwardOutline } from 'ionicons/icons'
import {
  addProduct,
  removeProduct,
  selectCart,
} from '../features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import ProductCard from '../components/ProductCard';

const Cart: React.FC = () => {
  const cart = useAppSelector(selectCart);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detail Order</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent >
        {
          cart.items.map((item, index) => {
            return (
              <ProductCard
                key={index}
                product={item.product}
              // quantity={item.quantity}
              />
            )
          })
        }
        
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonText className='ion-margin-start' slot='start'>{`Total Price: ${cart.total}`}</IonText>
          <IonButton slot='end'>Check out<IonIcon icon={chevronForwardOutline}/></IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Cart;
