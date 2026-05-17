"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "lenis";
import { MapPin } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --------------------------------------------------
// 1. CINEMATIC INTRO LOADER
// --------------------------------------------------
function IntroLoader({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = async () => {
      await new Promise((r) => setTimeout(r, 1000));
      setStep(1); // "Every love story becomes a memory."
      await new Promise((r) => setTimeout(r, 3000));
      setStep(2); // "Ours became a POEM."
      await new Promise((r) => setTimeout(r, 2500));
      setStep(3); // "PO → Pooja", "EM → Hemnath"
      await new Promise((r) => setTimeout(r, 3000));
      setStep(4); // Merge to POEM
      await new Promise((r) => setTimeout(r, 2500));
      onComplete();
    };
    sequence();
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-softblack text-ivory overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.p
            key="step1"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="font-serif text-2xl md:text-3xl text-beige tracking-widest text-center px-6"
          >
            Every love story becomes a memory.
          </motion.p>
        )}
        {step === 2 && (
          <motion.p
            key="step2"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="font-serif text-3xl md:text-5xl text-champagne text-center px-6 italic"
          >
            Ours became a POEM.
          </motion.p>
        )}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="flex flex-col md:flex-row items-center gap-12"
          >
            <div className="text-center">
              <h2 className="font-serif text-6xl md:text-8xl text-ivory">PO</h2>
              <p className="font-cursive text-3xl md:text-5xl text-champagne mt-2 opacity-80">Pooja</p>
            </div>
            <div className="w-px h-16 md:w-16 md:h-px bg-bronze/30" />
            <div className="text-center">
              <h2 className="font-serif text-6xl md:text-8xl text-ivory">EM</h2>
              <p className="font-cursive text-3xl md:text-5xl text-champagne mt-2 opacity-80">Hemnath</p>
            </div>
          </motion.div>
        )}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="font-serif text-7xl md:text-9xl text-champagne gold-glow tracking-[0.2em] ml-[0.2em]">
              POEM
            </h1>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// --------------------------------------------------
// 2. FULLSCREEN HERO SECTION
// --------------------------------------------------
function HeroSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-maroon">
      <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
        {/* Placeholder for Hero Couple Image */}
        <div className="w-full h-full placeholder-glow flex items-center justify-center relative">
          <div className="absolute inset-0 bg-softblack/40 backdrop-blur-[2px]" />
          <span className="relative z-10 text-champagne/50 font-sans tracking-widest text-sm border border-champagne/20 px-4 py-2 rounded-full uppercase">
            [ HERO COUPLE IMAGE PLACEHOLDER ]
          </span>
        </div>
      </motion.div>

      <div className="absolute inset-0 cinematic-gradient" />

      <motion.div style={{ opacity }} className="relative z-10 text-center flex flex-col items-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className="font-serif text-5xl md:text-8xl text-ivory tracking-wider leading-tight"
        >
          Pooja Rosepadh<br />
          <span className="font-cursive text-4xl md:text-7xl text-champagne">&</span><br />
          Hemnath S
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-8 font-sans font-light tracking-[0.3em] text-beige text-sm md:text-base uppercase"
        >
          6 September 2026
        </motion.p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="font-sans text-xs tracking-widest text-bronze uppercase">Scroll to Begin</span>
        <motion.div 
          animate={{ height: ["0px", "40px", "0px"], opacity: [0, 1, 0], y: [0, 20, 40] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px bg-champagne"
        />
      </motion.div>
    </section>
  );
}

