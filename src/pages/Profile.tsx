import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem } from '@ionic/react';

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
      <IonContent >
        {
          configs.map((config, index) => {
            return (
              // <IonButton>
                <IonItem button detail>
                  {config}
                </IonItem>
              // </IonButton>
            )
          })
        }
      </IonContent>
    </IonPage>
  );
};

export default Profile;
