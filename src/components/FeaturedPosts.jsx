import post1 from "../assets/posts/post-1.jpg";
import post2 from "../assets/posts/post-2.jpg";
import post3 from "../assets/posts/post-3.jpg";
import { motion } from "framer-motion";

import { FaChartLine } from "react-icons/fa";
import { FiClock, FiChevronRight } from "react-icons/fi";

export default function FeaturedPosts() {
  const posts = [
    {
      img: post1,
      title: "Loudest à la Madison #1",
    },
    {
      img: post2,
      title: "Loudest à la Madison #1",
    },
    {
      img: post3,
      title: "Loudest à la Madison #1",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 py-24">
      {/* Üst Başlık - Stratejik Boşluklar */}
      <div className="mb-20 text-center">
        <motion.p 
          initial={{ opacity: 0, tracking: "0.1em" }}
          whileInView={{ opacity: 1, tracking: "0.4em" }}
          className="text-[12px] font-black uppercase text-[#23A6F0]"
        >
          Practice Advice
        </motion.p>
        <h2 className="mt-4 text-4xl font-black tracking-tighter text-[#252B42] md:text-5xl">
          Featured Posts
        </h2>
        <p className="mx-auto mt-4 max-w-[450px] text-sm leading-relaxed text-[#737373]">
          Problems trying to resolve the conflict between the two major realms of
          Classical physics: Newtonian mechanics
        </p>
      </div>

      {/* Kartlar - Responsive Grid Yapısı */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        {posts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
          >
            {/* Görsel ve Etiket */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={post.img}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
              />
              <div className="absolute left-6 top-6">
                <span className="rounded bg-[#E74C3C] px-4 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-xl">
                  NEW
                </span>
              </div>
              {/* Overlay (Hover'da hafif kararma) */}
              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
            </div>

            {/* İçerik Alanı */}
            <div className="flex flex-1 flex-col p-8">
              {/* Kategori Etiketleri */}
              <div className="mb-4 flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-[#737373]">
                <span className="text-[#23A6F0] hover:text-[#252B42] cursor-pointer transition-colors">Google</span>
                <span className="h-1 w-1 rounded-full bg-gray-200" />
                <span className="hover:text-[#23A6F0] cursor-pointer transition-colors">Trending</span>
                <span className="h-1 w-1 rounded-full bg-gray-200" />
                <span className="hover:text-[#23A6F0] cursor-pointer transition-colors">New</span>
              </div>

              {/* Başlık - Hover'da renk değişimi */}
              <h3 className="mb-4 text-xl font-black leading-snug text-[#252B42] transition-colors group-hover:text-[#23A6F0]">
                {post.title}
              </h3>

              {/* Açıklama */}
              <p className="mb-8 text-[13px] leading-relaxed text-[#737373]">
                We focus on ergonomics and meeting you where you work. It’s only
                a keystroke away.
              </p>

              {/* İstatistikler ve Link */}
              <div className="mt-auto">
                <div className="flex items-center justify-between border-b border-gray-100 pb-6 text-[11px] font-bold text-[#737373]">
                  <div className="flex items-center gap-2">
                    <FiClock size={16} className="text-[#23A6F0]" />
                    <span>22 April 2021</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaChartLine size={16} className="text-[#23856D]" />
                    <span>10 comments</span>
                  </div>
                </div>

                {/* Learn More - Animasyonlu Alt Çizgi */}
                <a
                  href="#"
                  className="group/btn mt-6 inline-flex items-center gap-1 text-[13px] font-black text-[#737373] transition-colors hover:text-[#23A6F0]"
                >
                  <span className="relative">
                    Learn More
                    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#23A6F0] transition-all duration-300 group-hover/btn:w-full" />
                  </span>
                  <FiChevronRight size={18} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}