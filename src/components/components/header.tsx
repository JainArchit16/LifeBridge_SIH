import { useEffect, useState } from 'react';

import { auth } from '../../../config/firebase';

export const Header = (props: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check the authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>
                  {props.data ? props.data.title : 'Loading'}
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : 'Loading'}</p>
                {isAuthenticated ? (
                  <a
                    href="/menu/dashboard"
                    className="btn btn-custom btn-lg page-scroll"
                  >
                    Dashboard
                  </a>
                ) : (
                  <>
                    <a
                      href="/signin"
                      className="btn btn-custom btn-lg page-scroll"
                    >
                      Log In
                    </a>{' '}
                    <a
                      href="/signup"
                      className="btn btn-custom btn-lg page-scroll"
                    >
                      Sign Up
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
