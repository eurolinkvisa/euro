import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent, RefObject } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiPhone, FiMail, FiInstagram } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { FaFacebookF } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import { PiMapPinLineDuotone } from 'react-icons/pi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { supabase } from './lib/supabaseClient';

const gradientBg =
  'bg-gradient-to-br from-white/5 via-white/3 to-white/5 backdrop-blur-md border border-white/10 shadow-glass';

const contact = {
  email: 'visaservice.eurolink@gmail.com',
  phonePrimary: '9707145321',
  phoneSecondary: '1-4521522',
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(max-width: 767px)');
    const handler = (event: MediaQueryListEvent | MediaQueryList) => setIsMobile(event.matches);
    handler(media);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  return isMobile;
};

const useAutoCarousel = (enabled: boolean, delay = 3200) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;
    const container = containerRef.current;
    if (!container || !container.children.length) return;

    const getCardWidth = () => {
      const firstChild = container.children[0] as HTMLElement | undefined;
      if (!firstChild) return 0;
      const containerStyle = window.getComputedStyle(container);
      const gap = parseFloat(containerStyle.columnGap || containerStyle.gap || '0') || 0;
      return firstChild.getBoundingClientRect().width + gap;
    };

    let cardWidth = getCardWidth();
    let index = 0;
    const max = container.children.length;

    const handleResize = () => {
      cardWidth = getCardWidth();
    };

    const intervalId = window.setInterval(() => {
      if (!cardWidth) {
        cardWidth = getCardWidth();
        if (!cardWidth) return;
      }
      index = (index + 1) % max;
      container.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
    }, delay);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.clearInterval(intervalId);
    };
  }, [enabled, delay]);

  return containerRef;
};

gsap.registerPlugin(ScrollTrigger);

