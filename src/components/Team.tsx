import { motion } from 'motion/react';
import { User, Code, PenTool, Zap, Sparkles, Layout, Globe, Terminal } from 'lucide-react';
import { team } from '../data/team';

// Helper to get icon based on role
const getIcon = (role: string) => {
  const lowerRole = role.toLowerCase();
  if (lowerRole.includes('founder') || lowerRole.includes('director')) return Sparkles;
  if (lowerRole.includes('designer') || lowerRole.includes('creative')) return PenTool;
  if (lowerRole.includes('technical') || lowerRole.includes('developer')) return Terminal;
  if (lowerRole.includes('strategist')) return Globe;
  return User;
};

export const Team = ({ showTitle = true }: { showTitle?: boolean }) => {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-vish-bg text-white" id="team">
      <div className="max-w-[1400px] mx-auto">
        {showTitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20 md:mb-32"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6">
              Our Team<span className="text-vish-accent">.</span>
            </h2>
            <p className="font-sans text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed">
              We are a collective of specialists, working across disciplines to deliver unified digital experiences.
            </p>
          </motion.div>
        )}

        <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
          {team.map((member, index) => {
            const Icon = getIcon(member.role);
            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group flex flex-col h-full w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-24px)] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors duration-500 rounded-2xl overflow-hidden"
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden">
                  <div className="absolute inset-0 bg-gray-900 animate-pulse" />
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                    loading="lazy"
                  />
                  {/* Gradient Overlay for better text readability if needed, though text is below */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content Container */}
                <div className="flex-1 p-8 flex flex-col bg-[#050505] group-hover:bg-[#0a0a0a] transition-colors duration-500">
                  <div className="mb-6">
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-vish-accent group-hover:border-vish-accent/50 transition-colors duration-500">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-display text-2xl font-medium text-white mb-2 group-hover:translate-x-1 transition-transform duration-300">
                    {member.name}
                  </h3>

                  <p className="font-mono text-xs text-vish-accent uppercase tracking-wider mb-4">
                    {member.role}
                  </p>

                  <p className="font-sans text-sm text-gray-400 leading-relaxed mt-auto group-hover:text-gray-300 transition-colors">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
