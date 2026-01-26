import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import heroWoman from "../assets/hero-woman.jpg";
import heroWoman2 from "../assets/hero-woman-2.png";

export default function Slider() {
  return (
    <div className="flex w-screen">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        modules={[Autoplay]}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {/* SLIDE 1 */}
        <SwiperSlide>
          <section className="relative flex h-screen w-screen overflow-hidden">
            <img
              src={heroWoman}
              alt="Hero Woman"
              className="h-full w-full object-cover object-[62%_50%] md:object-[78%_50%] lg:object-[85%_50%]"
            />

            <div className="absolute inset-0 bg-[#23A6F0]/25" />

            <div className="absolute inset-0 flex w-full">
              <div className="flex w-full flex-col justify-center gap-4 px-6 pt-28 md:px-16 md:pt-32">
                <span className="flex text-sm font-bold tracking-[0.2em] text-white md:text-base">
                  SUMMER 2020
                </span>

                <h1 className="flex max-w-[520px] text-4xl font-bold text-white md:text-6xl">
                  NEW COLLECTION
                </h1>

                <p className="flex max-w-[420px] text-sm font-medium text-white/90 md:text-base">
                  We know how large objects will act, but things on a small scale.
                </p>

                <button className="flex w-fit items-center justify-center rounded-md bg-[#2DC071] px-6 py-3 text-sm font-bold text-white md:text-base">
                  SHOP NOW
                </button>
              </div>
            </div>

            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-4xl font-light text-white/70 md:left-8">
              ‹
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-4xl font-light text-white/70 md:right-8">
              ›
            </div>
          </section>
        </SwiperSlide>

        {/* SLIDE 2 */}
        <SwiperSlide>
          <section className="relative flex h-screen w-screen overflow-hidden">
            <img
              src={heroWoman2}
              alt="Hero Woman 2"
              className="h-full w-full object-cover object-[62%_50%] md:object-[78%_50%] lg:object-[85%_50%]"
            />

            <div className="absolute inset-0 bg-[#23A6F0]/25" />

            <div className="absolute inset-0 flex w-full">
              <div className="flex w-full flex-col justify-center gap-4 px-6 pt-28 md:px-16 md:pt-32">
                <span className="flex text-sm font-bold tracking-[0.2em] text-white md:text-base">
                  SUMMER 2020
                </span>

                <h1 className="flex max-w-[520px] text-4xl font-bold text-white md:text-6xl">
                  NEW COLLECTION
                </h1>

                <p className="flex max-w-[420px] text-sm font-medium text-white/90 md:text-base">
                  We know how large objects will act, but things on a small scale.
                </p>

                <button className="flex w-fit items-center justify-center rounded-md bg-[#2DC071] px-6 py-3 text-sm font-bold text-white md:text-base">
                  SHOP NOW
                </button>
              </div>
            </div>

            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-4xl font-light text-white/70 md:left-8">
              ‹
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-4xl font-light text-white/70 md:right-8">
              ›
            </div>
          </section>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}