// --------------------------------------------------
// 3. POETIC STORYTELLING SECTION
// --------------------------------------------------
function StorytellingSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray(".story-line") as HTMLElement[];
      lines.forEach((line) => {
        gsap.fromTo(line, 
          { opacity: 0, y: 50, filter: "blur(10px)" },
          { 
            opacity: 1, y: 0, filter: "blur(0px)",
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: line,
              start: "top 80%",
              end: "bottom 60%",
              scrub: 1,
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-40 bg-softblack text-center flex flex-col items-center justify-center min-h-[150vh] gap-[30vh]">
      <div className="story-line font-serif text-3xl md:text-5xl lg:text-6xl text-beige italic">
        "In silence, we met."
      </div>
      <div className="story-line font-serif text-3xl md:text-5xl lg:text-6xl text-beige italic">
        "In laughter, we stayed."
      </div>
      <div className="story-line font-serif text-4xl md:text-6xl lg:text-7xl text-champagne gold-glow italic">
        "In love, we became POEM."
      </div>
    </section>
  );
}

// --------------------------------------------------
// 4. COUPLE SHOWCASE SECTION
// --------------------------------------------------
function ShowcaseSection() {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-softblack">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        <div className="md:col-span-5 flex justify-end relative group">
          <div className="w-full aspect-[3/4] placeholder-glow rounded-sm overflow-hidden relative border border-bronze/10">
            <div className="absolute inset-0 bg-maroon/10 mix-blend-overlay" />
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
              <span className="text-champagne/50 font-sans tracking-widest text-xs border border-champagne/20 px-3 py-1 rounded-full uppercase">
                [ COUPLE PORTRAIT PLACEHOLDER ]
              </span>
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-softblack/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        </div>

        <div className="md:col-span-7 space-y-12 pl-0 md:pl-12">
          <div className="space-y-4">
            <h2 className="font-serif text-4xl md:text-6xl text-ivory">The Romance</h2>
            <div className="w-24 h-px bg-champagne" />
            <p className="font-sans text-beige font-light leading-relaxed max-w-lg pt-4">
              A journey of a thousand miles begins with a single step. Ours began with a glance, a smile, and a promise to walk together forever.
            </p>
          </div>
          
          <div className="w-full max-w-md aspect-video placeholder-glow rounded-sm overflow-hidden relative group border border-bronze/10">
            <div className="absolute inset-0 bg-maroon/20 mix-blend-overlay" />
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
              <span className="text-champagne/50 font-sans tracking-widest text-xs border border-champagne/20 px-3 py-1 rounded-full uppercase">
                [ ENGAGEMENT PHOTO PLACEHOLDER ]
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// --------------------------------------------------
// 5. WEDDING DETAILS EXPERIENCE
// --------------------------------------------------
function DetailsSection() {
  return (
    <section className="py-40 bg-[#121212] relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-maroon/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <h2 className="font-serif text-sm tracking-[0.5em] text-bronze uppercase mb-16">The Auspicious Occasion</h2>
        
        <div className="flex flex-col gap-12 md:gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <span className="font-sans text-xs tracking-widest text-beige/60 uppercase mb-3">Date</span>
            <span className="font-serif text-3xl md:text-5xl text-ivory">6 September 2026</span>
          </motion.div>

          <div className="w-px h-12 bg-gradient-to-b from-transparent via-champagne/30 to-transparent mx-auto" />

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <span className="font-sans text-xs tracking-widest text-beige/60 uppercase mb-3">Muhurtham</span>
            <span className="font-serif text-3xl md:text-5xl text-champagne gold-glow">7:45 AM – 9:00 AM</span>
            <span className="font-sans text-sm tracking-widest text-beige/80 mt-4 italic">Followed by Breakfast</span>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// --------------------------------------------------
// 6. VENUE EXPERIENCE SECTION
// --------------------------------------------------
function VenueSection() {
  return (
    <section className="py-32 px-6 bg-softblack">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Venue Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8"
          >
            <h2 className="font-serif text-sm tracking-[0.5em] text-bronze uppercase">The Venue</h2>
            <h3 className="font-serif text-5xl md:text-7xl text-ivory leading-tight">
              Sai Villa <br />Events
            </h3>
            <p className="font-sans font-light tracking-wide text-beige text-lg flex items-start gap-3">
              <MapPin className="text-champagne shrink-0 mt-1" size={20} />
              <span>Neelankarai, Chennai<br /><span className="text-sm opacity-70">Tamil Nadu, India</span></span>
            </p>
            <div className="pt-8">
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block border border-champagne/50 px-8 py-4 text-champagne font-sans text-xs tracking-[0.2em] uppercase hover:bg-champagne hover:text-softblack transition-colors duration-500 rounded-sm"
              >
                Navigate to Venue
              </a>
            </div>
          </motion.div>

          {/* Venue Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full aspect-[4/3] placeholder-glow rounded-sm overflow-hidden relative border border-bronze/20"
          >
            <div className="absolute inset-0 bg-softblack/30 mix-blend-overlay" />
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
              <span className="text-champagne/50 font-sans tracking-widest text-xs border border-champagne/20 px-4 py-2 rounded-full uppercase">
                [ WEDDING VENUE IMAGE PLACEHOLDER ]
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// --------------------------------------------------
// 7. IMMERSIVE GALLERY SECTION
// --------------------------------------------------
function GallerySection() {
  const images = [
    { id: 1, aspect: "aspect-[3/4]" },
    { id: 2, aspect: "aspect-square" },
    { id: 3, aspect: "aspect-[4/3]" },
    { id: 4, aspect: "aspect-[3/4]" },
    { id: 5, aspect: "aspect-[4/3]" },
    { id: 6, aspect: "aspect-square" },
  ];

  return (
    <section className="py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-serif text-sm tracking-[0.5em] text-bronze uppercase">Moments</h2>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`w-full ${img.aspect} placeholder-glow rounded-sm overflow-hidden relative group break-inside-avoid border border-white/5`}
            >
              <div className="absolute inset-0 bg-maroon/5 group-hover:bg-transparent transition-colors duration-700" />
              <div className="absolute inset-0 flex items-center justify-center p-6 text-center opacity-70 group-hover:opacity-100 transition-opacity">
                <span className="text-champagne/40 font-sans tracking-widest text-[10px] border border-champagne/10 px-2 py-1 rounded-full uppercase">
                  [ GALLERY IMAGE PLACEHOLDER ]
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --------------------------------------------------
// 8. COUNTDOWN EXPERIENCE
// --------------------------------------------------
function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date("2026-09-06T07:45:00").getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-40 bg-softblack text-center relative border-t border-white/5">
      <h2 className="font-serif text-sm tracking-[0.5em] text-bronze uppercase mb-16">The Wait</h2>
      
      <div className="flex justify-center gap-6 md:gap-12 px-6">
        {[
          { label: "Days", value: timeLeft.days },
          { label: "Hours", value: timeLeft.hours },
          { label: "Mins", value: timeLeft.minutes },
          { label: "Secs", value: timeLeft.seconds },
        ].map((unit, i) => (
          <div key={unit.label} className="flex flex-col items-center">
            <span className="font-serif text-4xl md:text-7xl text-champagne gold-glow w-16 md:w-32">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="font-sans text-[10px] md:text-xs tracking-[0.2em] text-beige uppercase mt-4 opacity-70">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

// --------------------------------------------------
// 9. FINAL EMOTIONAL ENDING
// --------------------------------------------------
function EndingSection() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Floating particles effect */}
      <div className="absolute inset-0 placeholder-glow opacity-10" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="relative z-10 text-center px-6"
      >
        <p className="font-serif text-2xl md:text-4xl text-beige italic mb-8">
          Thank you for being part of our
        </p>
        <h2 className="font-serif text-6xl md:text-9xl text-champagne gold-glow tracking-widest">
          POEM
        </h2>
      </motion.div>
    </section>
  );
}

// --------------------------------------------------
// MAIN PAGE EXPORT
// --------------------------------------------------
export default function WeddingWebsite() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="bg-softblack min-h-screen text-ivory">
      <AnimatePresence>
        {loading && <IntroLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        <HeroSection />
        <StorytellingSection />
        <ShowcaseSection />
        <DetailsSection />
        <VenueSection />
        <GallerySection />
        <CountdownSection />
        <EndingSection />
      </div>
    </main>
  );
}
