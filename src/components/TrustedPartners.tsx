import { motion } from 'motion/react';

const partners = [
  "Google", "Spotify", "Airbnb", "Stripe", "Uber", "Nike", "Apple", "Netflix"
];

export const TrustedPartners = () => {
  return (
    <section className="py-16 bg-vish-subtle border-y border-white/5 overflow-hidden">
      <div className="px-6 md:px-12 max-w-[1400px] mx-auto mb-8">
        <p className="text-sm font-sans font-medium text-gray-400 uppercase tracking-wide">Trusted by industry leaders</p>
      </div>
      
      <div className="flex relative">
        <motion.div 
          className="flex gap-16 md:gap-32 px-6 items-center whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        >
          {[...partners, ...partners, ...partners].map((partner, index) => (
            <span key={index} className="text-3xl md:text-4xl font-display font-medium text-white/40 hover:text-white transition-colors cursor-default">
              {partner}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
