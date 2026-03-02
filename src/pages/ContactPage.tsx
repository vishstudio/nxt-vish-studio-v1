import { motion } from 'motion/react';
import { Contact } from '../components/Contact';
import { MessageSquare, Clock, Zap } from 'lucide-react';
import { PageLayout } from '../components/ui/PageLayout';
import { PageHero } from '../components/ui/PageHero';
import { Section } from '../components/ui/Section';

export const ContactPage = () => {
  return (
    <PageLayout>
      <PageHero
        label="Get in Touch"
        title={
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-6xl md:text-8xl lg:text-9xl font-medium tracking-tight leading-[0.95] text-white mb-12"
          >
            Ready to start your <br />
            <span className="text-gray-500">next project<span className="text-vish-accent">?</span></span>
          </motion.h1>
        }
        description="We help ambitious brands and startups build digital products that matter. Whether you have a clear vision or just a rough idea, we're here to help you bring it to life."
      />

      <Section className="pb-20">
        {/* Comfort/Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-12">
          {[
            {
              icon: MessageSquare,
              title: "Clear Communication",
              desc: "We believe in transparency. You'll be kept in the loop at every stage of the process, with regular updates and open channels."
            },
            {
              icon: Clock,
              title: "Timely Delivery",
              desc: "We respect your time. Our agile workflow ensures we meet deadlines without compromising on the quality of our work."
            },
            {
              icon: Zap,
              title: "Impact Focused",
              desc: "We don't just build for the sake of it. We focus on creating solutions that drive real business results and user value."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-vish-accent/10 transition-colors">
                <item.icon className="w-6 h-6 text-gray-300 group-hover:text-vish-accent transition-colors" />
              </div>
              <h3 className="font-display text-xl text-white mb-3">{item.title}</h3>
              <p className="font-sans text-gray-400 text-sm leading-relaxed max-w-xs">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Contact Form / Details */}
      <Contact />
    </PageLayout>
  );
};
