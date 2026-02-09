import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

import heroWoman from "../assets/hero-woman.jpg";
import heroWoman2 from "../assets/hero-woman-2.png";

// Animasyon ayarları
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Slider() {
  return (
    <div className="flex w-full overflow-hidden">
      <Swiper
        effect={"fade"} // Geçişi çok daha lüks yapar
        spaceBetween={0}
        slidesPerView={1}
        modules={[Autoplay, EffectFade, Navigation]}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-screen w-full"
      >
        {[
          { img: heroWoman, season: "SUMMER 2026" },
          { img: heroWoman2, season: "WINTER 2026" }
        ].map((slide, index) => (
          <SwiperSlide key={index}>
            <section className="relative h-screen w-full overflow-hidden">
              {/* Görsel Katmanı */}
              <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 6 }} // Görsel yavaşça küçülerek derinlik hissi verir
                src={slide.img}
                alt="Hero"
                className="h-full w-full object-cover object-[75%_50%]"
              />

              {/* Modern Overlay: Daha şeffaf ve şık */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />

              {/* İçerik Alanı */}
              <div className="absolute inset-0 flex items-center">
                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                  className="container mx-auto flex flex-col gap-6 px-6 md:px-16"
                >
                  <motion.span 
                    variants={fadeInUp}
                    className="text-xs font-black tracking-[0.5em] text-blue-400 drop-shadow-md md:text-sm"
                  >
                    {slide.season}
                  </motion.span>

                  <motion.h1 
                    variants={fadeInUp}
                    className="max-w-[650px] text-5xl font-black leading-[1.1] text-white md:text-8xl"
                  >
                    NEW <br /> COLLECTION
                  </motion.h1>

                  <motion.p 
                    variants={fadeInUp}
                    className="max-w-[450px] text-sm font-medium leading-relaxed text-white/80 md:text-lg"
                  >
                    We know how large objects will act, but things on a small scale 
                    behave quite differently.
                  </motion.p>

                  <motion.div variants={fadeInUp}>
                    <button className="group relative flex w-fit items-center justify-center overflow-hidden rounded-full bg-[#2DC071] px-10 py-4 text-sm font-black tracking-widest text-white shadow-xl transition-all hover:shadow-2xl active:scale-95">
                      <span className="relative z-10">SHOP NOW</span>
                      <div className="absolute inset-0 -translate-x-full bg-black transition-transform duration-300 group-hover:translate-x-0" />
                    </button>
                  </motion.div>
                </motion.div>
              </div>

              {/* Özel Navigasyon Butonları */}
              <button className="swiper-button-prev-custom absolute left-8 top-1/2 z-10 hidden -translate-y-1/2 text-5xl font-extralight text-white/30 transition-all hover:text-white md:block">
                ‹
              </button>
              <button className="swiper-button-next-custom absolute right-8 top-1/2 z-10 hidden -translate-y-1/2 text-5xl font-extralight text-white/30 transition-all hover:text-white md:block">
                ›
              </button>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}