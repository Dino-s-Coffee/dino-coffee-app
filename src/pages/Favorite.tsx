import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonText } from '@ionic/react';
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
        <IonText color="dark" className={styles.center}>
          No favorites yet
        </IonText>
        <IonText color="dark" className={styles.instruction}>
          Hit the blue button
          down below to Create an order
        </IonText>
        <div className={styles.buttonWrapper}>
          <IonButton className={styles.button}>
            Start ordering
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Favorite;
