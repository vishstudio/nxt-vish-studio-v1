import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useTinaProjectDetail } from '../hooks/useTinaVisualEditing';
import { Navbar } from '../components/Navbar';
import { CustomCursor } from '../components/CustomCursor';

export const ProjectDetail = () => {
  const { slug } = useParams();
  const { data: project } = useTinaProjectDetail(slug || '');

  if (!project) {
    return (
      <div className="min-h-screen bg-vish-bg text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display mb-4">Project Not Found</h1>
          <Link to="/" className="text-vish-accent hover:underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-vish-bg min-h-screen text-white selection:bg-vish-accent selection:text-black">
      <CustomCursor />
      <Navbar />

      <main className="pt-32 pb-12 px-6 md:px-12 max-w-[1400px] mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-vish-accent transition-colors mb-12 group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {(Array.isArray(project.category) ? project.category : [project.category]).map((cat) => (
              <span key={cat} className="font-mono text-vish-accent text-sm">{cat}</span>
            ))}
          </div>
          <h1 className={`font-display text-6xl md:text-8xl lg:text-9xl font-medium tracking-tight leading-[0.95] ${project.siteUrl ? 'mb-8' : 'mb-12'}`}>
            {project.title}<span className="text-vish-accent">.</span>
          </h1>
          {project.siteUrl && (
            <motion.a
              href={project.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="inline-flex items-center gap-2 mb-12 px-6 py-3 bg-vish-accent text-black font-mono text-sm font-semibold rounded-full hover:bg-white transition-colors duration-200 group"
            >
              Visit Live Site
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </motion.a>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full aspect-video rounded-2xl overflow-hidden mb-16 border border-white/10"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          <div className="lg:col-span-4">
            <h3 className="font-display text-2xl mb-6 text-white">Project Overview</h3>
            <div className="space-y-4 font-mono text-sm text-gray-400 border-t border-white/10 pt-6">
              <div className="flex justify-between">
                <span>Year</span>
                <span className="text-white">{project.year}</span>
              </div>
              <div className="flex justify-between">
                <span>Category</span>
                <span className="text-white text-right">{Array.isArray(project.category) ? project.category.join(', ') : project.category}</span>
              </div>
              <div className="flex justify-between">
                <span>Role</span>
                <span className="text-white">Design & Development</span>
              </div>
              {project.siteUrl && (
                <div className="flex justify-between items-center pt-2">
                  <span>Live Site</span>
                  <a
                    href={project.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-vish-accent hover:underline transition-colors"
                  >
                    View Site <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className="lg:col-span-8">
            <p className="font-sans text-xl md:text-2xl text-gray-300 leading-relaxed">
              {project.fullDescription || project.description}
            </p>
            {project.techStack && project.techStack.length > 0 && (
              <div className="mt-10">
                <h4 className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-4">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/15 bg-white/5 font-mono text-sm text-gray-300 hover:border-vish-accent/50 hover:text-vish-accent transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {project.gallery && (
          <div className="space-y-12">
            <h3 className="font-display text-3xl text-white mb-8">Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.gallery.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="rounded-xl overflow-hidden aspect-[4/3] border border-white/10"
                >
                  <img
                    src={img}
                    alt={`${project.title} gallery ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="py-12 border-t border-white/10 text-center font-mono text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} VISH Studio. All rights reserved.</p>
      </footer>
    </div>
  );
};
