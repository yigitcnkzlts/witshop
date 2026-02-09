import bannerImg from "../assets/banners/banner-neural.jpg";
import { motion } from "framer-motion"; // Animasyonlar için

export default function NeuralBanner() {
  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-12 px-8 py-20 md:flex-row md:gap-20 md:py-28">
        
        {/* Sol Görsel - Hafif Zoom ve Giriş Efekti */}
        <motion.div 
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 group"
        >
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={bannerImg}
              alt="Banner"
              className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Görsele derinlik katan hafif bir gölge alanı */}
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl" />
          </div>
        </motion.div>

        {/* Sağ İçerik - Metin Animasyonları */}
        <motion.div 
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="flex w-full flex-col items-center text-center md:items-start md:text-left gap-6 md:w-1/2"
        >
          <p className="text-[12px] font-black tracking-[0.4em] text-[#BDBDBD] uppercase">
            SUMMER 2026
          </p>

          <h2 className="text-4xl font-black leading-tight text-[#252B42] md:text-6xl tracking-tighter">
            Part of the Neural <br className="hidden md:block" /> Universe
          </h2>

          <p className="max-w-[420px] text-sm font-medium leading-relaxed text-[#737373] md:text-lg">
            We know how large objects will act, but things on a small scale behave quite differently.
          </p>

          <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
            <button className="rounded-lg bg-[#2DC071] px-10 py-4 text-sm font-black tracking-widest text-white shadow-xl transition-all hover:bg-[#28a863] hover:scale-105 active:scale-95 shadow-[#2dc071]/20">
              BUY NOW
            </button>

            <button className="group relative rounded-lg border-2 border-[#2DC071] px-10 py-4 text-sm font-black tracking-widest text-[#2DC071] transition-all hover:bg-[#2DC071] hover:text-white active:scale-95">
              LEARN MORE
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}