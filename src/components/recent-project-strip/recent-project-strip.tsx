import { getProjects } from '../../lib/projects';
import { getImageUrl } from '../../utils/imageUrl';
import { RecentProjectStripMotion } from './recent-project-strip-motion';

export function RecentProjectStrip() {
  const projects = getProjects()
    .filter((project) => project.featuredOnHome)
    .slice(0, 4)
    .map((project) => ({
      slug: project.slug,
      title: project.title,
      year: project.year,
      image: getImageUrl(project.image),
    }));

  if (projects.length === 0) {
    return null;
  }

  return <RecentProjectStripMotion projects={projects} />;
}
