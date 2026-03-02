import { Navbar } from '../components/Navbar';
import { CustomCursor } from '../components/CustomCursor';
import { Contact } from '../components/Contact';
import { Team } from '../components/Team';
import { motion } from 'motion/react';
import { ScrollCircular } from '../components/ScrollCircular';

export const TeamPage = () => {
  return (
    <div className="bg-vish-bg min-h-screen text-white selection:bg-vish-accent selection:text-black cursor-none">
      <CustomCursor />
      <Navbar />
      <ScrollCircular />

      <main className="pt-32 pb-20">
        <section className="px-6 md:px-12 mb-20 md:mb-32">
          <div className="max-w-screen-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="font-mono text-sm text-vish-accent uppercase tracking-widest">About Our People</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white max-w-4xl"
            >
              Meet the Makers<span className="text-vish-accent">.</span>
            </motion.h1>
          </div>
        </section>

        <Team showTitle={false} />

        <Contact />
      </main>
    </div>
  );
};
