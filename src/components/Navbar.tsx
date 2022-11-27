import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
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
  personOutline
} from 'ionicons/icons';
import { 
  home as homeFill, 
  heart as heartFill, 
  cart as cartFill, 
  map as mapFill, 
  person as personFill 
} from 'ionicons/icons';

import Home from '../pages/Home';
import Favorite from '../pages/Favorite';
import Map from '../pages/Map';
import Cart from '../pages/Cart';
import Profile from '../pages/Profile';

import { capitalizeOf } from '../utils';
// import styles from './Navbar.module.css';

class Tab {
  constructor(public name: string, public iconOutline: string, public iconFill: string, public component: React.FC) { }
}

const Navbar: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('home');

  const tabs: Tab[] = [
    new Tab('home', homeOutline, homeFill, Home),
    new Tab('favorite', heartOutline, heartFill, Favorite),
    new Tab('map', mapOutline, mapFill, Map),
    new Tab('cart', cartOutline, cartFill, Cart),
    new Tab('profile', personOutline, personFill, Profile),
  ];
  return (
    <IonTabs onIonTabsDidChange={(e) => setSelectedTab(e.detail.tab)}>
      <IonRouterOutlet>
        {tabs.map((tab) => (
          <Route key={tab.name} path={`/${tab.name}`} component={tab.component} exact={true} />
        ))}
        <Route exact path="/" render={() => <Redirect to="/home" />} />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        {tabs.map((tab) => (
          <IonTabButton tab={tab.name} key={tab.name} href={`/${tab.name}`}>
            <IonIcon icon={selectedTab === tab.name ? tab.iconFill : tab.iconOutline} />
            {selectedTab === tab.name ? <IonLabel>{capitalizeOf(tab.name)}</IonLabel> : null}
          </IonTabButton>
        ))}
      </IonTabBar>
    </IonTabs>
  );
}

export default Navbar;
