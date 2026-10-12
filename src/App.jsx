import { ThemeProvider } from 'styled-components';
import { MotionConfig } from 'framer-motion';
import { theme } from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import ServiceAreas from './components/ServiceAreas';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <MotionConfig reducedMotion="user">
        <GlobalStyles />
        <a className="skip" href="#contenu">Passer au contenu</a>
        <Header />
        <main id="contenu">
          <Hero />
          <Services />
          <ServiceAreas />
          <CallToAction />
        </main>
        <Footer />
      </MotionConfig>
    </ThemeProvider>
  );
}
