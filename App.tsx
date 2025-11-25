import React, { useState, useEffect } from 'react';
import { ViewState } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Methodology from './components/Methodology';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cases from './components/Cases';
import Blog from './components/Blog';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import { ContentProvider } from './context/ContentContext';

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  if (currentView === 'admin') {
      if (!isAdminAuthenticated) {
          return <AdminLogin onLogin={() => setIsAdminAuthenticated(true)} onCancel={() => setCurrentView('home')} />;
      }
      return <AdminPanel onLogout={() => setIsAdminAuthenticated(false)} onExit={() => setCurrentView('home')} />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <>
            <Hero onCtaClick={() => setCurrentView('contact')} />
            <div className="py-12">
                <Services limit={3} onViewAll={() => setCurrentView('services')} />
            </div>
            <Methodology preview />
          </>
        );
      case 'about':
        return <About />;
      case 'services':
        return <Services />;
      case 'methodology':
        return <Methodology />;
      case 'cases':
        return <Cases />;
      case 'blog':
        return <Blog />;
      case 'contact':
        return <Contact />;
      default:
        return <Hero onCtaClick={() => setCurrentView('contact')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-dark text-white selection:bg-brand-pink selection:text-white">
      <Navbar currentView={currentView} onChangeView={setCurrentView} />
      
      <main className="flex-grow pt-20">
        {renderContent()}
      </main>

      <Footer onViewChange={setCurrentView} />
    </div>
  );
};

const App: React.FC = () => {
    return (
        <ContentProvider>
            <AppContent />
        </ContentProvider>
    );
}

export default App;