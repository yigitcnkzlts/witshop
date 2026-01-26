import post1 from "../assets/posts/post-1.jpg";
import post2 from "../assets/posts/post-2.jpg";
import post3 from "../assets/posts/post-3.jpg";

import { FaChartLine } from "react-icons/fa";
import { FiClock } from "react-icons/fi";

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
    <section className="mx-auto w-full max-w-[1200px] px-4 py-20">
      {/* Başlık */}
      <div className="mb-14 text-center">
        <p className="text-sm font-semibold text-[#23A6F0]">Practice Advice</p>
        <h2 className="text-3xl font-bold text-[#252B42]">Featured Posts</h2>
        <p className="mt-2 text-sm text-[#737373]">
          Problems trying to resolve the conflict between the two major realms of
          Classical physics: Newtonian mechanics
        </p>
      </div>

      {/* Kartlar */}
      <div className="grid gap-8 md:grid-cols-3">
        {posts.map((post, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl border bg-white"
          >
            {/* Görsel */}
            <div className="relative">
              <img
                src={post.img}
                alt={post.title}
                className="h-[300px] w-full object-cover"
              />
              <span className="absolute left-4 top-4 rounded bg-red-500 px-3 py-1 text-xs font-bold text-white">
                NEW
              </span>
            </div>

            {/* İçerik */}
            <div className="flex flex-col gap-4 p-6">
              {/* Üst etiketler */}
              <div className="flex gap-3 text-xs text-[#737373]">
                <span className="text-[#23A6F0]">Google</span>
                <span>Trending</span>
                <span>New</span>
              </div>

              {/* Başlık */}
              <h3 className="text-xl font-semibold text-[#252B42]">
                {post.title}
              </h3>

              {/* Açıklama */}
              <p className="text-sm text-[#737373]">
                We focus on ergonomics and meeting you where you work. It’s only
                a keystroke away.
              </p>

              {/* Alt bilgiler */}
              <div className="mt-4 flex items-center justify-between text-xs text-[#737373]">
                {/* Tarih + saat ikonu */}
                <div className="flex items-center gap-2 text-[#23A6F0]">
                  <FiClock size={14} />
                  <span>22 April 2021</span>
                </div>

                {/* Yorum + chart ikonu */}
                <div className="flex items-center gap-2 text-[#23856D]">
                  <FaChartLine size={14} />
                  <span>10 comments</span>
                </div>
              </div>

              {/* Link */}
              <a
                href="#"
                className="mt-4 flex items-center gap-1 text-sm font-semibold text-[#23A6F0]"
              >
                Learn More <span>→</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}