import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
import { chevronForwardOutline } from 'ionicons/icons'
// import styles from './Home.module.css';

// const Info: React.FC = () => {
//   return (
//     <IonContent>
//       <h1> Avatar </h1>
//       <h2> Money </h2>
//     </IonContent>
//   )
// }


const Profile: React.FC = () => {
  const configs = [
    'Edit Profile',
    'Order History',
    'Change Password',
    'Hotline',
    'Sign Out'
  ]
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {
          configs.map((config, index) => {
            return (
              <IonButton expand='full' key={index} color='secondary'>
                <IonIcon icon={chevronForwardOutline} slot='end' />
                {config}
              </IonButton>
            )
          })
        }
      </IonContent>
    </IonPage>
  );
};

export default Profile;
