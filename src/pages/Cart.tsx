import { IonContent, IonPage, IonButton } from '@ionic/react';
// import styles from './Cart.module.css';

// import Item from '../components/Item';

const Cart: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        {/* <Item src='/assets/imgs/capuchino.png' title='Capuchino' price='10.000 VND' content='Ca phe capuchino ngon'></Item>
        <Item src='/assets/imgs/expresso.png' title='Expresso' price='20.000 VND' content='Ca phe expresso sieu ngon'></Item> */}
        <p>{`Total Price: 30.000 VND`}</p>
        <p>{`Shipping Fee: 5.000 VND`}</p>
        <IonButton>Check out</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Cart;
