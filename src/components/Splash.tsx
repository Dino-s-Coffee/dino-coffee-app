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
  IonText,
} from '@ionic/react';
import { mailOutline, personCircleOutline, lockClosedOutline } from 'ionicons/icons';
import { TextFieldTypes } from '@ionic/core';
import { RefObject, useRef, useState } from 'react';

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import styles from './Splash.module.css';
import classNames from 'classnames';

import { login } from '../features/user/userSlice'
import { useAppDispatch } from '../app/hooks';

import { fetchUser } from '../pages/api/user';

type FormData = {
  action: string;
  email: string,
  password: string
  name: string,
  confirmPassword: string
}
const formSchema = yup.object({
  action: yup.string().default('Login'),
  email: yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  password: yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  name: yup.string()
    .when('action', {
      is: 'Sign up',
      then: yup.string().required('Name is required')
    }),
  confirmPassword: yup.string()
    .when('action', {
      is: 'Sign up',
      then: yup.string()
        .required('Confirm Password is required')
        .oneOf([yup.ref('password'), null], 'Passwords must match')
    })
}).required();

const Input: React.FC<{ name: string, icon: string, label: string, control: any, type: TextFieldTypes, placeholder: string, error: any }> =
  ({ name, icon, label, control, type, placeholder, error }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    return (
      <IonItem>
        <IonLabel position="floating"><IonIcon icon={icon} />{label}</IonLabel>
        {
          type === 'password' && hasValue &&
          <IonText
            slot="end"
            onClick={() => setShowPassword(!showPassword)}
          >
            <p>{!showPassword ? 'show' : 'hide'}</p>
          </IonText>
        }
        <Controller
          name={name}
          control={control}
          render={({ field }) =>
            <IonInput
              type={(type === 'password' && showPassword) ? 'text' : type}
              placeholder={placeholder}
              onIonBlur={() => field.onBlur()}
              onIonChange={(e) => {
                field.onChange(e.detail.value)
                setHasValue(e.detail.value !== '')
              }}
              {...field}
            />}
        />
        {error && <IonNote color="danger">{error?.message}</IonNote>}
      </IonItem>
    )
  }

const ModalContent: React.FC<{ modal: RefObject<HTMLIonModalElement> }> = ({ modal }) => {
  const [action, setAction] = useState<'Login' | 'Sign up'>('Login');
  const [loginFailed, setLoginFailed] = useState(false);
  const reverseAction = action === 'Login' ? 'Sign up' : 'Login';
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({ resolver: yupResolver(formSchema) });

  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<FormData> = async data => {
    try {
      const res = await fetchUser(data);
      dispatch(login(res))
      modal.current?.dismiss();
    }
    catch (err) {
      console.log(err);
      setLoginFailed(true);
    }
  }
  const onError = (errors: any, e: any) => console.log(errors, e);
  return (
    <IonContent className="ion-padding">
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <h1>{action}</h1>
        <Input
          name='email'
          icon={mailOutline}
          label='Email'
          control={control}
          type='email'
          placeholder='Enter your email'
          error={errors.email}
        />
        {action === 'Sign up' && (
          <Input name='name' icon={personCircleOutline} label='Name' control={control} type='text' placeholder='Enter your name' error={errors.name} />
        )}
        <Input name='password' icon={lockClosedOutline} label='Password' control={control} type='password' placeholder='Enter your password' error={errors.password} />
        {action === 'Sign up' && (
          <Input name='confirmPassword' icon={lockClosedOutline} label='Confirm Password' control={control} type='password' placeholder='Confirm your password' error={errors.confirmPassword} />
        )}
        {loginFailed && <IonText className='ion-text-center' color="danger"><p>Invalid email or password</p></IonText>}
        <IonButton type='submit' className='ion-margin-bottom' expand='block'>{action}</IonButton>
        {
          action === 'Login' && <IonButton className={classNames('ion-margin-bottom', styles['facebook-button'])} expand='block'>
            <IonIcon src='/assets/icons/logo-facebook.svg' slot="start" /> Continue with Facebook
          </IonButton>
        }
        {
          action === 'Login' && <IonButton className={classNames('ion-margin-bottom', styles['google-button'])} expand='block'>
            <IonIcon src='/assets/icons/logo-google.svg' slot="start" /> Continue with Google
          </IonButton>
        }
        <IonText className='ion-text-center'>
          <p>
            {action === 'Login' ? 'Don\'t have an account? ' : 'Already have an account? '}
            <IonText
              color='primary'
              onClick={() => {
                setValue('action', reverseAction);
                setAction(reverseAction);
              }}>
              <span>{reverseAction}</span>
            </IonText>
          </p>
        </IonText>
      </form>
    </IonContent>
  )
}


const Splash: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  return (
    <IonPage>
      <IonContent>
        <div className={styles.container}>
          <p className={styles.brand}> {`DINO'S\nCOFFEE`} </p>
          <div className={styles.logo}>
            <img alt='log' src='/assets/imgs/logo.png' />
            <img alt='shadow' src='/assets/imgs/logoShadow.png' />
          </div>
          <IonButton id="open-modal" size="large" color="light">
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
          <ModalContent modal={modal} />
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Splash;
