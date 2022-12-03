import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonText } from '@ionic/react';

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
      <IonContent>
        {/* <IonText>Dark Mode</IonText> */}
        {
          configs.map((config, index) => {
            return (
              <IonItem key={index} button detail>
                {config}
              </IonItem>
            )
          })
        }

      </IonContent>
    </IonPage>
  );
};

export default Profile;
