import type { Metadata } from 'next';
import { getProjects, getProject } from '@/src/lib/projects';
import { ProjectDetailWrapper } from './ProjectDetailWrapper';

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: 'Project | VISH Studio' };
  }

  const categories = Array.isArray(project.category)
    ? project.category.join(', ')
    : project.category;

  return {
    title: `${project.title} | VISH Studio`,
    description: `${project.description} — ${categories} project by VISH Studio.`,
  };
}

export default function ProjectDetailPage() {
  return <ProjectDetailWrapper />;
}
