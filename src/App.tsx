import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import DefaultLayout from './layout/DefaultLayout';
import Diagnosis from './pages/Diagnosis';
import Remedies from './pages/Remedies';
import { NextUIProvider } from '@nextui-org/react';
import ChatBot from './pages/ChatBot';
import HomePage from './components/HomePage';
import Reviews from './pages/Reviews';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const location = useLocation();

  // import '../HomeSpecific/css/style.css';
  // import '../HomeSpecific/css/bootstrap.css';
  // import '../personal.css';
  // import '../HomeSpecific/fonts/font-awesome/css/font-awesome.css';
  // import '../HomeSpecific/css/nivo-lightbox/nivo-lightbox.css';
  // import '../HomeSpecific/css/nivo-lightbox/default.css';
  // import '../HomeSpecific/js/jquery.1.11.1.js';
  // import '../HomeSpecific/js/bootstrap.js';

  useEffect(() => {
    if (location.pathname === '/') {
      import('./HomeSpecific/css/style.css');
      import('./HomeSpecific/css/bootstrap.css');
      import('./personal.css');
      import('./HomeSpecific/fonts/font-awesome/css/font-awesome.css');
      import('./HomeSpecific/css/nivo-lightbox/nivo-lightbox.css');
      import('./HomeSpecific/css/nivo-lightbox/default.css');
      import('./HomeSpecific/js/jquery.1.11.1.js');
      import('./HomeSpecific/js/bootstrap.js');
    } else {
      import('./css/satoshi.css');
      import('./css/style.css');
    }
  }, [location]);

  return loading ? (
    <Loader />
  ) : (
    <NextUIProvider>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Life Bridge" />
              <HomePage />
            </>
          }
        />
        <Route path="/menu" element={<DefaultLayout />}>
          {/* <DefaultLayout> */}
          <Route
            path="dashboard"
            element={
              <>
                <PageTitle title="Life Bridge" />
                <ECommerce />
              </>
            }
          />
          <Route
            path="calendar"
            element={
              <>
                <PageTitle title="Calendar | Life Bridge" />
                <Calendar />
              </>
            }
          />
          <Route
            path="profile"
            element={
              <>
                <PageTitle title="Profile | Life Bridge" />
                <Profile />
              </>
            }
          />
          <Route
            path="settings"
            element={
              <>
                <PageTitle title="Settings | Life Bridge" />
                <Settings />
              </>
            }
          />
          <Route
            path="diagnosis"
            element={
              <>
                <PageTitle title="Diagnostics" />
                <Diagnosis />
              </>
            }
          />
          <Route
            path="remedies"
            element={
              <>
                <PageTitle title="Remedies" />
                <Remedies />
              </>
            }
          />
          <Route
            path="chatbot"
            element={
              <>
                <PageTitle title="ChatBot" />
                <ChatBot />
              </>
            }
          />
          <Route
            path="reviews"
            element={
              <>
                <PageTitle title="Reviews" />
                <Reviews />
              </>
            }
          />
          {/* </DefaultLayout> */}
        </Route>
      </Routes>
    </NextUIProvider>
  );
}

export default App;
