import { IonButton, IonContent, IonIcon, IonPage, useIonViewDidEnter } from '@ionic/react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { Geolocation } from '@capacitor/geolocation';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { navigateOutline } from 'ionicons/icons';
import L from 'leaflet';
import styles from './Map.module.css';

L.Icon.Default.imagePath = '/assets/imgs/leaflet/';
const zoomDefault = 13;
const GoToMyLocation:
  React.FC<{ setPosition: (position: { lat: number, lng: number }) => void }> =
  ({ setPosition }) => {
    const map = useMap();
    if (!map) return null;
    function goToMyLocation() {
      Geolocation.getCurrentPosition().then((location) => {
        const position = {
          lat: location.coords.latitude,
          lng: location.coords.longitude
        }
        setPosition(position);
        map.flyTo(position, zoomDefault);
      })
    }
    return (
      <IonButton onClick={goToMyLocation} className={styles.myLocationButton}>
        <IonIcon icon={navigateOutline} />
      </IonButton>
    )
  }

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

const redIcon = L.icon({
  iconUrl: '/assets/imgs/leaflet/red-marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Map: React.FC = () => {
  const [position, setPosition] = useState<null | { lat: number, lng: number }>(null);
  useIonViewDidEnter(() => {
    window.dispatchEvent(new Event('resize'));
  });

  if (!position) {
    Geolocation.getCurrentPosition().then((location) => {
      setPosition({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      })
    })
  }


  return (
    <IonPage>
      <IonContent fullscreen>
        {
          position ?
            <MapContainer
              center={position}
              zoom={zoomDefault}
              scrollWheelZoom={true}
              style={{ height: '100%' }}
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
              <Marker position={position} icon={redIcon} >
                <Popup>
                  You are here
                </Popup>
              </Marker>
              <GoToMyLocation setPosition={setPosition} />
            </MapContainer>
            :
            <p>Loading...</p>
        }
      </IonContent>
    </IonPage>
  );
};

export default Map;
