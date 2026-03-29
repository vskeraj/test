import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const FireflyBanner = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Firefly moves in a lazy-S curve as user scrolls
  const fireflyX = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [10, 70, 30, 80, 50]);
  const fireflyY = useTransform(scrollYProgress, [0, 1], [10, 85]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 0.9, 0.5]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.4, 0.8]);

  return (
    <div ref={ref} className="relative h-[80vh] overflow-hidden bg-background">
      {/* Background stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-foreground/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animation: `pulse-glow ${2 + Math.random() * 3}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Path line the firefly follows */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d="M 10,10 C 40,20 80,25 70,40 C 60,55 20,50 30,65 C 40,80 70,75 80,85 C 85,90 50,95 50,95"
          fill="none"
          stroke="hsl(45 93% 47% / 0.06)"
          strokeWidth="0.3"
          strokeDasharray="2 2"
        />
      </svg>

      {/* The Firefly */}
      <motion.div
        className="absolute z-10"
        style={{
          left: useTransform(fireflyX, (v) => `${v}%`),
          top: useTransform(fireflyY, (v) => `${v}%`),
          x: "-50%",
          y: "-50%",
        }}
      >
        {/* Glow aura */}
        <motion.div
          className="absolute -inset-20 firefly-glow pointer-events-none"
          style={{ opacity: glowOpacity, scale: glowScale }}
        />
        {/* Firefly body */}
        <motion.div className="relative">
          {/* Lantern light */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4 h-6 bg-primary/60 rounded-full blur-sm animate-pulse-glow" />
          {/* Firefly SVG */}
          <svg width="40" height="40" viewBox="0 0 40 40" className="drop-shadow-[0_0_12px_hsl(45,93%,47%,0.6)]">
            {/* Wings */}
            <ellipse cx="13" cy="16" rx="8" ry="4" fill="hsl(45 93% 47% / 0.15)" transform="rotate(-20 13 16)" />
            <ellipse cx="27" cy="16" rx="8" ry="4" fill="hsl(45 93% 47% / 0.15)" transform="rotate(20 27 16)" />
            {/* Body */}
            <ellipse cx="20" cy="20" rx="4" ry="6" fill="hsl(45 93% 47% / 0.8)" />
            {/* Head */}
            <circle cx="20" cy="13" r="3" fill="hsl(45 93% 47% / 0.9)" />
            {/* Lantern glow */}
            <circle cx="20" cy="28" r="3" fill="hsl(45 93% 47%)" className="animate-pulse-glow" />
            {/* Tiny books the firefly carries */}
            <rect x="15" y="22" width="3" height="4" rx="0.5" fill="hsl(217 32% 40%)" />
            <rect x="19" y="21" width="3" height="5" rx="0.5" fill="hsl(0 60% 40%)" />
            <rect x="23" y="22" width="2.5" height="4" rx="0.5" fill="hsl(150 40% 35%)" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Content revealed by proximity to firefly */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Read by the light
          <br />
          <span className="text-gradient-amber">of the Firefly</span>
        </motion.h1>
        <motion.p
          className="text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Your sanctuary for curated literature. Scroll down and let the firefly illuminate your path to discovery.
        </motion.p>
        <motion.div
          className="mt-8 flex items-center gap-2 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <span className="animate-float">↓</span>
          <span>Scroll to explore</span>
        </motion.div>
      </div>
    </div>
  );
};

export default FireflyBanner;
