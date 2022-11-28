import { IonContent, IonHeader, IonPage, IonToolbar, IonSearchbar } from '@ionic/react';

// import styles from './Home.module.css';

import Item from '../components/Item';

const Home: React.FC = () => {
  const products = [
    {file: '1.png', title: 'Capuchino', price: '10.000 VND', content: 'Ca phe capuchino ngon'},
    {file: '2.png', title: 'Expresso', price: '20.000 VND', content: 'Ca phe expresso sieu ngon'},
    {file: '3.png', title: 'Cafe sua', price: '30.000 VND', content: 'Ca phe sua ngon'},
    {file: '4.png', title: 'Cafe den', price: '30.000 VND', content: 'Ca phe den ngon'},
    {file: '5.png', title: 'Tra sua', price: '30.000 VND', content: 'Tra sua ngon'},
    {file: '6.png', title: 'Tra da', price: '30.000 VND', content: 'Tra da ngon'},
    {file: '7.png', title: 'Tra chanh', price: '30.000 VND', content: 'Tra chanh ngon'},
    {file: '8.png', title: 'Tra xanh', price: '30.000 VND', content: 'Tra xanh ngon'},
    {file: '9.png', title: 'Tra dau', price: '30.000 VND', content: 'Tra dau ngon'},
    {file: '10.png', title: 'Tra dao', price: '30.000 VND', content: 'Tra dao ngon'},
  ]

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className='header-toolbar'>
          <IonSearchbar className='header-toolbar' animated={true} mode={'ios'}></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {
          products.map((product, index) => {
            return (
              <Item productId={index.toString()} src={`/assets/imgs/products/${product.file}`} title={product.title} price={product.price} content={product.content} key={index}></Item>
            )
          })
        }
      </IonContent>
    </IonPage>
  );
};

export default Home;
