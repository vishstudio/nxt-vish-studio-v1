import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Home } from './pages/Home';
import { AboutPage } from './pages/About';
import { Work } from './pages/Work';
import { ProjectDetail } from './pages/ProjectDetail';
import { CustomCursor } from './components/CustomCursor';
import { Loader } from './components/Loader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Router>
      <div className="bg-vish-bg min-h-screen text-vish-text selection:bg-vish-accent selection:text-black">
        <CustomCursor />
        
        <AnimatePresence mode="wait">
          {isLoading && <Loader onLoadingComplete={() => setIsLoading(false)} />}
        </AnimatePresence>

        {!isLoading && (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/work" element={<Work />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
