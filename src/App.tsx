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
  const [isLoading, setIsLoading] = useState(true);

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
