import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar } from '@ionic/react';

import styles from './Home.module.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className='header-toolbar'>
          <IonSearchbar className='header-toolbar' animated={true} mode={'ios'}></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        
      </IonContent>
    </IonPage>
  );
};

export default Home;
