import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../styles/globals.css';

import { AuthProvider } from '../context/AuthContext';
import { NotificationProvider } from '../context/NotificationProvider';
import { LoadingProvider } from '../context/LoadingProvider';
import Notifications from '../components/AlertToast/Notifications';

function MyApp({ Component, pageProps }: any) {
  return <>
    <NotificationProvider>
      <LoadingProvider>

        <AuthProvider>
          <Notifications/>
          
          <Component {...pageProps} />
        </AuthProvider>
      </LoadingProvider>
    </NotificationProvider>
  </>
}

export default MyApp;
