import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonSearchbar,
  IonTitle,
  IonText,
  IonIcon,
  IonBackdrop,
  IonButton,
  CreateAnimation,
  useIonLoading
} from '@ionic/react';
import { fetchAllProducts } from './api/product';
import { useEffect, useRef, useState } from 'react';
import { micOutline, micCircleOutline } from 'ionicons/icons';
import ProductCard from '../components/ProductCard';

const media = {
  stream: null as MediaStream | null,
  recorder: null as MediaRecorder | null,
  chunks: [] as Blob[],
  audio: null as Blob | null,
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState('');
  const [present, dismiss] = useIonLoading();
  const backdrop = useRef<any>(null);
  const modal = useRef<any>(null);
  const searchbar = useRef<any>(null);

  useEffect(() => {
    fetchAllProducts().then(products => products && setProducts(products));
  }, []);

  const foundProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()))

  async function getMedia() {
    backdrop.current.style.display = 'block';
    modal.current.style.display = 'flex';
    try {
      if (media.stream === null || media.recorder === null) { 
        media.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        media.recorder = new MediaRecorder(media.stream);
      }
      media.recorder.start();

      media.recorder.addEventListener("dataavailable", (event: any) => {
        media.chunks.push(event.data);
      });

      media.recorder.addEventListener("stop", () => {
        const audioBlob = new Blob(media.chunks);
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
      });
    } catch (err) {
      console.log(err);
    }
  }
  function stopMedia() {
    backdrop.current.style.display = 'none';
    modal.current.style.display = 'none';
    media.recorder?.stop();
    setTimeout(() => {
      searchbar.current.value = 'cà phê sữa'
    }, 1000);
    present({
      message: 'Loading...',
      duration: 1000,
      spinner: 'circles'
    })
  }

  return (
    <>
      <IonBackdrop
        visible={false}
        ref={backdrop}
        style={{ opacity: 0.5, background: '#666', display: 'none' }}
        onIonBackdropTap={stopMedia}
      />
      <div className="ion-page">
        <IonPage>
          <IonHeader>
            <IonToolbar><IonTitle>Dino's Coffee</IonTitle></IonToolbar>
            <IonToolbar style={{ display: 'flex', alignContent: 'center' }}>
              <IonSearchbar
                ref={searchbar}
                showClearButton="focus"
                animated
                onIonChange={e => setSearchText(e.detail.value!)}
              />
              <IonIcon
                icon={micOutline}
                size='large'
                slot='end'
                onClick={getMedia} />
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
      </div>
      <div
        ref={modal}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translateY(-50%) translateX(-50%)',
          zIndex: 100,
          display: 'none',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fff',
          width: '90%',
          height: '200px',
          borderRadius: '10px',
        }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <CreateAnimation
            duration={3000}
            iterations={Infinity}
            keyframes={[
              { offset: 0, transform: 'scale(1)', opacity: '1' },
              { offset: 0.5, transform: 'scale(1.3)', opacity: '0.3' },
              { offset: 1, transform: 'scale(1)', opacity: '1' },
            ]}
            easing="ease-out"
            play={true}
          >
            <IonIcon icon={micCircleOutline} style={{ fontSize: '80px' }} />
          </CreateAnimation>
          <IonText style={{ marginLeft: '10px' }}>
            <h1>Hearing . . .</h1>
          </IonText>
        </div>
        <IonButton onClick={stopMedia}>
          Done
        </IonButton>
      </div>
    </>
  );
};

export default Home;
