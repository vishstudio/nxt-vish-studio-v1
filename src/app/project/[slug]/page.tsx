import { getProjects } from '@/src/lib/projects';
import { ProjectDetailWrapper } from './ProjectDetailWrapper';

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default function ProjectDetailPage() {
  return <ProjectDetailWrapper />;
}
