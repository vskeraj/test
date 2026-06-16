import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Deterministic pseudo-random so the server and client render identical stars
// (avoids hydration mismatches now that the home page is statically generated).
function seededStars(count: number) {
  let seed = 1337;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  return Array.from({ length: count }).map(() => {
    const r = rand();
    return {
      left: rand() * 100,
      top: rand() * 100,
      size: r < 0.82 ? 1 : r < 0.96 ? 2 : 3,
      delay: rand() * 5,
      duration: 3 + rand() * 4,
      opacity: 0.2 + rand() * 0.55,
      // A few stars carry a warm amber tint, like distant firefly kin.
      warm: rand() < 0.22,
    };
  });
}

// Slow-rising embers drifting up from the horizon. Deterministic for SSR.
function seededEmbers(count: number) {
  let seed = 4242;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  return Array.from({ length: count }).map(() => ({
    left: rand() * 100,
    size: 1.5 + rand() * 2.5,
    delay: rand() * 7,
    duration: 6 + rand() * 5,
    drift: `${(rand() * 2 - 1) * 40}px`,
  }));
}

const FireflyBanner = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const stars = useMemo(() => seededStars(70), []);
  const embers = useMemo(() => seededEmbers(16), []);

  // Firefly moves in a lazy-S curve as the user scrolls.
  const fireflyX = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [10, 70, 30, 80, 50]);
  const fireflyY = useTransform(scrollYProgress, [0, 1], [10, 85]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.85, 1, 0.95, 0.55]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 0.85]);

  // Gentle parallax + fade for the headline as you scroll past.
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const starsY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const fireflyLeft = useTransform(fireflyX, (v) => `${v}%`);
  const fireflyTop = useTransform(fireflyY, (v) => `${v}%`);

  return (
    <div ref={ref} className="relative h-[88vh] overflow-hidden bg-background">
      {/* Drifting aurora blobs for depth */}
      <div className="absolute -top-32 -left-24 h-[36rem] w-[36rem] rounded-full bg-primary/10 blur-[120px] animate-drift pointer-events-none" />
      <div className="absolute top-1/3 -right-24 h-[30rem] w-[30rem] rounded-full bg-glow-warm/10 blur-[120px] animate-drift pointer-events-none" style={{ animationDelay: "-8s" }} />

      {/* Background stars (deterministic) */}
      <motion.div className="absolute inset-0" style={{ y: starsY }}>
        {stars.map((s, i) => (
          <div
            key={i}
            className={`absolute rounded-full animate-twinkle ${s.warm ? "bg-primary" : "bg-foreground"}`}
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.opacity,
              boxShadow: s.warm ? `0 0 ${s.size * 3}px hsl(45 93% 55% / 0.8)` : undefined,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}
      </motion.div>

      {/* Embers drifting up from the horizon */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {embers.map((e, i) => (
          <span
            key={i}
            className="absolute bottom-0 rounded-full bg-primary/70 animate-ember"
            style={{
              left: `${e.left}%`,
              width: `${e.size}px`,
              height: `${e.size}px`,
              boxShadow: `0 0 ${e.size * 4}px hsl(40 92% 55% / 0.6)`,
              animationDelay: `${e.delay}s`,
              animationDuration: `${e.duration}s`,
              ["--ember-drift" as string]: e.drift,
            }}
          />
        ))}
      </div>

      {/* Path the firefly follows — a faint guide, lit up as you scroll */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d="M 10,10 C 40,20 80,25 70,40 C 60,55 20,50 30,65 C 40,80 70,75 80,85 C 85,90 50,95 50,95"
          fill="none"
          stroke="hsl(45 93% 47% / 0.08)"
          strokeWidth="0.3"
          strokeDasharray="2 2"
        />
        {/* Glowing trail that draws itself in sync with the firefly's descent */}
        <motion.path
          className="firefly-trail"
          d="M 10,10 C 40,20 80,25 70,40 C 60,55 20,50 30,65 C 40,80 70,75 80,85 C 85,90 50,95 50,95"
          fill="none"
          stroke="hsl(45 93% 55%)"
          strokeWidth="0.45"
          strokeLinecap="round"
          style={{ pathLength: scrollYProgress, opacity: glowOpacity }}
        />
      </svg>

      {/* The Firefly */}
      <motion.div
        className="absolute z-10"
        style={{ left: fireflyLeft, top: fireflyTop, x: "-50%", y: "-50%" }}
      >
        {/* Broadest halo — soft ambient bloom */}
        <motion.div
          className="absolute -inset-52 firefly-glow pointer-events-none"
          style={{ opacity: glowOpacity, scale: glowScale }}
        />
        {/* Outer diffuse trail */}
        <motion.div
          className="absolute -inset-32 firefly-glow pointer-events-none"
          style={{ opacity: glowOpacity, scale: glowScale }}
        />
        {/* Inner core glow */}
        <motion.div
          className="absolute -inset-12 firefly-glow pointer-events-none"
          style={{ opacity: glowOpacity }}
        />
        {/* Firefly body with idle bob */}
        <motion.div className="relative animate-bob">
          {/* Lantern light */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4 h-6 bg-primary/60 rounded-full blur-sm animate-pulse-glow" />
          {/* Firefly SVG */}
          <svg width="44" height="44" viewBox="0 0 40 40" className="drop-shadow-[0_0_14px_hsl(45,93%,47%,0.7)]">
            {/* Wings (gentle flutter) */}
            <motion.ellipse
              cx="13" cy="16" rx="8" ry="4" fill="hsl(45 93% 47% / 0.18)"
              style={{ transformOrigin: "20px 16px" }}
              animate={{ rotate: [-20, -14, -20] }}
              transition={{ duration: 0.45, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.ellipse
              cx="27" cy="16" rx="8" ry="4" fill="hsl(45 93% 47% / 0.18)"
              style={{ transformOrigin: "20px 16px" }}
              animate={{ rotate: [20, 14, 20] }}
              transition={{ duration: 0.45, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Body */}
            <ellipse cx="20" cy="20" rx="4" ry="6" fill="hsl(45 93% 47% / 0.85)" />
            {/* Head */}
            <circle cx="20" cy="13" r="3" fill="hsl(45 93% 47% / 0.95)" />
            {/* Lantern glow */}
            <circle cx="20" cy="28" r="3" fill="hsl(45 93% 47%)" className="animate-pulse-glow" />
            {/* Tiny books the firefly carries */}
            <rect x="15" y="22" width="3" height="4" rx="0.5" fill="hsl(217 32% 45%)" />
            <rect x="19" y="21" width="3" height="5" rx="0.5" fill="hsl(0 60% 45%)" />
            <rect x="23" y="22" width="2.5" height="4" rx="0.5" fill="hsl(150 40% 40%)" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Vignette to focus the center, plus warm light pooling at the horizon */}
      <div className="absolute inset-0 bg-vignette pointer-events-none" />
      <div className="absolute inset-0 bg-horizon pointer-events-none" />

      {/* Content */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.span
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
          A curated literary sanctuary
        </motion.span>

        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] text-foreground mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Read by the light
          <br />
          <span className="text-gradient-amber text-glow">of the Firefly</span>
        </motion.h1>

        <motion.p
          className="text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Hand-picked volumes from world-class authors. Scroll down and let the firefly
          illuminate your path to discovery.
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        style={{ opacity: contentOpacity }}
      >
        <span className="text-[11px] uppercase tracking-[0.2em]">Scroll to explore</span>
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-border/80 p-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-scroll-hint" />
        </div>
      </motion.div>
    </div>
  );
};

export default FireflyBanner;