const SectionHeading = ({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) => (
  <div className="mb-10 flex flex-col gap-3 text-left">
    {eyebrow && <span className="text-sm uppercase tracking-[0.3em] text-white/60">{eyebrow}</span>}
    <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl lg:text-5xl">{title}</h2>
    {subtitle && <p className="max-w-2xl text-lg text-white/60">{subtitle}</p>}
  </div>
);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

  return (
    <section ref={heroRef} className="relative overflow-hidden bg-gradient-to-b from-brand/95 via-midnight to-obsidian">
      <div className="absolute inset-0 bg-grid bg-[size:120px_120px] opacity-20" aria-hidden />
      <div className="absolute inset-0 bg-radial-glow" aria-hidden />
      <motion.div style={{ y }} className="pointer-events-none absolute left-1/2 top-10 h-64 w-64 -translate-x-1/2 rounded-full bg-gold/15 blur-3xl" />
      <div className="container relative z-10 flex min-h-[90vh] flex-col gap-10 py-10 md:py-16">
        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <img src="/eurolink-logo.svg" alt="EuroLink Visa Service logo" className="h-12 w-12 rounded-xl bg-white/90 p-1" />
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">EuroLink Visa Service</p>
              <p className="text-white font-semibold">Visa consultancy · Nepal</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-white/80">
            <a className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 hover:border-gold/60" href={`tel:+977-${contact.phonePrimary}`}>
              <FiPhone className="text-gold" /> {contact.phonePrimary}
            </a>
            <a className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 hover:border-gold/60" href={`tel:${contact.phoneSecondary}`}>
              <FiPhone className="text-gold" /> {contact.phoneSecondary}
            </a>
            <a className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 hover:border-gold/60" href={`mailto:${contact.email}`}>
              <FiMail className="text-gold" /> {contact.email}
            </a>
            <a
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 hover:border-gold/60"
              href="https://wa.me/9779707145321"
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp className="text-gold" /> WhatsApp
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-12 md:flex-row md:items-center">
          <div className="flex-1 space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-gold">
              Premium visa partners
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl lg:text-7xl">
                Visa made simple for Nepal
                <span className="block text-gradient">UK · Australia · Europe</span>
              </h1>
              <p className="max-w-2xl text-lg text-white/70 md:text-xl">
                EuroLink Visa Service crafts premium pathways for students, professionals, and travelers with precise documentation, trusted advisors, and cinematic support.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <a className="btn-primary" href="#consultation">
                Free Consultation
                <span className="text-lg">→</span>
              </a>
              <a className="btn-ghost" href={`mailto:${contact.email}`}>
                Email Us
              </a>
              <a className="btn-ghost" href={`tel:+977-${contact.phonePrimary}`}>
                Call {contact.phonePrimary}
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-white/70 sm:max-w-md sm:grid-cols-2">
              {[{ label: 'Success Rate', value: '98%' }, { label: 'Live Support', value: '24/7' }].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-2xl font-semibold text-white">{item.value}</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-white/50">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
            className={`flex-1 rounded-[32px] ${gradientBg} p-6 shadow-glass`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">Premium Advisory</p>
                <h3 className="mt-1 text-2xl font-semibold text-white">EuroLink Visa Service</h3>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Live Support
              </div>
            </div>
            <div className="mt-8 space-y-4">
              {[
                { title: 'Student Visa — UK & Australia', status: 'Priority slots', color: 'from-brand to-gold' },
                { title: 'Work Visa — Europe / Schengen', status: 'Skilled migration focus', color: 'from-emerald-400 to-teal-300' },
                { title: 'Tourist Visa — Global', status: 'Fast-track assistance', color: 'from-gold to-amber-300' },
                { title: 'Seasonal Work Visa', status: 'Agri · Hospitality · Logistics', color: 'from-amber-400 to-orange-500' },
              ].map((item) => (
                <div key={item.title} className="group flex items-start gap-3 rounded-2xl bg-white/5 p-4">
                  <div className={`mt-1 h-10 w-10 rounded-xl bg-gradient-to-br ${item.color} opacity-90`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-white">{item.title}</p>
                      <span className="text-xs text-white/60">{item.status}</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
                      <div className={`h-1.5 w-2/3 rounded-full bg-gradient-to-r ${item.color} shadow-glow transition-all group-hover:w-4/5`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-white/70">Accredited partners with universities and employers across the UK, Australia, and Europe.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Countries = () => {
  const cards = [
    {
      name: 'United Kingdom',
      copy: 'Student visa (CAS), dependents, skilled routes, and visitor visas with UKVI-ready files.',
      accent: 'from-brand to-gold',
    },
    {
      name: 'Australia',
      copy: 'Subclass 500, 485, GS statements, and COE readiness with precise documentation.',
      accent: 'from-amber-300 to-orange-500',
    },
    {
      name: 'United States',
      copy: 'F-1 with I-20 prep, SEVIS, DS-160, and interview coaching for confident approvals.',
      accent: 'from-blue-400 to-indigo-500',
    },
    {
      name: 'Canada',
      copy: 'SDS/non-SDS files, SOP polish, GIC guidance, and study permit timelines.',
      accent: 'from-red-400 to-rose-500',
    },
    {
      name: 'Italy · Malta · Cyprus',
      copy: 'Europe study with financial proof, insurance, appointments, and interview prep.',
      accent: 'from-emerald-400 to-teal-300',
    },
  ];

  const isMobile = useIsMobile();
  const countriesCarouselRef = useAutoCarousel(isMobile, 2400);

  return (
    <section id="countries" className="section bg-obsidian/60">
      <div className="container">
        <SectionHeading
          eyebrow="Destinations"
          title="Trusted pathways to the UK, Australia, and Europe"
          subtitle="Tailored counseling, documentation polish, and transparent timelines for every route."
        />
        <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, idx) => (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.4 }}
              className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 ${gradientBg} card-hover`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-10`} aria-hidden />
              <div className="relative z-10 space-y-3">
                <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/70">Premium</div>
                <h3 className="text-2xl font-semibold text-white">{card.name}</h3>
                <p className="text-white/60">{card.copy}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="md:hidden -mx-5 pb-4">
          <div
            ref={countriesCarouselRef}
            className="flex gap-4 px-5 snap-x snap-mandatory overflow-x-auto"
          >
            {cards.map((card, idx) => (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.5, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.5 }}
                className={`relative min-w-[78%] snap-center overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 ${gradientBg}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-10`} aria-hidden />
                <div className="relative z-10 space-y-3">
                  <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/70">Premium</div>
                  <h3 className="text-xl font-semibold text-white">{card.name}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{card.copy}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

type VisaType = 'Student Visa' | 'Work Visa' | 'Tourist Visa' | 'Seasonal Visa';

const Services = ({ onBook }: { onBook: (visaType: VisaType) => void }) => {
  const services = [
    {
      title: 'Student Visa',
      desc: 'Course selection, SOP drafting, CAS/COE readiness, and embassy interview simulation.',
      icon: '🎓',
      accent: 'from-royal to-aurora',
    },
    {
      title: 'Work Visa',
      desc: 'Skilled migration mapping, employer tie-ups, CV refinement, and compliance-first dossiers.',
      icon: '💼',
      accent: 'from-emerald-400 to-teal-300',
    },
    {
      title: 'Tourist Visa',
      desc: 'Purpose-driven cover letters, financial proof curation, and smooth appointment handling.',
      icon: '🌍',
      accent: 'from-amber-200 to-orange-400',
    },
    {
      title: 'Seasonal Visa',
      desc: 'Seasonal routes for agri, hospitality, logistics — compliant documentation and employer coordination.',
      icon: '🌾',
      accent: 'from-amber-400 to-emerald-400',
    },
  ];

  const isMobile = useIsMobile();
  const servicesCarouselRef = useAutoCarousel(isMobile, 2600);

  return (
    <section id="services" className="section bg-midnight/60">
      <div className="container">
        <SectionHeading
          eyebrow="Services"
          title="Student, Work, and Tourist visas crafted with precision"
          subtitle="Every file is engineered for clarity, credibility, and speed."
        />
        <div className="hidden gap-6 md:grid md:grid-cols-3">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              whileHover={{ y: -8, scale: 1.02 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.3 }}
              className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 ${gradientBg} card-hover`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-10`} aria-hidden />
              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl">{service.icon}</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-white/60">Priority</div>
                </div>
                <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                <p className="text-white/60">{service.desc}</p>
                <button onClick={() => onBook(service.title as VisaType)} className="btn-ghost mt-auto w-fit text-sm">Book a slot →</button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="md:hidden -mx-5 pb-4">
          <div
            ref={servicesCarouselRef}
            className="flex gap-4 px-5 snap-x snap-mandatory overflow-x-auto"
          >
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.55, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.4 }}
                className={`relative min-w-[78%] snap-center overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 ${gradientBg}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-10`} aria-hidden />
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-xl">{service.icon}</div>
                    <div className="text-[11px] uppercase tracking-[0.2em] text-white/60">Priority</div>
                  </div>
                  <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{service.desc}</p>
                  <button onClick={() => onBook(service.title as VisaType)} className="btn-ghost mt-auto w-fit text-xs">Book a slot →</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const WhyChoose = () => {
  const pillars = [
    { title: '98% approval guidance', desc: 'Dual-review checklists, airtight documents, and risk flags resolved before filing.' },
    { title: 'Transparent timelines', desc: 'Milestone dashboards and proactive updates across every stage.' },
    { title: 'Interview mastery', desc: 'Mock interviews, embassy-style Q&A, and body-language coaching.' },
    { title: 'Trusted partners', desc: 'Universities, employers, and embassies across UK, Australia, Europe, USA.' },
    { title: 'Financial proof clarity', desc: 'GIC, blocked accounts, IHS/SEVIS, and sponsorship evidence that passes scrutiny.' },
    { title: 'Post-approval care', desc: 'Pre-departure, housing tips, work rules, and arrival check-ins.' },
  ];

  return (
    <section className="section bg-obsidian/60">
      <div className="container grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Why EuroLink"
            title="Precision, proof, and premium follow-through"
            subtitle="A boutique, audit-ready process that keeps every document, timeline, and interview flawless."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {pillars.map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" aria-hidden />
                <div className="relative space-y-2">
                  <p className="text-base font-semibold text-white">{item.title}</p>
                  <p className="text-sm text-white/65 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.35 }}
          className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-brand/50 via-obsidian to-midnight p-6 shadow-glass"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(197,155,58,0.12),transparent_40%)]" aria-hidden />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(12,47,92,0.18),transparent_35%)]" aria-hidden />
          <div className="relative z-10 space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">Precision Stack</p>
            <h3 className="text-3xl font-semibold text-white">Your visa file, production-grade</h3>
            <ul className="space-y-3 text-white/75">
              <li>✔ Dual-review document engineering</li>
              <li>✔ Financial proof curation (GIC, blocked, sponsorship)</li>
              <li>✔ Purpose statements built for credibility</li>
              <li>✔ Weekly progress signals and escalation paths</li>
            </ul>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-white">Dedicated case lead</p>
                <p className="text-sm text-white/60">Human + tech orchestration</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-white">Live status board</p>
                <p className="text-sm text-white/60">Milestones, docs, and approvals in one place</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

type Timeline = { title: string; badge?: string; steps: string[]; notes?: string[] };
type CategoryBase = { label: string; badge: string; color: string };
type StudentCategory = CategoryBase & { subTabs: Record<'uk' | 'aus' | 'usa' | 'europe' | 'canada', Timeline> };
type SimpleCategory = CategoryBase & Timeline;

const HowItWorks = () => {
  const categories: { student: StudentCategory; work: SimpleCategory; visit: SimpleCategory; seasonal: SimpleCategory } = {
    student: {
      label: 'Student Visas',
      badge: 'UK · Australia · USA · Europe',
      color: 'from-brand to-gold',
      subTabs: {
        uk: {
          title: 'UK Student Visa',
          badge: 'CAS · UKVI',
          steps: [
            'Profile Assessment & Course Selection — academics, IELTS, finances, goals, best-fit universities.',
            'University Application — to UKVI-approved institutions for your intake.',
            'Offer Letter & CAS — deposit paid, CAS issued.',
            'Visa Application — online form, IHS, visa fee, biometrics.',
            'Visa Decision & Pre-Departure — travel, accommodation, part-time work guidance.',
          ],
          notes: ['✔ Work up to 20 hours/week', '✔ Graduate Route available'],
        },
        aus: {
          title: 'Australia Student Visa',
          badge: 'GS · COE',
          steps: [
            'Course & Institution Selection — CRICOS-registered options by profile and budget.',
            'Offer Letter & COE — acceptance, tuition deposit, COE issued.',
            'GS Requirement & Visa Filing — GS statement, financials, lodge application.',
            'Medical & Biometrics — health checks and biometrics submitted.',
            'Visa Grant & Pre-Departure — housing and travel planning.',
          ],
          notes: ['✔ Work up to 48 hours/fortnight', '✔ Strong post-study work options'],
        },
        usa: {
          title: 'USA Student Visa',
          badge: 'SEVIS · I-20',
          steps: [
            'University & Course Selection — SEVP-approved fit to academics/finances.',
            'Offer Letter & I-20 — deposit paid, I-20 received.',
            'SEVIS & Visa Application — SEVIS fee, DS-160, appointment.',
            'Visa Interview Prep — mocks and document coaching.',
            'Visa Approval & Departure — travel planning and orientation.',
          ],
          notes: ['✔ On-campus work', '✔ OPT & CPT pathways'],
        },
        europe: {
          title: 'Europe Student Visa',
          badge: 'Italy · Malta · Cyprus',
          steps: [
            'Country & Program Selection — fees, language, jobs, ROI.',
            'University Admission — public/private; English programs available.',
            'Financial Proof & Appointment — blocked account/insurance, embassy slot.',
            'Visa Application — file prep, forms, biometrics.',
            'Visa Approval & Travel — pre-departure and post-arrival guidance.',
          ],
          notes: ['✔ Low/no tuition options', '✔ Part-time work', '✔ Pathway to work permit & PR'],
        },
        canada: {
          title: 'Canada Student Visa',
          badge: 'SDS · GIC',
          steps: [
            'Program & DLI Selection — SDS/non-SDS strategy.',
            'Offer Letter & Fees — deposit and LOA readiness.',
            'GIC & Financials — GIC setup and proof of funds.',
            'Study Permit Filing — biometrics, forms, and submission.',
            'Decision & Pre-Departure — housing, travel, work rules.',
          ],
          notes: ['✔ Co-op and PGWP pathways'],
        },
      },
    },
    work: {
      label: 'Work Visas',
      badge: 'Europe Focus',
      color: 'from-emerald-400 to-teal-300',
      title: 'Europe Work Visa Process',
      steps: [
        'Eligibility Assessment & Country Selection — skills, age, language, best-fit country.',
        'Job Matching & Employer Search — verified roles in manufacturing, hospitality, construction, caregiving, logistics, agriculture.',
        'Job Offer / Employment Contract — secured for visa filing.',
        'Work Permit Approval — employer applies; we follow up for compliance.',
        'Document Preparation — passport, contract, permit, education, police, medical, insurance, financials.',
        'Visa Application & Embassy Appointment — online form, slot, fee, biometrics.',
        'Interview Prep (if required) — briefings and sample Q&A.',
        'Visa Decision — stamping and next steps.',
        'Pre-Departure Orientation — travel, accommodation, laws, salary/tax, rights.',
        'Departure & Post-Arrival Support — airport guidance, reporting, residence permit, registration.',
      ],
      notes: ['Popular: Germany, Romania, Poland, Croatia, Malta, Portugal, Hungary, Lithuania & more'],
    },
    visit: {
      label: 'Visit / Tourist',
      badge: 'Travel · Family · Business',
      color: 'from-amber-300 to-orange-500',
      title: 'Visit / Tourist Visa Process',
      steps: [
        'Free Eligibility Check — purpose, finances, travel history.',
        'Visa Type & Country Selection — tourist, family, business.',
        'Document Preparation — passport, bank, itinerary, invitation, insurance.',
        'Application & Appointment — online form, fee, VFS/embassy slot.',
        'Biometrics & Interview — fingerprints, photo, interview prep (UK/USA).',
        'Visa Decision & Pre-Departure — tracking, approval support, travel guidance.',
      ],
      notes: [],
    },
    seasonal: {
      label: 'Seasonal Work',
      badge: 'Agri · Hospitality · Food Processing',
      color: 'from-gold to-amber-400',
      title: 'Seasonal Work Visa Process',
      steps: [
        'Eligibility Check — age, experience, health, availability.',
        'Country & Job Selection — approved seasonal employers.',
        'Job Offer / Contract — legal offer secured.',
        'Document Preparation — passport, medical, police, insurance, permit papers.',
        'Visa Application & Biometrics — filing, fee, appointment, fingerprints.',
        'Visa Decision & Departure — approval, briefing, travel guidance.',
      ],
      notes: [],
    },
  } as const;

  const categoryOrder = ['student', 'work', 'visit', 'seasonal'] as const;
  const [activeCategory, setActiveCategory] = useState<(typeof categoryOrder)[number]>('student');
  const [activeStudentTab, setActiveStudentTab] = useState<'uk' | 'aus' | 'usa' | 'europe' | 'canada'>('uk');

  const stepVariants = {
    hiddenLeft: { opacity: 0, x: -60, filter: 'blur(6px)' },
    hiddenRight: { opacity: 0, x: 60, filter: 'blur(6px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
  };

  const currentCategory = categories[activeCategory];
  const isStudent = activeCategory === 'student';

  let currentTimeline: Timeline;
  if (isStudent) {
    currentTimeline = categories.student.subTabs[activeStudentTab];
  } else {
    currentTimeline = currentCategory as SimpleCategory;
  }

  const { title: timelineTitle, badge: timelineBadge, steps: timelineSteps, notes: timelineNotes } = currentTimeline;

  return (
    <section className="section bg-midnight/60">
      <div className="container">
        <SectionHeading
          eyebrow="How it works"
          title="Switchable timelines by visa type"
          subtitle="Pick the visa category, then dive into the exact steps."
        />

        <div className="mb-6 flex flex-wrap gap-3">
          {categoryOrder.map((key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`relative overflow-hidden rounded-full border border-white/10 px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-gold/70 ${
                activeCategory === key ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              <span className="relative z-10">{categories[key].label}</span>
              {activeCategory === key && <motion.span layoutId="tab-cat" className="absolute inset-0 bg-white/10" />}
            </button>
          ))}
        </div>

        {isStudent && (
          <div className="mb-6 flex flex-wrap gap-2 text-xs">
            {(['uk', 'aus', 'usa', 'europe', 'canada'] as const).map((key) => (
              <button
                key={key}
                onClick={() => setActiveStudentTab(key)}
                className={`rounded-full border border-white/10 px-3 py-1 font-semibold transition focus:outline-none focus:ring-2 focus:ring-gold/70 ${
                  activeStudentTab === key ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                {categories.student.subTabs[key].title.split(' ')[0]}
              </button>
            ))}
          </div>
        )}

        <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-gradient-to-br from-white/5 via-white/8 to-white/5 p-6 shadow-glass">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(197,155,58,0.08),transparent_35%)]" aria-hidden />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(12,47,92,0.12),transparent_28%)]" aria-hidden />
          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-white/60">{timelineBadge}</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">{timelineTitle}</h3>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-white/70">
              {timelineNotes?.map((note) => (
                <span key={note} className="rounded-full border border-white/15 px-3 py-1 bg-white/5">
                  {note}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mt-10 md:mt-12">
            <motion.div
              className="absolute left-4 top-0 bottom-0 w-[2px] origin-top bg-gradient-to-b from-gold/90 via-white/30 to-transparent md:left-1/2"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              aria-hidden
            />
            <div className="space-y-6 md:space-y-8">
              {timelineSteps.map((step, idx) => (
                <motion.div
                  key={step}
                  variants={stepVariants}
                  initial={idx % 2 === 0 ? 'hiddenRight' : 'hiddenLeft'}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.65, ease: 'easeOut' }}
                  className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 md:w-1/2 ${
                    idx % 2 === 0 ? 'md:ml-auto md:origin-left' : 'md:origin-right'
                  }`}
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/8 to-white/0 opacity-80" />
                  <div className="relative flex items-start gap-4">
                    <div className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-gold text-base font-semibold text-white shadow-glow">
                      {idx + 1}
                    </div>
                    <div className="space-y-1">
                      <p className="text-white/90 leading-relaxed">{step}</p>
                      <div className="h-px w-12 bg-gradient-to-r from-gold/80 to-transparent" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Aarav, London',
      quote: 'EuroLink rebuilt my SOP and financials — CAS approved in one shot. The mock interviews felt like the real thing.',
      tag: 'UK · Student Visa',
    },
    {
      name: 'Prerana, Sydney',
      quote: 'They handled my GTE, COE, and timelines with military precision. Felt premium and personal.',
      tag: 'Australia · Student Visa',
    },
    {
      name: 'Sanjay, Munich',
      quote: 'From job mapping to EU documentation, they kept every requirement crystal clear. Zero surprises.',
      tag: 'Europe · Work Visa',
    },
  ];

  const isMobile = useIsMobile();
  const testimonialsCarouselRef = useAutoCarousel(isMobile, 2800);

  return (
    <section className="section bg-obsidian/60">
      <div className="container">
        <SectionHeading
          eyebrow="Testimonials"
          title="Loved by students, professionals, and explorers"
          subtitle="Stories of approvals, clarity, and confidence."
        />
        <div className="hidden gap-6 md:grid md:grid-cols-3">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              viewport={{ once: true, amount: 0.4 }}
              className={`flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 ${gradientBg}`}
            >
              <p className="text-lg text-white">“{item.quote}”</p>
              <div className="mt-6 flex items-center justify-between text-sm text-white/70">
                <div>
                  <p className="font-semibold text-white">{item.name}</p>
                  <p>{item.tag}</p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/60">Verified</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="md:hidden -mx-5 pb-4">
          <div
            ref={testimonialsCarouselRef}
            className="flex gap-4 px-5 snap-x snap-mandatory overflow-x-auto"
          >
            {testimonials.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.55, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.5 }}
                className={`min-w-[78%] snap-center rounded-3xl border border-white/10 bg-white/5 p-5 ${gradientBg}`}
              >
                <p className="text-base text-white">“{item.quote}”</p>
                <div className="mt-6 flex items-center justify-between text-xs text-white/70">
                  <div>
                    <p className="font-semibold text-white">{item.name}</p>
                    <p>{item.tag}</p>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/60">Verified</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ConsultationForm = ({
  formRef,
  prefillType,
  onPrefillHandled,
}: {
  formRef?: RefObject<HTMLElement>;
  prefillType?: VisaType | null;
  onPrefillHandled?: () => void;
}) => {
  const [formState, setFormState] = useState({ name: '', phone: '', email: '', type: 'Student Visa' as VisaType });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [deviceId, setDeviceId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('eurolink_device_id');
    if (stored) {
      setDeviceId(stored);
      return;
    }
    const newId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `dev-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    localStorage.setItem('eurolink_device_id', newId);
    setDeviceId(newId);
  }, []);

  useEffect(() => {
    if (prefillType) {
      setFormState((prev) => ({ ...prev, type: prefillType }));
      onPrefillHandled?.();
    }
  }, [prefillType, onPrefillHandled]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    if (typeof window !== 'undefined') {
      const last = localStorage.getItem('eurolink_last_submission');
      if (last) {
        const elapsed = Date.now() - Number(last);
        const oneDay = 24 * 60 * 60 * 1000;
        if (elapsed < oneDay) {
          setStatus('error');
          setMessage('You can submit once per day from this device. Please try again tomorrow.');
          return;
        }
      }
    }

    if (!supabase) {
      setStatus('error');
      setMessage('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
      return;
    }

    const payload = {
      name: formState.name,
      phone: formState.phone,
      email: formState.email,
      visa_type: formState.type,
      device_id: deviceId ?? 'unknown',
      source: 'landing-form',
    };

    const { error } = await supabase.from('schedule_bookings').insert(payload);

    if (error) {
      console.error('Supabase insert error:', error.message);
      setStatus('error');
      setMessage('Could not submit right now. Please retry in a moment.');
      return;
    }

    setStatus('success');
    setMessage('Submitted! Our consultants will reach out shortly.');
    setFormState({ name: '', phone: '', email: '', type: 'Student Visa' });
    if (typeof window !== 'undefined') {
      localStorage.setItem('eurolink_last_submission', String(Date.now()));
    }
  };

  return (
  <section ref={formRef} id="consultation" className="section bg-midnight/60">
      <div className="container grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <SectionHeading
            eyebrow="Free consultation"
            title="Let’s tailor your visa path"
            subtitle="Share a few details and we’ll schedule a premium, no-pressure consultation."
          />
          <ul className="space-y-3 text-white/70">
            <li>• Dedicated case strategist</li>
            <li>• Document readiness checklist</li>
            <li>• Clear timeline and fees upfront</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://wa.me/9779707145321"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-base font-medium text-white transition hover:border-gold/60 hover:bg-white/10"
            >
              <FaWhatsapp className="text-gold" /> Contact on WhatsApp
            </a>
          </div>
        </div>
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
          className={`rounded-3xl p-6 ${gradientBg} space-y-4`}
        >
          <div>
            <label className="text-sm text-white/60" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              onChange={handleChange}
              value={formState.name}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-aurora/70 focus:bg-white/10"
              placeholder="Your full name"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm text-white/60" htmlFor="phone">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                required
                onChange={handleChange}
                value={formState.phone}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-aurora/70 focus:bg-white/10"
                placeholder="98XXXXXXXX"
              />
            </div>
            <div>
              <label className="text-sm text-white/60" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                onChange={handleChange}
                value={formState.email}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-aurora/70 focus:bg-white/10"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-white/60" htmlFor="type">
              Visa Type
            </label>
            <select
              id="type"
              name="type"
              value={formState.type}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-aurora/70 focus:bg-white/10"
            >
              <option>Student Visa</option>
              <option>Work Visa</option>
              <option>Tourist Visa</option>
              <option>Seasonal Visa</option>
            </select>
          </div>
          <button type="submit" className="btn-primary w-full justify-center">
            {status === 'loading' ? 'Submitting…' : 'Submit & Schedule →'}
          </button>
          {message && (
            <p className={`text-sm ${status === 'error' ? 'text-rose-300' : 'text-emerald-300'}`}>{message}</p>
          )}
        </motion.form>
      </div>
    </section>
  );
};

const VisitUs = () => (
  <section id="visit" className="section bg-obsidian/60">
    <div className="container grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-center">
      <div className="space-y-4">
        <SectionHeading
          eyebrow="Find us"
          title="Visit EuroLink in Kathmandu"
          subtitle="Book a slot, then drop by — we’re ready with premium guidance and coffee."
        />
        <div className="space-y-3 text-white/75">
          <p className="text-lg font-semibold text-white">Contact</p>
          <div className="flex flex-wrap gap-3 text-sm">
            <a className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 hover:border-gold/60" href={`tel:+977-${contact.phonePrimary}`}>
              <FiPhone className="text-gold" /> {contact.phonePrimary}
            </a>
            <a className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 hover:border-gold/60" href={`tel:${contact.phoneSecondary}`}>
              <FiPhone className="text-gold" /> {contact.phoneSecondary}
            </a>
            <a className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 hover:border-gold/60" href={`mailto:${contact.email}`}>
              <FiMail className="text-gold" /> {contact.email}
            </a>
          </div>
          <p className="text-sm text-white/60">Open weekdays · Priority appointments available.</p>
          <a
            href="https://maps.app.goo.gl/AZYgPcoEbMvSHXmM7"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-gold hover:text-white"
          >
            <PiMapPinLineDuotone className="text-lg" /> View on Google Maps
          </a>
        </div>
      </div>
      <div className={`overflow-hidden rounded-3xl border border-white/10 shadow-glass ${gradientBg}`}>
        <iframe
          title="EuroLink Visa Service location"
          src="https://maps.google.com/maps?q=EuroLink%20Visa%20Service&t=&z=16&ie=UTF8&iwloc=&output=embed"
          className="h-[360px] w-full"
          loading="lazy"
          allowFullScreen
        />
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-white/10 bg-obsidian/80 py-10 text-white/70">
    <div className="container grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
      <div className="flex items-center gap-3">
        <img src="/eurolink-logo.svg" alt="EuroLink logo" className="h-12 w-12 rounded-xl bg-white p-1" />
        <div>
          <p className="text-xl font-semibold text-white">EuroLink Visa Service</p>
          <p className="text-sm">Premium visa consultancy in Nepal</p>
          <div className="mt-2 flex flex-wrap gap-2 text-sm">
            <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 hover:border-gold/60 hover:text-white">
              <FiMail className="text-gold" /> {contact.email}
            </a>
            <a href={`tel:+977-${contact.phonePrimary}`} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 hover:border-gold/60 hover:text-white">
              <FiPhone className="text-gold" /> {contact.phonePrimary}
            </a>
            <a href={`tel:${contact.phoneSecondary}`} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 hover:border-gold/60 hover:text-white">
              <FiPhone className="text-gold" /> {contact.phoneSecondary}
            </a>
            <a
              href="https://wa.me/9779707145321"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 hover:border-gold/60 hover:text-white"
            >
              <FaWhatsapp className="text-gold" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4 text-sm md:justify-end">
        <a
          href="https://www.instagram.com/eurolink_visaservice"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 hover:border-gold/60 hover:text-white"
        >
          <FiInstagram className="text-gold" /> Instagram
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=61576748715927"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 hover:border-gold/60 hover:text-white"
        >
          <FaFacebookF className="text-gold" /> Facebook
        </a>
        <a
          href="https://www.tiktok.com/@eurolink.visaservice"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 hover:border-gold/60 hover:text-white"
        >
          <SiTiktok className="text-gold" /> TikTok
        </a>
        <a
          href="https://maps.app.goo.gl/AZYgPcoEbMvSHXmM7"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 hover:border-gold/60 hover:text-white"
        >
          <PiMapPinLineDuotone className="text-gold" /> Visit Us
        </a>
      </div>
    </div>
  </footer>
);

const App = () => {
  const appRef = useRef<HTMLDivElement | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const consultationRef = useRef<HTMLElement | null>(null);
  const [prefillType, setPrefillType] = useState<VisaType | null>(null);

  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true, lerp: 0.12 });
    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (!appRef.current) return;

    const sections = gsap.utils.toArray<HTMLElement>('.reveal');
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        },
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleBookSlot = (visaType: VisaType) => {
    setPrefillType(visaType);
    consultationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div ref={appRef} className="min-h-screen bg-midnight text-white">
      <Hero />
      <div className="reveal">
        <Countries />
        <Services onBook={handleBookSlot} />
        <WhyChoose />
        <HowItWorks />
        <Testimonials />
        <ConsultationForm
          formRef={consultationRef}
          prefillType={prefillType}
          onPrefillHandled={() => setPrefillType(null)}
        />
        <VisitUs />
      </div>
      <Footer />
    </div>
  );
};

export default App;
