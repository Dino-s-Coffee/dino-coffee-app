import {
  IonContent,
  IonPage,
  IonModal,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonNote,
  IonIcon,
} from '@ionic/react';
import { logoFacebook, logoGoogle } from 'ionicons/icons';
import { useRef } from 'react';
import styles from './Splash.module.css';
import { login } from '../features/user/userSlice'
import { useAppDispatch } from '../app/hooks';

const Splash: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const dispatch = useAppDispatch();
  function onPress() {
    dispatch(login({
      id: '1',
      name: 'admin',
      email: 'admin@dino.com',
      token: 'abc',
      isLoggedIn: true,
    }))
    modal.current?.dismiss();
  }
  return (
    <IonPage>
      <IonContent >
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
          <IonContent className="ion-padding" color={'light'}>
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
              <IonButton expand='block' onClick={onPress}>Login</IonButton>
              <IonButton expand='block' onClick={onPress} className={styles['facebook-button']}>
                <IonIcon src='/assets/icons/logo-facebook.svg' slot="start" />
                Continue with Facebook
              </IonButton>
              <IonButton expand='block' onClick={onPress} className={styles['google-button']}>
                <IonIcon src='/assets/icons/logo-google.svg' slot="start" />
                Continue with Google
              </IonButton>
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Splash;
