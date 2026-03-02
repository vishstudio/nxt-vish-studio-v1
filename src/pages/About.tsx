import { motion } from 'motion/react';
import { Navbar } from '../components/Navbar';
import { CustomCursor } from '../components/CustomCursor';
import { Contact } from '../components/Contact';
import { Team } from '../components/Team';
import { TextReveal } from '../components/TextReveal';
import { TrustedPartners } from '../components/TrustedPartners';
import { ArrowDown } from 'lucide-react';
import { ScrollCircular } from '../components/ScrollCircular';

export const AboutPage = () => {
  return (
    <div className="bg-vish-bg min-h-screen text-white selection:bg-vish-accent selection:text-black cursor-none">
      <CustomCursor />
      <Navbar />
      <ScrollCircular />

      <main className="pt-32">
        {/* Hero Section */}
        <section className="px-6 md:px-12 py-20 md:py-32 min-h-[80vh] flex flex-col justify-between">
          <div className="max-w-[1400px] mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <span className="font-mono text-sm text-vish-accent uppercase tracking-widest">About Us</span>
            </motion.div>

            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-medium tracking-tight leading-[0.95] text-white mb-12">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                We craft digital
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="block text-gray-500"
              >
                futures<span className="text-vish-accent">.</span>
              </motion.span>
            </h1>
          </div>
        </section>

        {/* Image & Intro Section */}
        <section className="px-6 md:px-12 py-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative aspect-[4/3] lg:aspect-square overflow-hidden rounded-sm"
              >
                <img
                  src="https://picsum.photos/seed/architecture/1600/1200"
                  alt="Studio Environment"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </motion.div>

              <div className="space-y-12 lg:pt-24">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="font-display text-4xl md:text-5xl leading-tight"
                >
                  We are a design studio focused on building brands that matter.
                </motion.h2>
                <div className="space-y-12">
                  <TextReveal className="font-sans text-xl text-gray-400 leading-relaxed">
                    Founded in 2024, VISH Studio emerged from a simple belief: that design is the most powerful tool for change. We don't just make things look good; we make them work, we make them feel, and we make them last.
                  </TextReveal>
                  <TextReveal className="font-sans text-xl text-gray-400 leading-relaxed">
                    Our team is a collective of designers, developers, and strategists who are obsessed with quality. We strip away the noise to reveal the essence of your brand, creating digital experiences that are as intuitive as they are beautiful.
                  </TextReveal>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section - Redesigned */}
        <section className="px-6 md:px-12 py-32 bg-vish-bg text-white">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-24">
              <span className="font-mono text-sm text-vish-accent uppercase tracking-widest block mb-4">Our Philosophy</span>
              <h2 className="font-display text-6xl md:text-8xl tracking-tight leading-none text-white">CORE VALUES</h2>
            </div>

            <div className="grid grid-cols-1 border-t border-white/10">
              {[
                {
                  id: "01",
                  title: "Radical Simplicity",
                  desc: "Complexity is easy. Simplicity is hard. We fight for clarity in every pixel and line of code."
                },
                {
                  id: "02",
                  title: "Uncompromising Quality",
                  desc: "Good enough is never enough. We push every detail until it breaks, then we build it back better."
                },
                {
                  id: "03",
                  title: "Human First",
                  desc: "Technology serves people, not the other way around. Empathy is our primary design tool."
                }
              ].map((value, index) => (
                <div key={index} className="group grid grid-cols-1 md:grid-cols-12 gap-8 py-16 border-b border-white/10 transition-colors duration-500 hover:bg-white/[0.02]">
                  <div className="md:col-span-1 font-mono text-sm text-vish-accent pt-2">
                    /{value.id}
                  </div>
                  <div className="md:col-span-5">
                    <h3 className="font-display text-4xl md:text-5xl font-medium text-white group-hover:translate-x-2 transition-transform duration-500">{value.title}</h3>
                  </div>
                  <div className="md:col-span-6">
                    <p className="font-sans text-xl text-gray-400 leading-relaxed max-w-lg group-hover:text-gray-300 transition-colors duration-500">{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Team />
        <TrustedPartners />
        <Contact />
      </main>
    </div>
  );
};
