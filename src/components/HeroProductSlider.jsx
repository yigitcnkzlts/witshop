import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // Animasyonlar için

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules"; // EffectFade eklendi
import "swiper/css";
import "swiper/css/effect-fade";

import slide1 from "../assets/hero/hero-product.png";
import slide2 from "../assets/hero/hero-product-2.png";

const slides = [
  {
    season: "SUMMER 2026",
    title: "Vita Classic Product",
    desc: "We know how large objects will act, We know how are objects will act, We know.",
    price: "$16.48",
    image: slide1,
  },
  {
    season: "WINTER 2026",
    title: "Vita Classic Product",
    desc: "We know how large objects will act, We know how are objects will act, We know.",
    price: "$18.48",
    image: slide2,
  },
];

export default function HeroProductSlider() {
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef(null);
  const rafRef = useRef(null);
  const startRef = useRef(0);

  const duration = 5000; // Biraz daha sakin bir geçiş için 5sn

  const nextSlide = () => swiperRef.current?.slideNext();
  const prevSlide = () => swiperRef.current?.slidePrev();

  const startProgress = () => {
    setProgress(0);
    startRef.current = performance.now();
    const animate = (now) => {
      const elapsed = now - startRef.current;
      const percent = Math.min(100, (elapsed / duration) * 100);
      setProgress(percent);
      if (elapsed < duration) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    startProgress();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#23856D] py-10 md:py-0">
      {/* Zarif Navigasyon Butonları */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-8 top-1/2 z-20 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/5 p-4 text-white backdrop-blur-md transition-all hover:bg-white hover:text-[#23856D] active:scale-90"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-8 top-1/2 z-20 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/5 p-4 text-white backdrop-blur-md transition-all hover:bg-white hover:text-[#23856D] active:scale-90"
      >
        <ChevronRight size={24} />
      </button>

      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        effect={"fade"}
        modules={[Autoplay, EffectFade]}
        autoplay={{
          delay: duration,
          disableOnInteraction: false,
        }}
        loop={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={() => {
          if (rafRef.current) cancelAnimationFrame(rafRef.current);
          startProgress();
        }}
        className="w-full"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <div className="mx-auto flex min-h-[600px] w-full max-w-[1200px] flex-col items-center gap-12 px-8 py-12 md:flex-row md:justify-between md:py-24">
              
              {/* Sol İçerik Animasyonu */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex max-w-[550px] flex-col items-center text-center md:items-start md:text-left text-white"
              >
                <span className="text-xs font-black tracking-[0.4em] text-white/70 uppercase">
                  {s.season}
                </span>

                <h2 className="mt-4 text-5xl font-black leading-[1.1] md:text-7xl tracking-tighter">
                  Vita Classic <br /> Product
                </h2>

                <p className="mt-6 text-sm font-medium leading-relaxed text-white/80 md:text-lg md:max-w-[400px]">
                  {s.desc}
                </p>

                <div className="mt-10 flex flex-wrap items-center justify-center md:justify-start gap-8">
                  <span className="text-3xl font-black tracking-tight">{s.price}</span>

                  <button className="group relative flex items-center gap-3 overflow-hidden rounded-lg bg-[#2DC071] px-10 py-4 text-sm font-black tracking-widest text-white shadow-2xl transition-all hover:bg-[#28a863] active:scale-95">
                    <ShoppingCart size={18} className="transition-transform group-hover:-translate-y-1" />
                    ADD TO CART
                  </button>
                </div>
              </motion.div>

              {/* Sağ Görsel Alanı - Floating Efekti */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative flex w-full max-w-[450px] justify-center md:justify-end"
              >
                {/* Arkadaki Dekoratif Daire */}
                <div className="absolute top-1/2 left-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
                
                <img
                  src={s.image}
                  alt="Hero Product"
                  className="
                    w-[70%] drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)]
                    md:w-[95%] transition-transform duration-700 hover:scale-105
                  "
                />
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modernleştirilmiş Progress Bar */}
      <div className="absolute bottom-12 left-1/2 z-20 w-[180px] -translate-x-1/2 md:left-24 md:translate-x-0">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-black text-white/50">01</span>
          <div className="relative h-[4px] w-full overflow-hidden rounded-full bg-white/20">
            <motion.div 
              className="absolute left-0 top-0 h-full bg-white" 
              style={{ width: `${progress}%` }} 
            />
          </div>
          <span className="text-[10px] font-black text-white/50">02</span>
        </div>
      </div>
    </section>
  );
}