import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonSearchbar,
  IonTitle,
  IonText
} from '@ionic/react';
import { fetchAllProducts } from './api/product';
import { useEffect, useState } from 'react';
// import styles from './Home.module.css';

import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchAllProducts().then(products => products && setProducts(products));
  }, []);

  const foundProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()))

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar><IonTitle>Dino's Coffee</IonTitle></IonToolbar>
        <IonToolbar>
          <IonSearchbar
            showClearButton="focus"
            animated
            onIonChange={e => setSearchText(e.detail.value!)}
          ></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent >
        {
          foundProducts.length > 0
            ?
            foundProducts.map((product, index) => <ProductCard key={index} product={product} />)
            :
            <IonText className="ion-text-center">
              <p>Found no products</p>
            </IonText>
        }
      </IonContent>
    </IonPage>
  );
};

export default Home;
