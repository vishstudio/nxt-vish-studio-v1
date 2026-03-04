import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { useTinaHome } from '../hooks/useTinaVisualEditing';
import { PageLayout } from '../components/ui/PageLayout';
import { PageHero } from '../components/ui/PageHero';
import { Contact } from '../components/Contact';
import { useEffect } from 'react';

export const TestimonialsPage = () => {
  const { data: content } = useTinaHome();
  const testimonials = content.testimonials ?? [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <PageLayout>
      <PageHero
        label="Client Testimonials"
        title={
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-medium tracking-tight leading-[0.95] text-white">
            {content.testimonialsHeading || 'What Clients Say'}<span className="text-vish-accent">.</span>
          </h1>
        }
        description={content.testimonialsSubtext || 'Real words from real partners'}
      />

      <section className="py-24 px-6 md:px-12">
        <div className="max-w-350 mx-auto">

          {testimonials.length === 0 ? (
            <p className="font-mono text-gray-500 text-center py-32">No testimonials yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {testimonials.map((t, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (index % 2) * 0.1 }}
                  className="group flex flex-col gap-8 p-8 lg:p-10 rounded-3xl border border-white/8 bg-white/[0.03] hover:border-vish-accent/30 hover:bg-white/[0.05] transition-all duration-500"
                >
                  {/* Quote icon */}
                  <Quote className="w-8 h-8 text-vish-accent opacity-70 shrink-0" />

                  {/* Quote text */}
                  <blockquote className="font-display text-xl md:text-2xl text-white leading-snug flex-1">
                    "{t.quote}"
                  </blockquote>

                  {/* Author */}
                  <div className="border-t border-white/8 pt-6 flex items-end justify-between gap-4">
                    <div>
                      <p className="font-display text-lg text-white mb-0.5">{t.name}</p>
                      <p className="font-mono text-sm text-vish-accent">{t.role}</p>
                      {t.company && (
                        <p className="font-mono text-sm text-gray-500 mt-0.5">{t.company}</p>
                      )}
                    </div>
                    {/* Index label */}
                    <span className="font-mono text-4xl text-white/5 font-bold leading-none select-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Contact />
    </PageLayout>
  );
};
