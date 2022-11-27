import { IonContent, IonHeader, IonPage, IonToolbar, IonSearchbar } from '@ionic/react';

import styles from './Splash.module.css';

const Splash: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
      {/* <div className={styles.container}>
            <p className={styles.brand}> {`DINO'S\nCOFFEE`} </p>
            <div className={styles.logo}>
              <image src={'/assets/imgs/logo.png'} />
              <image src={'/assets/imgs/logoShadow.png'} />
            </div>
            <button onClick={onPress} className={styles.button}>
              <p className={styles.buttonText}> Get started </p>
            </button>
          </div> */}
      </IonContent>
    </IonPage>
  );
};

export default Splash;
