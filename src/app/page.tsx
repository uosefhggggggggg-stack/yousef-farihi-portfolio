"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  Mail,
  Instagram,
  Send,
  ChevronDown,
  Film,
  Palette,
  Sparkles,
  Monitor,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useCallback } from "react";

/* ──────────────── Animation Variants ──────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ──────────────── Portfolio Data ──────────────── */
const projects = [
  {
    id: 1,
    title: "Apex Build — Complete Brand Identity",
    category: "Brand Identity & Stationery Design",
    description:
      "Full brand identity system for a construction & architecture firm. Includes logo design, brand guidelines with technical specifications, luxury brand book mockups, and a complete office stationery suite featuring business cards, letterheads, envelopes, and branded collateral.",
    tags: ["Brand Identity", "Logo Design", "Stationery", "Brand Guidelines"],
    images: [
      "/portfolio/apex-build-1.jpg",
      "/portfolio/apex-build-2.jpg",
      "/portfolio/apex-build-3.jpg",
      "/portfolio/apex-build-4.jpg",
    ],
    color: "from-zinc-800 to-neutral-900",
    featured: true,
  },
  {
    id: 2,
    title: "Pooyesh Gam — Full Brand Identity & Exhibition",
    category: "Brand Identity, Catalog & Exhibition Design",
    description:
      "Comprehensive brand identity for an industrial packaging manufacturer. Delivered logo system, brand guidelines, product catalog, corporate stationery suite, and a 3D exhibition booth design showcased at international trade shows.",
    tags: ["Brand Identity", "Catalog Design", "Exhibition Design", "Stationery"],
    images: [
      "/portfolio/pooyesh-gam-1.jpg",
      "/portfolio/pooyesh-gam-2.jpg",
      "/portfolio/pooyesh-gam-3.jpg",
      "/portfolio/pooyesh-gam-4.jpg",
      "/portfolio/pooyesh-gam-5.jpg",
    ],
    color: "from-red-950/30 to-zinc-900",
    featured: true,
  },
  {
    id: 3,
    title: "Logo Design Collection — Luxury & Healthcare",
    category: "Logo Design & Brand Marks",
    description:
      "A curated selection of logo designs across diverse industries. From luxury gold jewelry (Shahrokh) and premium leather goods (ARA) to an elite dental clinic (Dr. Heydari) — each logo crafted to communicate brand essence through custom typography, strategic color palettes, and iconic symbolism.",
    tags: ["Logo Design", "Monogram", "Luxury Branding", "Healthcare"],
    images: [
      "/portfolio/logo-shahrokh.jpg",
      "/portfolio/logo-ara.jpg",
      "/portfolio/logo-heydari.jpg",
    ],
    color: "from-amber-950/20 to-zinc-900",
    featured: false,
  },
  {
    id: 4,
    title: "Poster Design — Luxury Perfume & Specialty Coffee",
    category: "Product Poster & Advertising Design",
    description:
      "Striking product poster designs for diverse brands. A luxury fragrance campaign for MY Perfume featuring dramatic 3D renders with black and gold aesthetics, and a minimalist lifestyle poster for Ben Mano Specialty Coffee highlighting their Ethiopian Yirgacheffe single-origin coffee with warm, earthy tones.",
    tags: ["Poster Design", "Product Photography", "Advertising", "Luxury Branding"],
    images: [
      "/portfolio/poster-my-perfume.jpg",
      "/portfolio/poster-ben-mano-coffee.jpg",
    ],
    color: "from-amber-950/20 to-zinc-900",
    featured: false,
  },
  {
    id: 5,
    title: "Book Cover & Cinematic Visual Design",
    category: "Cover Design & Visual Composition",
    description:
      "Premium book cover and cinematic visual designs crafted for authors and corporate brands. Includes a thriller novel cover (The Secret), an inspirational business book (Success Is Created Twice), and high-end corporate visual compositions for financial and executive branding.",
    tags: ["Book Cover", "Cinematic Design", "Visual Composition", "Publishing"],
    images: [
      "/portfolio/cover-the-secret.jpg",
      "/portfolio/cover-success-book.jpg",
      "/portfolio/cover-dark-premium.jpg",
      "/portfolio/cover-meridian-capital.jpg",
    ],
    color: "from-stone-800 to-zinc-900",
    featured: false,
  },
  {
    id: 6,
    title: "NASIM — Luxury Cosmetics Brand Photography",
    category: "Product Photography & Visual Merchandising",
    description:
      "Premium product photography and visual merchandising for NASIM luxury cosmetics brand. Elegant product staging with soft blush pink, gold, and marble aesthetics showcasing perfume, skincare, and makeup collections in an opulent boutique setting.",
    tags: ["Product Photography", "Luxury Branding", "Cosmetics", "Visual Merchandising"],
    images: [
      "/portfolio/nasim-cosmetics-1.jpg",
    ],
    color: "from-pink-950/20 to-zinc-900",
    featured: false,
  },
  {
    id: 7,
    title: "Food Packaging Design — Kamrooz & Jolgeh",
    category: "Product Packaging & Label Design",
    description:
      "Professional packaging design for food industry brands. A vibrant, appetite-appealing canned tomato paste label for Kamrooz Food Products featuring fresh tomato photography and rustic farm aesthetics, and an industrial bulk packaging design for Jolgeh skimmed milk powder with clear information hierarchy and logistics-optimized layout.",
    tags: ["Packaging Design", "Label Design", "Food Industry", "Print Design"],
    images: [
      "/portfolio/pkg-kamrooz-tomato.jpg",
      "/portfolio/pkg-jolgeh-milk.jpg",
    ],
    color: "from-red-950/20 to-zinc-900",
    featured: false,
  },
  {
    id: 8,
    title: "NOIRÉ Café — Cinematic Brand Reel",
    category: "Motion Design & Brand Film",
    description:
      "A cinematic Instagram Reel crafted for NOIRÉ Café — a dark-luxury coffee brand. The reel seamlessly blends environmental branding, product visualization, and lifestyle cinematography to tell an immersive brand story. From the moody storefront with custom vinyl lettering, through dramatic close-ups of espresso extraction and coffee beans, to a warm lifestyle scene and the final title card — every frame is designed to evoke sophistication and exclusivity.",
    tags: ["Motion Design", "Brand Film", "Cinematography", "Social Media"],
    images: [
      "/portfolio/noire-cafe-reel-1.jpg",
      "/portfolio/noire-cafe-reel-2.jpg",
      "/portfolio/noire-cafe-reel-3.jpg",
      "/portfolio/noire-cafe-reel-4.jpg",
      "/portfolio/noire-cafe-reel-5.jpg",
    ],
    color: "from-amber-950/20 to-zinc-900",
    featured: false,
  },
  {
    id: 9,
    title: "AUREUM — Luxury Brand Website Design",
    category: "Web Design & UI/UX",
    description:
      "A premium e-commerce landing page designed for AUREUM, a fictional Swiss luxury watch brand. The design features a dark theme with gold accents, elegant serif typography, minimalist product cards with hover effects, and a refined visual hierarchy that communicates exclusivity and craftsmanship. Every detail — from the spacing to the subtle gold borders — is crafted to match the standards of high-end luxury brands.",
    tags: ["Web Design", "UI/UX", "Luxury Branding", "E-Commerce"],
    images: [
      "/portfolio/aureum-web-1.jpg",
      "/portfolio/aureum-web-2.jpg",
      "/portfolio/aureum-web-3.jpg",
    ],
    color: "from-yellow-950/20 to-zinc-900",
    featured: false,
  },
];

