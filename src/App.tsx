import React, { Suspense, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { ModalProvider, useContactModal } from './contexts/ModalContext';
import { QuoteModal } from './components/QuoteModal';
import { Chatbot } from './components/Chatbot';

// Sections
import Navbar from './components/sections/Navbar';
import Footer from './components/sections/Footer';

// Pages
const Home = React.lazy(() => import('./pages/Home'));
const FeaturesPage = React.lazy(() => import('./pages/FeaturesPage'));
const PricingPage = React.lazy(() => import('./pages/PricingPage'));
const ProjectsPage = React.lazy(() => import('./pages/ProjectsPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));

import FloatingContact from './components/FloatingContact';

const FallbackSkeleton = () => (
  <div className="h-64 w-full animate-pulse bg-brand-50/20 rounded-[40px] my-8 max-w-7xl mx-auto" />
);

const ScrollToHash = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [hash]);

  return null;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

const GlobalModal = () => {
  const { isContactModalOpen, closeContactModal, productName } = useContactModal();
  return (
    <QuoteModal 
      isOpen={isContactModalOpen} 
      onClose={closeContactModal} 
      productName={productName} 
    />
  );
};

const MainContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleNavigate = (path: string) => {
    if (path.startsWith('#')) {
      if (location.pathname === '/') {
        const element = document.getElementById(path.replace('#', ''));
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/', { state: { scrollTo: path.replace('#', '') } });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <div className="min-h-screen selection:bg-brand-200 selection:text-brand-700">
      <ScrollToTop />
      <ScrollToHash />
      <Navbar onNavigate={handleNavigate} currentPage={location.pathname === '/' ? 'home' : 'other'} />
      <Routes>
        <Route path="/" element={
          <Suspense fallback={<FallbackSkeleton />}>
            <Home />
          </Suspense>
        } />
        <Route path="/features" element={
          <Suspense fallback={<FallbackSkeleton />}>
            <FeaturesPage />
          </Suspense>
        } />
        <Route path="/pricing" element={
          <Suspense fallback={<FallbackSkeleton />}>
            <PricingPage />
          </Suspense>
        } />
        <Route path="/projects" element={
          <Suspense fallback={<FallbackSkeleton />}>
            <ProjectsPage />
          </Suspense>
        } />
        <Route path="/contact" element={
          <Suspense fallback={<FallbackSkeleton />}>
            <ContactPage />
          </Suspense>
        } />
      </Routes>
      <Footer onNavigate={handleNavigate} />
      <Chatbot />
      <FloatingContact />
      <GlobalModal />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <ModalProvider>
        <MainContent />
      </ModalProvider>
    </LanguageProvider>
  );
}
