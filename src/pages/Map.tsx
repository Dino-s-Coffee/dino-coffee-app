import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import styles from './Map.module.css';

const Map: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Map</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

      </IonContent>
    </IonPage>
  );
};

export default Map;
