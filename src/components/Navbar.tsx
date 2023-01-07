import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import {
  homeOutline,
  heartOutline,
  cartOutline,
  mapOutline,
  personOutline,
  gameControllerOutline,
  home as homeFill,
  heart as heartFill,
  cart as cartFill,
  map as mapFill,
  person as personFill,
  gameController as gameControllerFill
} from 'ionicons/icons';

import Home from '../pages/Home';
import Favorite from '../pages/Favorite';
import Map from '../pages/Map';
import Cart from '../pages/Cart';
import Profile from '../pages/Profile';
import ProductDetail from '../pages/Product/Detail';
import Checkout from '../pages/CheckOut';
import Game from '../pages/Game';

function Tab(name: string, iconOutline: string, iconFill: string, component: React.FC) {
  return {
    name,
    iconOutline,
    iconFill,
    component
  }
}

const tabs: any[] = [
  Tab('Home', homeOutline, homeFill, Home),
  Tab('Game', gameControllerOutline, gameControllerFill, Game),
  Tab('Favorite', heartOutline, heartFill, Favorite),
  Tab('Map', mapOutline, mapFill, Map),
  Tab('Cart', cartOutline, cartFill, Cart),
  Tab('Profile', personOutline, personFill, Profile),
];


const Navbar: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('home');
  return (
    <IonReactRouter>
      <IonTabs onIonTabsDidChange={(e) => setSelectedTab(e.detail.tab)}>
        <IonRouterOutlet>
          {tabs.map((tab) => (
            <Route key={tab.name} exact path={`/${tab.name.toLowerCase()}`} component={tab.component} />
          ))}
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route path="/product/detail/:id" component={ProductDetail} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/game" component={Game} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          {tabs.map((tab) => (
            <IonTabButton tab={tab.name} key={tab.name} href={`/${tab.name.toLowerCase()}`}>
              <IonIcon icon={selectedTab === tab.name ? tab.iconFill : tab.iconOutline} />
              {selectedTab === tab.name && <IonLabel>{tab.name}</IonLabel>}
            </IonTabButton>
          ))}
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
}

export default Navbar;
