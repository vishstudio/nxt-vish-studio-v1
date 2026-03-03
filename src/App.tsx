import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Home } from './pages/Home';
import { AboutPage } from './pages/About';
import { ProjectsPage } from './pages/ProjectsPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectDetail } from './pages/ProjectDetail';
import { ContactPage } from './pages/ContactPage';
import { NotFound } from './pages/NotFound';
import { CustomCursor } from './components/CustomCursor';
import { Loader } from './components/Loader';

function App() {
  const [isLoading, setIsLoading] = useState(() => {
    // Check if the current route is a known route.
    // If not, we don't show the initial loader (e.g. for 404 page).
    const path = window.location.pathname;
    const base = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL;
    const normalizedPath = path.replace(base, '') || '/';

    const knownExactPaths = ['/', '/about', '/projects', '/services', '/contact'];
    const isKnownPath = knownExactPaths.includes(normalizedPath) || normalizedPath.startsWith('/project/');
    return isKnownPath;
  });

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="bg-vish-bg min-h-screen text-vish-text selection:bg-vish-accent selection:text-black">
        <CustomCursor />

        <AnimatePresence mode="wait">
          {isLoading && <Loader onLoadingComplete={() => setIsLoading(false)} />}
        </AnimatePresence>

        {!isLoading && (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/project/:slug" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
