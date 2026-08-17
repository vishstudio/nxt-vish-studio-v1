/**
 * SEO keyword alignment:
 * - Creative web agency Mauritius
 * - Custom React and Next.js developer
 * - Digital product strategy
 * - Premium UI/UX web systems
 */
import { Navbar } from '../components/navbar/navbar';
import { Hero } from '../components/hero/hero';
import { RecentProjectStrip } from '../components/recent-project-strip/recent-project-strip';
import { TrustedPartners } from '../components/trusted-partners/trusted-partners';
import { About } from '../components/about/about';
import { Team } from '../components/team/team';
import { Services } from '../components/services/services';
import { Process } from '../components/process/process';
import { Projects } from '../components/projects/projects';
import { ProjectsCta } from '../components/projects-cta/projects-cta';
import { Pricing } from '../components/pricing/pricing';
import { Testimonials } from '../components/testimonials/testimonials';
import { Faq } from '../components/faq/faq';
import { Contact } from '../components/contact/contact';
import { ScrollCircular } from '../components/scroll-circular/scroll-circular';

const homePageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'VISH Studio',
  url: 'https://vish.studio',
  areaServed: ['Mauritius', 'Global'],
  slogan: 'We scale brands digitally.',
  description:
    'VISH Studio is a premium web agency in Mauritius engineering high-performance custom software, immersive frontend platforms, and strategic brand architecture globally.',
  keywords: [
    'Creative web agency Mauritius',
    'Custom React and Next.js developer',
    'Digital product strategy',
    'Premium UI/UX web systems',
  ],
  serviceType: [
    'Creative web agency',
    'Custom React and Next.js development',
    'Digital product strategy',
    'Premium UI/UX web systems',
  ],
};

const homeCtaBackgroundImages = [
  '/assets/img/home-cta-1.avif',
  '/assets/img/home-cta-2.avif',
];

export const Home = () => {
  return (
    <>
      <Navbar />
      <ScrollCircular />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageJsonLd) }}
        />
        <p className="sr-only">
          VISH Studio is a premium web agency in Mauritius engineering high-performance custom software, immersive frontend platforms, and strategic brand architecture globally.
        </p>
        <Hero />
        <RecentProjectStrip />
        <TrustedPartners />
        <About />
        <Projects />
        <ProjectsCta index={0} backgroundImage={homeCtaBackgroundImages[0]} />
        <Services />
        <Process />
        <ProjectsCta index={1} backgroundImage={homeCtaBackgroundImages[1]} />
        {/* <Team /> */}
        {/* <Pricing /> */}
        <Testimonials />
        <Faq />
        <Contact />
      </main>
    </>
  );
};
