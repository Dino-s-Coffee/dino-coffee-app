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
import { selectCart } from '../features/cart/cartSlice';
import { useAppSelector } from '../app/hooks';
import CartCard from '../components/CartCard';

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
          cart.items.length === 0 ? (
            <IonText className="ion-text-center">
              <p>No product in cart</p>
            </IonText>
          ) : (
            <>
              {cart.items.map((item, index) => {
                return (
                  <CartCard
                    key={index}
                    product={item.product}
                  />
                )
              })}
            </>
          )
        }

      </IonContent>
      <IonFooter>
        <IonToolbar className='ion-padding-start ion-padding-end'>
          <IonText slot='start'>{`Total Price: ${cart.total}`}</IonText>
          <IonButton slot='end' routerLink='/checkout'>Check out<IonIcon icon={chevronForwardOutline} /></IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Cart;
