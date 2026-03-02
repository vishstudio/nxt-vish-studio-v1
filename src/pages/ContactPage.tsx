import { motion } from 'motion/react';
import { Contact } from '../components/Contact';
import { MessageSquare, Clock, Zap, type LucideIcon } from 'lucide-react';
import { PageLayout } from '../components/ui/PageLayout';
import { PageHero } from '../components/ui/PageHero';
import { Section } from '../components/ui/Section';
import { getContactPage } from '../lib/content';

const iconMap: Record<string, LucideIcon> = {
  MessageSquare,
  Clock,
  Zap,
};

export const ContactPage = () => {
  const content = getContactPage();

  return (
    <PageLayout>
      <PageHero
        label={content.heroLabel}
        title={
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-6xl md:text-8xl lg:text-9xl font-medium tracking-tight leading-[0.95] text-white mb-12"
          >
            {content.heroTitleLine1} <br />
            <span className="text-gray-500">{content.heroTitleLine2}<span className="text-vish-accent">{content.heroTitlePunctuation}</span></span>
          </motion.h1>
        }
        description={content.heroDescription}
      />

      <Section className="pb-20">
        {/* Comfort/Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-12">
          {content.trustIndicators.map((item, index) => {
            const Icon = iconMap[item.icon] || Zap;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-vish-accent/10 transition-colors">
                  <Icon className="w-6 h-6 text-gray-300 group-hover:text-vish-accent transition-colors" />
                </div>
                <h3 className="font-display text-xl text-white mb-3">{item.title}</h3>
                <p className="font-sans text-gray-400 text-sm leading-relaxed max-w-xs">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* Contact Form / Details */}
      <Contact />
    </PageLayout>
  );
};
