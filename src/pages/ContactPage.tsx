import { motion } from 'motion/react';
import { Navbar } from '../components/Navbar';
import { CustomCursor } from '../components/CustomCursor';
import { ScrollCircular } from '../components/ScrollCircular';
import { Contact } from '../components/Contact';
import { ArrowDown, MessageSquare, Clock, Zap } from 'lucide-react';

export const ContactPage = () => {
  return (
    <div className="bg-vish-bg min-h-screen text-white selection:bg-vish-accent selection:text-black cursor-none">
      <CustomCursor />
      <Navbar />
      <ScrollCircular />

      <main className="pt-32">
        {/* Intro Section */}
        <section className="px-6 md:px-12 py-20">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-5xl"
            >
              <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-medium tracking-tight leading-[0.95] text-white mb-12">
                Ready to start your <br />
                <span className="text-gray-500">next project<span className="text-vish-accent">?</span></span>
              </h1>
              <p className="font-sans text-xl md:text-2xl text-gray-400 leading-relaxed max-w-2xl">
                We help ambitious brands and startups build digital products that matter. Whether you have a clear vision or just a rough idea, we're here to help you bring it to life.
              </p>
            </motion.div>

            {/* Comfort/Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 border-t border-white/10 pt-12">
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
          </div>
        </section>

        {/* Contact Form / Details */}
        <Contact />
      </main>
    </div>
  );
};