const services = [
  {
    icon: Film,
    title: "Graphic Design",
    description:
      "Stunning visual designs — from logos and brand identities to packaging, posters, and print collateral that make your brand unforgettable.",
  },
  {
    icon: Palette,
    title: "Visual Identity",
    description:
      "Complete brand identity systems including logo design, color palettes, typography, and comprehensive brand guidelines.",
  },
  {
    icon: Monitor,
    title: "Video Editing",
    description:
      "Professional video editing with seamless transitions, color grading, and visual effects for maximum impact.",
  },
  {
    icon: Sparkles,
    title: "Creative Direction",
    description:
      "Strategic creative vision that aligns your visual content with your business goals and target audience.",
  },
];

const testimonials = [
  {
    name: "Client Project",
    company: "OSA Thermo System",
    text: "Delivered a complete visual identity that elevated our brand presence across international markets.",
  },
  {
    name: "Brand Collaboration",
    company: "F&B Industry",
    text: "Creative graphic designs that significantly increased our social media engagement and brand recognition.",
  },
];

/* ──────────────── Components ──────────────── */

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/40"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-lg font-bold tracking-tight">
          YF<span className="text-amber-400">.</span>design
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#work" className="hover:text-foreground transition-colors">
            Work
          </a>
          <a href="#services" className="hover:text-foreground transition-colors">
            Services
          </a>
          <a href="#about" className="hover:text-foreground transition-colors">
            About
          </a>
          <a
            href="#contact"
            className="bg-foreground text-background px-4 py-2 rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            Let&apos;s Talk
          </a>
        </div>
        <a
          href="#contact"
          className="md:hidden bg-foreground text-background px-4 py-2 rounded-full text-sm font-medium"
        >
          Contact
        </a>
      </div>
    </motion.nav>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity, y }}
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16 relative overflow-hidden"
    >
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-zinc-500/5 rounded-full blur-3xl" />

      <motion.div
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-3xl"
      >
        <motion.div custom={0} variants={fadeUp} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/60 text-xs text-muted-foreground tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Available for Remote Work
          </span>
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          Yousef Farihi
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-4 font-light"
        >
          Graphic Designer & Visual Editor
        </motion.p>

        <motion.p
          custom={3}
          variants={fadeUp}
          className="text-base text-muted-foreground/70 mb-10 max-w-xl mx-auto leading-relaxed"
        >
          Crafting creative brand identities through graphic design, visual
          editing, and strategic branding that drives business growth.
        </motion.p>

        <motion.div
          custom={4}
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2 bg-foreground text-background px-8 py-3.5 rounded-full font-medium hover:bg-foreground/90 transition-all"
          >
            View My Work
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-border/60 px-8 py-3.5 rounded-full font-medium hover:bg-accent transition-all"
          >
            Get in Touch
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10"
      >
        <ChevronDown className="w-5 h-5 text-muted-foreground/50 animate-bounce" />
      </motion.div>
    </motion.section>
  );
}

