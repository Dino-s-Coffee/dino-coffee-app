import {
  IonApp,
  setupIonicReact
} from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import Navbar from './components/Navbar';
import Splash from './components/Splash';

import { selectUser } from './features/user/userSlice'
import { useAppSelector } from './app/hooks';

setupIonicReact({
  mode: 'ios',
});

const App: React.FC = () => {
  const user = useAppSelector(selectUser);
  return (
    <IonApp>
      {
        user.isLoggedIn ?
          <Navbar />
          :
          <Splash />
      }
    </IonApp>
  );
}

export default App;
