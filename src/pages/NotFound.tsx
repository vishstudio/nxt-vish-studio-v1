import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { PageLayout } from '../components/ui/PageLayout';
import { Button } from '../components/ui/Button';
import { Contact } from '../components/Contact';

export const NotFound = () => {
  return (
    <PageLayout>
      <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 md:px-12 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-vish-accent/5 rounded-full blur-[120px] opacity-50 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-display text-8xl md:text-[12rem] lg:text-[15rem] leading-none font-bold text-white tracking-tighter mb-4">
              404<span className="text-vish-accent">.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-medium text-white mb-8">
              Page Not Found
            </h2>
            <p className="font-sans text-xl text-gray-400 leading-relaxed mb-12 max-w-xl mx-auto">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button 
              href="/"
              variant="white"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Return Home
            </Button>
          </motion.div>
        </div>
      </section>
      <Contact />
    </PageLayout>
  );
};
