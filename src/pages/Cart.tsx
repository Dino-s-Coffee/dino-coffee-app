import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import styles from './Cart.module.css';

const Cart: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cart</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

      </IonContent>
    </IonPage>
  );
};

export default Cart;
