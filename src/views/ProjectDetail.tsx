'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ExternalLink, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { useTinaProjectDetail } from '../hooks/useTinaVisualEditing';
import { getImageUrl } from '../utils/imageUrl';
import { Navbar } from '../components/navbar/navbar';
import { Contact } from '../components/contact/contact';
import { Button } from '../components/ui/button/button';
import { SectionTitle } from '../components/ui/section-title/section-title';
import { useState, useEffect, useCallback } from 'react';
import { trackProjectSiteClick } from '@/src/lib/analytics';

export const ProjectDetail = () => {
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : (params?.slug ?? '');
  const { data: project } = useTinaProjectDetail(slug || '');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  const galleryImages: string[] = (project?.gallery ?? []).map(getImageUrl);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() =>
    setLightboxIndex(i => (i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length)), [galleryImages.length]);
  const nextImage = useCallback(() =>
    setLightboxIndex(i => (i === null ? null : (i + 1) % galleryImages.length)), [galleryImages.length]);

  const renderSectionText = (text: string) =>
    text
      .split(/\n+/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
      .map((paragraph) => (
        <p key={paragraph} className="font-sans text-lg md:text-xl text-gray-300 leading-relaxed">
          {paragraph}
        </p>
      ));

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, closeLightbox, prevImage, nextImage]);

  if (!project) {
    return (
      <div className="min-h-screen bg-vish-bg text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display mb-4">Project Not Found</h1>
          <Link href="/" className="text-vish-accent hover:underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  const projectSections = [
    {
      eyebrow: '01',
      title: 'Overview',
      content: project.overview || project.fullDescription || project.description,
      image: project.overviewImage,
    },
    {
      eyebrow: '02',
      title: 'The Challenge',
      content: project.challenge,
      image: project.challengeImage,
    },
    {
      eyebrow: '03',
      title: 'The Strategy',
      content: project.strategy,
      image: project.strategyImage,
    },
    {
      eyebrow: '04',
      title: 'The Solution',
      content: project.solution,
      image: project.solutionImage,
    },
  ];

  return (
    <div className="bg-vish-bg min-h-screen text-white selection:bg-vish-accent selection:text-black">
      <Navbar />

      <main className="pt-32 pb-12 px-6 md:px-12 max-w-350 mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-vish-accent transition-colors mb-12 group">
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
              onClick={() => trackProjectSiteClick(slug, project.title)}
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
            src={getImageUrl(project.image)}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          <div className="lg:col-span-4">
            <h3 className="font-display text-2xl mb-6 text-white">Project Details</h3>
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
                  <Button
                    href={project.siteUrl}
                    variant="external"
                    size="xs"
                    onClick={() => trackProjectSiteClick(slug, project.title)}
                    icon={<ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />}
                    iconPosition="right"
                  >
                    View Site
                  </Button>
                </div>
              )}
            </div>
            {project.techStack && project.techStack.length > 0 && (
              <div className="mt-10 border-t border-white/10 pt-6">
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
          <div className="lg:col-span-8 lg:pt-12">
            <p className="font-sans text-2xl md:text-4xl text-gray-200 leading-tight">
              {project.description}
            </p>
          </div>
        </div>

        <div className="space-y-24 mb-24">
          {projectSections.map((section, index) => {
            const hasImage = Boolean(section.image);
            const isReversed = index % 2 === 1;

            return (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.55 }}
                className="border-t border-white/10 pt-10"
              >
                <div className={`grid grid-cols-1 ${hasImage ? 'lg:grid-cols-12' : ''} gap-8 lg:gap-12 items-center`}>
                  <div className={`${hasImage ? `lg:col-span-5 ${isReversed ? 'lg:order-2' : ''}` : 'max-w-4xl'} space-y-6`}>
                    <div>
                      <span className="font-mono text-xs text-vish-accent">{section.eyebrow}</span>
                      <SectionTitle size="md" className="mt-4">
                        {section.title}
                      </SectionTitle>
                    </div>
                    <div className="space-y-5">
                      {section.content ? (
                        renderSectionText(section.content)
                      ) : (
                        <p className="font-sans text-lg md:text-xl text-gray-500 leading-relaxed">
                          Details coming soon.
                        </p>
                      )}
                    </div>
                  </div>
                  {hasImage && (
                    <div className={`lg:col-span-7 ${isReversed ? 'lg:order-1' : ''}`}>
                      <div className="aspect-16/10 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                        <img
                          src={getImageUrl(section.image || '')}
                          alt={`${project.title} ${section.title}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </motion.section>
            );
          })}
        </div>

        {project.gallery && project.gallery.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-mono text-xs text-gray-500 uppercase tracking-widest">Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {project.gallery.map((img, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => openLightbox(index)}
                  className="group relative rounded-lg overflow-hidden aspect-square bg-white/5 border border-white/8 cursor-zoom-in hover:border-white/20 transition-all duration-200"
                >
                  <img
                    src={getImageUrl(img)}
                    alt={`${project.title} ${index + 1}`}
                    className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-200 flex items-center justify-center">
                    <ZoomIn className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 drop-shadow" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </main>

      <Contact />

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && galleryImages[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Counter */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 font-mono text-sm text-gray-400">
              {lightboxIndex + 1} / {galleryImages.length}
            </div>

            {/* Prev */}
            {galleryImages.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 md:left-8 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors duration-200"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-[90vw] max-h-[85vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[lightboxIndex]}
                alt={`${project.title} gallery ${lightboxIndex + 1}`}
                className="block max-w-[90vw] max-h-[85vh] w-auto h-auto object-contain"
              />
            </motion.div>

            {/* Next */}
            {galleryImages.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 md:right-8 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors duration-200"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