/* ──── Image Lightbox ──── */
function ImageLightbox({
  images,
  initialIndex,
  onClose,
}: {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(initialIndex);

  const goNext = useCallback(() => {
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);
  const goPrev = useCallback(() => {
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }, [images.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
        aria-label="Close"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-2 sm:left-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-2 sm:right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </>
      )}

      <div className="relative max-w-5xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="relative aspect-[16/10] rounded-xl overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[current]}
              alt={`Portfolio image ${current + 1}`}
              className="w-full h-full object-contain"
            />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-4">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? "bg-amber-400 w-6" : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ──── Project Card ──── */
function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: (typeof projects)[number];
  index: number;
  onOpen: (i: number) => void;
}) {
  const hasImages = project.images && project.images.length > 0;

  return (
    <motion.article
      custom={index}
      variants={fadeUp}
      className={`group relative rounded-2xl overflow-hidden border transition-all duration-500 ${
        project.featured
          ? "bg-gradient-to-br from-amber-400/5 to-zinc-900 border-amber-400/20 hover:border-amber-400/40"
          : `bg-gradient-to-br ${project.color} border-border/30 hover:border-border/60`
      }`}
    >
      <div className="p-6 sm:p-8 md:p-10 flex flex-col md:flex-row gap-6 md:gap-10 items-start">
        {/* Thumbnail area */}
        <div
          className={`w-full md:w-64 lg:w-80 aspect-[16/10] rounded-xl overflow-hidden flex-shrink-0 relative border border-white/10 cursor-pointer ${
            hasImages ? "" : "bg-white/5"
          }`}
          onClick={() => hasImages && onOpen(0)}
        >
          {hasImages ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {project.images.length > 1 && (
                <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-black/70 text-xs text-white backdrop-blur-sm">
                  {project.images.length} images
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                  View Gallery
                </span>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-transparent" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <p className="text-amber-400/80 text-xs font-medium tracking-wider uppercase">
              {project.category}
            </p>
            {project.featured && (
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-400/10 text-amber-400 border border-amber-400/20">
                Featured
              </span>
            )}
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold mb-3 group-hover:text-amber-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function WorkSection() {
  const [lightbox, setLightbox] = useState<{ projectId: number; index: number } | null>(null);

  const activeProject = lightbox
    ? projects.find((p) => p.id === lightbox.projectId)
    : null;

  return (
    <section id="work" className="py-24 sm:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <motion.p
            custom={0}
            variants={fadeUp}
            className="text-amber-400 text-sm font-medium tracking-wider uppercase mb-3"
          >
            Selected Work
          </motion.p>
          <motion.h2
            custom={1}
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
          >
            Projects that speak
            <br className="hidden sm:block" /> for themselves.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6"
        >
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={(imgIndex) =>
                setLightbox({ projectId: project.id, index: imgIndex })
              }
            />
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && activeProject && activeProject.images.length > 0 && (
          <ImageLightbox
            images={activeProject.images}
            initialIndex={lightbox.index}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="py-24 sm:py-32 px-6 border-t border-border/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <motion.p
            custom={0}
            variants={fadeUp}
            className="text-amber-400 text-sm font-medium tracking-wider uppercase mb-3"
          >
            What I Do
          </motion.p>
          <motion.h2
            custom={1}
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
          >
            Services tailored
            <br className="hidden sm:block" /> to your brand.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 gap-6"
        >
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              variants={fadeUp}
              className="group p-6 sm:p-8 rounded-2xl border border-border/30 hover:border-amber-400/30 bg-card/50 hover:bg-card transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 flex items-center justify-center mb-5 group-hover:bg-amber-400/20 transition-colors">
                <service.icon className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32 px-6 border-t border-border/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.p
              custom={0}
              variants={fadeUp}
              className="text-amber-400 text-sm font-medium tracking-wider uppercase mb-3"
            >
              About Me
            </motion.p>
            <motion.h2
              custom={1}
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-bold tracking-tight mb-6"
            >
              Turning ideas into
              <br /> visual experiences.
            </motion.h2>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="text-muted-foreground leading-relaxed mb-6"
            >
              I&apos;m Yousef Farihi, a graphic designer and visual editor
              specializing in brand identity and creative visual storytelling.
              I help businesses stand out through compelling graphic design,
              professional video editing, and cohesive visual branding.
            </motion.p>
            <motion.p
              custom={3}
              variants={fadeUp}
              className="text-muted-foreground leading-relaxed"
            >
              With a keen eye for detail and a passion for visual excellence, I
              work with brands worldwide to create visual content that not only
              looks stunning but drives real business results.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-4"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                className="p-6 rounded-2xl border border-border/30 bg-card/50"
              >
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-medium">{t.name}</span>
                  <span className="text-xs text-muted-foreground">
                    — {t.company}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>
              </motion.div>
            ))}

            {/* Stats */}
            <motion.div
              custom={2}
              variants={fadeUp}
              className="grid grid-cols-3 gap-4"
            >
              {[
                { value: "50+", label: "Projects" },
                { value: "30+", label: "Clients" },
                { value: "100%", label: "Remote" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 rounded-xl bg-amber-400/5 border border-amber-400/10"
                >
                  <p className="text-2xl font-bold text-amber-400">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-24 sm:py-32 px-6 border-t border-border/30">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p
            custom={0}
            variants={fadeUp}
            className="text-amber-400 text-sm font-medium tracking-wider uppercase mb-3"
          >
            Get in Touch
          </motion.p>
          <motion.h2
            custom={1}
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Let&apos;s create something
            <br /> remarkable together.
          </motion.h2>
          <motion.p
            custom={2}
            variants={fadeUp}
            className="text-muted-foreground leading-relaxed mb-10 max-w-lg mx-auto"
          >
            Have a project in mind? I&apos;d love to hear about it. Send me a
            message and let&apos;s discuss how I can help elevate your brand.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <a
              href="mailto:yousef.farihi8833@gmail.com"
              className="group inline-flex items-center gap-2 bg-foreground text-background px-8 py-3.5 rounded-full font-medium hover:bg-foreground/90 transition-all"
            >
              <Mail className="w-4 h-4" />
              Send an Email
            </a>
            <a
              href="https://wa.me/989165732218"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border/60 px-8 py-3.5 rounded-full font-medium hover:bg-accent transition-all"
            >
              <Send className="w-4 h-4" />
              WhatsApp
            </a>
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeUp}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex items-center justify-center gap-6">
              <a
                href="https://instagram.com/youseffarihi.design"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
              <a
                href="https://wa.me/989165732218"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                +98 916 573 2218
              </a>
              <span className="hidden sm:inline text-border">|</span>
              <a
                href="mailto:yousef.farihi8833@gmail.com"
                className="hover:text-foreground transition-colors"
              >
                yousef.farihi8833@gmail.com
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/30 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Yousef Farihi. All rights reserved.</p>
        <p>
          Designed with passion. Built to impress.
        </p>
      </div>
    </footer>
  );
}

/* ──────────────── Page ──────────────── */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <WorkSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
