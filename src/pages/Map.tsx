import {
  IonButton,
  IonContent,
  IonIcon,
  IonPage,
  useIonViewDidEnter,
  IonHeader,
  IonToolbar,
  IonTitle,
} from '@ionic/react';
import { navigateOutline, menuOutline, mapOutline } from 'ionicons/icons';
import { Geolocation } from '@capacitor/geolocation';
import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styles from './Map.module.css';

L.Icon.Default.imagePath = '/assets/imgs/leaflet/';
const zoomDefault = 13;
const positionDefault = { lat: 10.76, lng: 106.68 };

const redIcon = L.icon({
  iconUrl: '/assets/imgs/leaflet/red-marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const makers = [
  { lat: 10.76, lng: 106.68 },
  { lat: 10.74, lng: 106.70 },
  { lat: 10.76, lng: 106.68 },
  { lat: 10.75, lng: 106.68 },
  { lat: 10.76, lng: 106.66 },
  { lat: 10.76, lng: 106.69 },
  { lat: 10.77, lng: 106.68 },
  { lat: 10.78, lng: 106.69 },
  { lat: 10.79, lng: 106.68 },
  { lat: 10.78, lng: 106.64 },
]

const GoToMyLocation: React.FC = () => {
  const [position, setPosition] = useState<any>(null);
  const map = useMap();
  if (!map) return null;
  function goToMyLocation() {
    Geolocation.getCurrentPosition().then((location) => {
      const position = {
        lat: location.coords.latitude,
        lng: location.coords.longitude
      }
      map.flyTo(position, zoomDefault);
      setPosition(position);
    })
  }
  return (
    <>
      {
        position &&
        <Marker position={position} icon={redIcon} >
          <Popup>
            You are here
          </Popup>
        </Marker>
      }
      <IonButton onClick={goToMyLocation} className={styles.myLocationButton}>
        <IonIcon icon={navigateOutline} />
      </IonButton>
    </>
  )
}

const MapView: React.FC = () => {
  useIonViewDidEnter(() => {
    window.dispatchEvent(new Event('resize'));
  });
  return (
    <MapContainer
      center={positionDefault}
      zoom={zoomDefault}
      scrollWheelZoom
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        makers.map((maker, index) => {
          return (
            <Marker position={maker} key={index}>
              <Popup>
                Dino's Coffee
              </Popup>
            </Marker>
          )
        })
      }
      <GoToMyLocation />
    </MapContainer>
  )
}


const Map: React.FC = () => {
  const [viewMap, setViewMap] = useState(true);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Map</IonTitle>
          <IonIcon
            slot="end"
            color='primary'
            size='large'
            onClick={() => setViewMap(!viewMap)}
            icon={viewMap ? menuOutline : mapOutline}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent >
        {
          viewMap ?
            <MapView />
            :
            <p>List of shops</p>
        }
      </IonContent>
    </IonPage>
  );
};

export default Map;
