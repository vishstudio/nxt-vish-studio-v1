import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { CustomCursor } from '../components/CustomCursor';
import { Contact } from '../components/Contact';
import { projects } from '../data/projects';
import { ScrollCircular } from '../components/ScrollCircular';

export const ProjectsPage = () => {
  return (
    <div className="bg-vish-bg min-h-screen text-white selection:bg-vish-accent selection:text-black cursor-none">
      <CustomCursor />
      <Navbar />
      <ScrollCircular />

      <main className="pt-32 pb-12">
        <section className="px-6 md:px-12 mb-20 md:mb-32">
          <div className="max-w-screen-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="font-mono text-sm text-vish-accent uppercase tracking-widest">Our Portfolio</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-display text-6xl md:text-8xl lg:text-9xl font-medium tracking-tight leading-[0.95] text-white mb-12"
            >
              Selected <br />
              <span className="text-gray-500">works<span className="text-vish-accent">.</span></span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl"
            >
              <p className="font-sans text-xl md:text-2xl text-gray-400 leading-relaxed">
                Explore a curated selection of our finest digital products. From immersive web experiences to comprehensive brand identities, each project represents our commitment to innovation and design excellence.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="px-6 md:px-12 mb-32">
          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-24">
            {projects.map((project, index) => (
              <Link
                to={`/project/${project.id}`}
                key={project.id}
                className="group block relative"
              >
                {/* Image Container */}
                <div className="overflow-hidden rounded-2xl mb-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full aspect-[4/3] bg-gray-900 overflow-hidden"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Hover Overlay - Minimalist */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 delay-100">
                        <ArrowUpRight className="w-6 h-6 text-black" />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Content below image */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="flex justify-between items-start"
                >
                  <div>
                    <h3 className="font-display text-3xl md:text-4xl font-medium text-white mb-2 group-hover:text-gray-300 transition-colors">{project.title}</h3>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-vish-accent uppercase tracking-wider">{project.category}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                      <span className="font-mono text-xs text-gray-400">{project.year}</span>
                    </div>
                  </div>
                  <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0 text-sm text-gray-400 max-w-xs text-right">
                    {project.description}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        <Contact />
      </main>
    </div>
  );
};
