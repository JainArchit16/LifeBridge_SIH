import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
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

// Firebase authentication import
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const [user, setUser] = useState<any>(null); // State to store authenticated user

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Simulate loading for 1 second
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Check Firebase authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update user state when logged in
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Dynamic CSS imports based on route
  const location = useLocation();
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
    return () => {};
  }, [location]);

  return loading ? (
    <Loader />
  ) : (
    <NextUIProvider>
      <Routes>
        <Route
          path="/signin"
          element={
            <>
              <PageTitle title="SignIn | Life Bridge" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <PageTitle title="SignUp | Life Bridge" />
              <SignUp />
            </>
          }
        />
        <Route
          index
          element={
            <>
              <PageTitle title="Life Bridge" />
              <HomePage />
            </>
          }
        />
        {/* Authentication Routes */}

        {/* Protected Routes */}
        <Route
          path="/menu"
          element={user ? <DefaultLayout /> : <Navigate to="/signup" />}
        >
          <Route
            path="dashboard"
            element={
              <>
                <PageTitle title="Life Bridge" />
                <ECommerce />
              </>
            }
          />
          {/* <Route
            path="calendar"
            element={
              <>
                <PageTitle title="Calendar | Life Bridge" />
                <Calendar />
              </>
            }
          /> */}
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
        </Route>
      </Routes>
    </NextUIProvider>
  );
}

export default App;
