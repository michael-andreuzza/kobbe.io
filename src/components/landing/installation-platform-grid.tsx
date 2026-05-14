import { motion, useReducedMotion } from "motion/react";

type InstallationPlatform = {
  name: string;
  logoSrc: string;
};

type InstallationPlatformGridProps = {
  platforms: InstallationPlatform[];
};

export function InstallationPlatformGrid({
  platforms,
}: InstallationPlatformGridProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="bg-muted grid grid-cols-4 place-items-center gap-x-6 gap-y-5 p-8 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-11 lg:p-42"
      aria-label="Supported installation platforms"
    >
      {platforms.map((platform, index) => (
        <motion.div
          className="flex size-6 items-center justify-center"
          key={platform.name}
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 6,
                  scale: 0.82,
                  filter: "blur(4px)",
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
          }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{
            type: "spring",
            visualDuration: 0.65,
            bounce: 0.2,
            delay: 0.24 + index * 0.035 + (index % 5) * 0.015,
          }}
        >
          <img
            src={platform.logoSrc}
            alt={`${platform.name} logo`}
            className="size-6 rounded object-contain"
            loading="lazy"
            width="24"
            height="24"
          />
        </motion.div>
      ))}
    </div>
  );
}

export default InstallationPlatformGrid;
