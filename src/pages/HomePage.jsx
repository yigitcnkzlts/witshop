import Slider from "../components/Slider";
import EditorsPick from "../components/EditorsPick";
import HeroProductSlider from "../components/HeroProductSlider";
import BestsellerCard from "../components/BestsellerCard";
import NeuralBanner from "../components/NeuralBanner";

import product1 from "../assets/products/product-1.jpg";
import product2 from "../assets/products/product-2.jpg";
import product3 from "../assets/products/product-3.jpg";
import product4 from "../assets/products/product-4.jpg";
import product5 from "../assets/products/product-5.jpg";
import product6 from "../assets/products/product-6.jpg";
import product7 from "../assets/products/product-7.jpg";
import product8 from "../assets/products/product-8.jpg";

const products = [
  product1,
  product2,
  product3,
  product4,
  product5,
  product6,
  product7,
  product8,
];

export default function HomePage() {
  return (
    <div className="w-full">
      {/* ÜST SLIDER */}
      <Slider />

      {/* EDITORS PICK */}
      <EditorsPick />

      {/* BESTSELLER PRODUCTS */}
      <section className="mx-auto w-full max-w-[1200px] px-4 py-16">
        <div className="mb-12 text-center">
          <p className="text-sm text-[#737373]">Featured Products</p>
          <h2 className="text-2xl font-bold text-[#252B42]">
            BESTSELLER PRODUCTS
          </h2>
          <p className="text-sm text-[#737373]">
            Problems trying to resolve the conflict between
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {products.map((img, index) => (
            <BestsellerCard key={index} image={img} />
          ))}
        </div>
      </section>

      {/* HERO PRODUCT SLIDER */}
      <HeroProductSlider />

      {/* NEURAL BANNER */}
      <NeuralBanner />
    </div>
  );
}