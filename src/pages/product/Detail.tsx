import { IonContent, IonPage, IonButton, IonHeader, IonToolbar, IonBackButton } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
// import styles from './Cart.module.css';

interface ProductDetailPageProps
  extends RouteComponentProps<{
    id: string;
  }> { }

const ProductDetail: React.FC<ProductDetailPageProps> = ({ match }) => {
  const prductId = match.params.id;
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton slot='start'>
            <IonBackButton />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <h1>{`Product Detail: ${prductId}`}</h1>
        <IonButton>Add to Cart</IonButton>
      </IonContent>
    </IonPage>
  );
};
export default ProductDetail;
