import { useState, useEffect } from 'react';
import { Navigation } from './components/navigation.tsx';
import { Header } from './components/header.tsx';
import { Features } from './components/features.tsx';
import { About } from './components/about.tsx';
import { Services } from './components/services.tsx';
import { Gallery } from './components/gallery.tsx';
import { Testimonials } from './components/testimonials.tsx';
import { Team } from './components/Team.tsx';
import { Contact } from './components/contact.tsx';
import JsonData from '../data/data.json';
import SmoothScroll from 'smooth-scroll';

// import '../HomeSpecific/css/style.css';
// import '../HomeSpecific/css/bootstrap.css';
// import '../personal.css';
// import '../HomeSpecific/fonts/font-awesome/css/font-awesome.css';
// import '../HomeSpecific/css/nivo-lightbox/nivo-lightbox.css';
// import '../HomeSpecific/css/nivo-lightbox/default.css';
// import '../HomeSpecific/js/jquery.1.11.1.js';
// import '../HomeSpecific/js/bootstrap.js';

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

interface LandingPageData {
  Header: any;
  Features: any;
  About: any;
  Services: any;
  Gallery: any;
  Testimonials: any;
  Team: any;
  Contact: any;
}

const HomePage = () => {
  const [landingPageData, setLandingPageData] =
    useState<LandingPageData | null>(null);

  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);
  return (
    <>
      <Navigation />
      <Header data={landingPageData?.Header} />
      <Features data={landingPageData?.Features} />
      <About data={landingPageData?.About} />
      <Services data={landingPageData?.Services} />
      <Gallery data={landingPageData?.Gallery} />
      <Testimonials data={landingPageData?.Testimonials} />
      <Team data={landingPageData?.Team} />
      <Contact data={landingPageData?.Contact} />
    </>
  );
};

export default HomePage;
