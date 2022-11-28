import {
  IonContent,
  IonPage,
  IonModal,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonNote
} from '@ionic/react';
import { useRef } from 'react';

import styles from './Splash.module.css';


const Splash: React.FC<{ setLogin: (type:boolean) => void }> = ({ setLogin }) => {
  const modal = useRef<HTMLIonModalElement>(null);
  function onPress() {
    setLogin(true);
    modal.current?.dismiss();
  }
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className={styles.container}>
          <p className={styles.brand}> {`DINO'S\nCOFFEE`} </p>
          <div className={styles.logo}>
            <img alt='log' src='/assets/imgs/logo.png' />
            <img alt='shadow' src='/assets/imgs/logoShadow.png' />
          </div>
          <IonButton id="open-modal" expand="block" size="large" color="light">
            Get started
          </IonButton>
          <div></div>
        </div>
        <IonModal
          ref={modal}
          trigger="open-modal"
          initialBreakpoint={0.75}
          breakpoints={[0, 0.25, 0.5, 0.75]}
          handleBehavior="cycle"
        >
          <IonContent className="ion-padding">
            <div className="ion-margin-top">
              <h1>Login</h1>
              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  type="email"
                  placeholder="email@domain.com"
                ></IonInput>
                <IonNote slot="error">Invalid email</IonNote>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput
                  type="password"
                ></IonInput>
              </IonItem>
              <IonButton onClick={onPress}>Login</IonButton>
              <IonButton>Facebook</IonButton>
              <IonButton>Google</IonButton>
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Splash;
