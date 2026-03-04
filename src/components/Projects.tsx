import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTinaProjectsList } from '../hooks/useTinaVisualEditing';
import { getImageUrl } from '../utils/imageUrl';
import { Button } from './ui/Button';

export const Projects = ({ showViewAll = true }: { showViewAll?: boolean }) => {
  const { data: allProjects } = useTinaProjectsList();
  const projects = allProjects.filter((p) => p.featuredOnHome).slice(0, 4);
  const [activeProject, setActiveProject] = useState(projects[0]);

  return (
    <section className="py-32 px-6 md:px-12 bg-vish-bg" id="work">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-24 flex items-end justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-medium text-white mb-8"
          >
            Selected <br className="hidden md:block" />
            Projects<span className="text-vish-accent">.</span>
          </motion.h2>
          <div className="hidden md:block font-mono text-sm text-gray-500">
            // RECENT WORK 2024-2026
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Project List */}
          <div className="lg:col-span-7 flex flex-col">
            {projects.map((project, index) => (
              <Link
                to={`/project/${project.slug}`}
                key={project.id}
                className="group block w-full"
                data-cursor="project"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20, backgroundColor: "rgba(0,0,0,0)" }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover="hover"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  variants={{
                    hover: {
                      backgroundColor: "#FFD600",
                      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
                    }
                  }}
                  className="border-t border-white/10 py-12 px-4 md:px-8 cursor-pointer relative rounded-2xl overflow-hidden"
                  onMouseEnter={() => setActiveProject(project)}
                >
                  <div className="flex items-start gap-6 md:gap-12">
                    <span className="font-mono text-sm text-gray-600 mt-2 md:mt-4 group-hover:text-black transition-colors duration-500">0{index + 1}</span>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <motion.h3
                          className="font-display text-4xl md:text-6xl font-medium text-white origin-left"
                          variants={{
                            hover: {
                              scale: 1.02,
                              color: "#000000",
                              x: 10,
                              transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
                            }
                          }}
                        >
                          {project.title}
                        </motion.h3>
                        <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
                          <ArrowUpRight className="w-6 h-6 text-vish-accent" />
                        </div>
                      </div>

                      <div className="flex gap-8 text-sm font-sans text-gray-500 mb-6 group-hover:text-black/70 transition-colors duration-500">
                        <span className="text-gray-400 group-hover:text-black/70 transition-colors duration-500">{Array.isArray(project.category) ? project.category.join(' / ') : project.category}</span>
                        <span className="group-hover:text-black/70 transition-colors duration-500">{project.year}</span>
                      </div>

                      <p className="text-gray-400 font-sans max-w-md hidden lg:block opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-500 overflow-hidden group-hover:text-black/80">
                        {project.description}
                      </p>

                      {/* Mobile Image */}
                      <div className="lg:hidden mt-6 rounded-xl overflow-hidden aspect-video">
                        <img
                          src={getImageUrl(project.image)}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
            <div className="border-t border-white/10" />

            {showViewAll && (
              <div className="mt-12">
                <Button
                  href="/projects"
                  variant="white"
                  size="md"
                  icon={<ArrowUpRight className="w-5 h-5" />}
                  iconPosition="right"
                >
                  View All Projects
                </Button>
              </div>
            )}
          </div>

          {/* Sticky Preview Image (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-32">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-white/5 border border-white/10">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeProject.id}
                  src={getImageUrl(activeProject.image)}
                  alt={activeProject.title}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-mono text-vish-accent text-sm mb-2">{Array.isArray(activeProject.category) ? activeProject.category.join(' / ') : activeProject.category}</p>
                    <h4 className="font-display text-3xl text-white">{activeProject.title}</h4>
                  </div>
                  <span className="font-sans text-sm text-gray-300">{activeProject.year}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
