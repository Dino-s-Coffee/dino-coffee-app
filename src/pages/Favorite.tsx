import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import { useAppSelector } from '../app/hooks';
import { selectFavorite } from '../features/favorite/favoriteSlice';
import ProductCard from '../components/ProductCard';

const Content: React.FC = () => {
  const favorite = useAppSelector(selectFavorite);
  if (favorite.products.length === 0) {
    return (
      <p>No favorite product</p>
    )
  }
  return (
    <>
      {favorite.products.map((product, index) => {
        return (
          <ProductCard key={index} product={product} />
        )
      })}
    </>
  )
}

const Favorite: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Favorite</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent >
        <Content />
      </IonContent>
    </IonPage>
  );
};

export default Favorite;
