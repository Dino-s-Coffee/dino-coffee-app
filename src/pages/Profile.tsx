import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
import { chevronForwardOutline} from 'ionicons/icons'
import styles from './Home.module.css';

const Info: React.FC = () => {
  return (
    <IonContent>
      <h1> Avatar </h1>
      <h2> Money </h2>
    </IonContent>
  )
}

const Profile: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonContent className='title'>Profile</IonContent>
        {/* <Info/> */}
        <IonButton className='profile-button'>
          <IonContent className='ct'>Edit Profile</IonContent>
          <IonIcon icon={chevronForwardOutline}></IonIcon>
        </IonButton>
        <IonButton>Order History</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
