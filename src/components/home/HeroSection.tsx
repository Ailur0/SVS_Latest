import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    badge: 'FOOD GRADE',
    title: 'Certified Food-Grade Containers',
    subtitle: 'Round containers from 1000ml to 20Ltr — BPA-free, odourless, and certified for direct food contact.',
    cta: 'View Food Grade Range',
    ctaLink: '/products?category=food',
    image: '/Food Grade/MRJ_10kg-round.jpg',
    accent: 'from-slate-900 via-emerald-950 to-emerald-800/70',
    imageBg: 'bg-emerald-950',
  },
  {
    badge: 'PAINT PACKAGING',
    title: 'Shelf-Ready Paint Packaging',
    subtitle: 'Paint containers from 1Ltr to 20Ltr and 1kg to 20kg — tamper-evident closures, UV resistant, built for shelf impact.',
    cta: 'View Paint Range',
    ctaLink: '/products?category=paint',
    image: '/Paint/20kg-distemper-ccd.jpg',
    accent: 'from-slate-900 via-slate-800 to-primary/80',
    imageBg: 'bg-slate-900',
  },
  {
    badge: 'LUBRICANTS',
    title: 'Leak-Resistant Lubricant Packaging',
    subtitle: 'PPCP containers from 500ml to 20L — flat lid and spout closures for engine oils and industrial lubricants.',
    cta: 'View Lubricants Range',
    ctaLink: '/products?category=lubricants',
    image: '/Lubricants/ML 20_Spout.jpg',
    accent: 'from-slate-900 via-orange-950 to-orange-900/60',
    imageBg: 'bg-orange-950',
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => advance(1), 5500);
    return () => clearInterval(timer);
  }, [current]);

  const advance = (dir: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + dir + slides.length) % slides.length);
      setAnimating(false);
    }, 200);
  };

  const slide = slides[current];

  return (
    <section className="flex flex-col">
      {/* ── Mobile layout: stacked ── */}
      <div className="lg:hidden flex flex-col">
        {/* Text panel */}
        <div className={`relative flex items-center bg-gradient-to-br ${slide.accent} transition-all duration-700`}>
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
          <div
            className={`relative z-10 px-6 pt-28 pb-10 transition-all duration-300 ${
              animating ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
            }`}
          >
            <span className="inline-block px-3 py-1.5 bg-white/10 border border-white/20 text-white rounded-full text-xs font-bold tracking-widest mb-5">
              {slide.badge}
            </span>
            <h1 className="font-heading text-3xl font-bold text-white leading-[1.15] mb-4">
              {slide.title}
            </h1>
            <p className="text-white/75 text-base leading-relaxed mb-8">
              {slide.subtitle}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/quote">
                <Button size="default" className="bg-white text-slate-900 hover:bg-white/90 font-semibold px-6">
                  Request a Quote
                </Button>
              </Link>
              <Link to={slide.ctaLink}>
                <Button size="default" variant="outline" className="border-white/50 text-white hover:bg-white/10 hover:border-white px-6">
                  {slide.cta}
                </Button>
              </Link>
            </div>
            {/* Slide dots */}
            <div className="flex gap-2 mt-8">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { if (!animating) { setAnimating(true); setTimeout(() => { setCurrent(i); setAnimating(false); }, 200); } }}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === current ? 'bg-white w-8' : 'bg-white/30 w-4'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Image panel — dedicated section, no overlap */}
        <div className={`relative ${slide.imageBg} flex items-center justify-center overflow-hidden`} style={{ height: '260px' }}>
          <div className="absolute w-64 h-64 rounded-full bg-primary/20 blur-[60px]" />
          <div
            className={`relative z-10 h-full flex items-end justify-center pb-4 transition-all duration-300 ${
              animating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.badge}
              className="h-full max-h-56 w-auto object-contain"
              style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }}
            />
          </div>
          {/* Mobile nav arrows */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button
              onClick={() => advance(-1)}
              className="p-2 rounded-full bg-white/80 shadow text-slate-700 hover:bg-white"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => advance(1)}
              className="p-2 rounded-full bg-white/80 shadow text-slate-700 hover:bg-white"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Desktop layout: side by side ── */}
      <div className="hidden lg:flex relative h-screen min-h-[600px]">
        {/* Left panel — text */}
        <div className={`relative w-[55%] h-full flex items-center bg-gradient-to-br ${slide.accent} transition-all duration-700`}>
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
          <div
            className={`relative z-10 px-14 lg:px-16 pt-24 pb-16 mt-9 transition-all duration-300 ${
              animating ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
            }`}
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 text-white rounded-full text-xs font-bold tracking-widest mb-6">
              {slide.badge}
            </span>
            <h1 className="font-heading text-5xl lg:text-[3.25rem] xl:text-6xl font-bold text-white leading-[1.1] mb-6">
              {slide.title}
            </h1>
            <p className="text-white/75 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
              {slide.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/quote">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90 font-semibold px-8 h-12 text-base">
                  Request a Quote
                </Button>
              </Link>
              <Link to={slide.ctaLink}>
                <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 hover:border-white px-8 h-12 text-base">
                  {slide.cta}
                </Button>
              </Link>
            </div>
            <div className="flex gap-2 mt-14">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { if (!animating) { setAnimating(true); setTimeout(() => { setCurrent(i); setAnimating(false); }, 200); } }}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === current ? 'bg-white w-8' : 'bg-white/30 w-4'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <button onClick={() => advance(-1)} className="absolute bottom-10 right-16 p-2.5 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-white transition-colors z-20 flex items-center justify-center" aria-label="Previous">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => advance(1)} className="absolute bottom-10 right-6 p-2.5 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-white transition-colors z-20 flex items-center justify-center" aria-label="Next">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Right panel — product image */}
        <div className="w-[45%] h-full relative bg-slate-900 flex items-center justify-center overflow-hidden">
          <div className="absolute w-[500px] h-[500px] rounded-full bg-primary/20 blur-[80px]" />
          <div className="absolute w-[300px] h-[300px] rounded-full bg-white/5 blur-2xl bottom-0 right-0" />
          <div
            className={`relative z-10 w-[68%] max-w-[320px] transition-all duration-300 ${
              animating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.badge}
              className="w-full h-auto object-contain"
              style={{ filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.6))' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
