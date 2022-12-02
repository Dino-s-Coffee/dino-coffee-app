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

const Checkout: React.FC = () => {
    const cart = useAppSelector(selectCart);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Check Out</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent >


            </IonContent>
            <IonFooter>
                <IonToolbar className='ion-padding-start ion-padding-end'>
                    <IonText slot='start'>{`Total Price: ${cart.total}`}</IonText>
                    <IonButton slot='end'>Check out<IonIcon icon={chevronForwardOutline} /></IonButton>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default Checkout;
