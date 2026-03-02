import { Navbar } from '../components/Navbar';
import { CustomCursor } from '../components/CustomCursor';
import { Projects } from '../components/Projects';
import { Contact } from '../components/Contact';
import { motion } from 'motion/react';

export const Work = () => {
  return (
    <div className="bg-vish-bg min-h-screen text-white selection:bg-vish-accent selection:text-black cursor-none">
      <CustomCursor />
      <Navbar />
      
      <main className="pt-32">
        <section className="px-6 md:px-12 py-20">
          <div className="max-w-[1400px] mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-display text-6xl md:text-8xl font-medium tracking-tight text-white mb-12"
            >
              All Work
            </motion.h1>
          </div>
        </section>
        
        <Projects showViewAll={false} />
        <Contact />
      </main>
    </div>
  );
};
