import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
import { heartOutline } from 'ionicons/icons';
import styles from './Favorite.module.css';

const Favorite: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Favorite</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton color="light" expand="block">
          Cappuchino
          <IonIcon color="red" slot="end" icon={heartOutline}></IonIcon>
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Favorite;
