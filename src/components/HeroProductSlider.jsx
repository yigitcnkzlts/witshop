import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import slide1 from "../assets/hero/hero-product.png";
import slide2 from "../assets/hero/hero-product.png";

const slides = [
  {
    season: "SUMMER 2020",
    title: "Vita Classic Product",
    desc:
      "We know how large objects will act, We know how are objects will act, We know.",
    price: "$16.48",
    image: slide1,
  },
  {
    season: "WINTER 2020",
    title: "Vita Classic Product",
    desc:
      "We know how large objects will act, We know how are objects will act, We know.",
    price: "$18.48",
    image: slide2,
  },
];

export default function HeroProductSlider() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  const rafRef = useRef(null);
  const startRef = useRef(0);
  const duration = 4000;

  const nextSlide = () => setActive((p) => (p + 1) % slides.length);
  const prevSlide = () => setActive((p) => (p === 0 ? slides.length - 1 : p - 1));

  useEffect(() => {
    setProgress(0);
    startRef.current = performance.now();

    const animate = (now) => {
      const elapsed = now - startRef.current;
      const percent = Math.min(100, (elapsed / duration) * 100);
      setProgress(percent);

      if (elapsed >= duration) {
        nextSlide();
        return;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active]);

  return (
    <section className="relative w-full overflow-hidden bg-[#23856D]">
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-5 top-1/2 z-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 p-3 text-white hover:bg-white/40"
        aria-label="Previous"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-5 top-1/2 z-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 p-3 text-white hover:bg-white/40"
        aria-label="Next"
      >
        <ChevronRight size={28} />
      </button>
      <div className="mx-auto flex min-h-[520px] w-full max-w-[1200px] flex-col items-center gap-10 px-6 py-16 md:flex-row md:justify-between md:py-20">
        {/* Sol içerik */}
        <div className="flex max-w-[520px] flex-col gap-6 text-white">
          <p className="text-sm font-bold tracking-[0.2em]">{slides[active].season}</p>

          <h2 className="text-4xl font-bold leading-tight md:text-6xl">
            Vita Classic <br /> Product
          </h2>

          <p className="text-sm text-white/90 md:text-base">{slides[active].desc}</p>

          <div className="flex items-center gap-6">
            <span className="text-2xl font-bold">{slides[active].price}</span>

            <button className="rounded-md bg-[#2DC071] px-8 py-3 text-sm font-bold text-white">
              ADD TO CART
            </button>
          </div>
        </div>
        <div className="relative flex w-full max-w-[420px] justify-center">
          <img
            src={slides[active].image}
            alt="Hero Product"
            className="
              w-[65%] translate-y-10 object-contain
              md:w-[85%] md:translate-y-20
            "
          />
        </div>
      </div>

      {/* Ortadaki çizgi */}
      <div className="absolute bottom-8 left-1/2 w-[140px] -translate-x-1/2">
        <div className="h-[6px] w-full bg-white/35">
          <div className="h-full bg-white" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </section>
  );
}