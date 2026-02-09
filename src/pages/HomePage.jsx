import Slider from "../components/Slider";
import EditorsPick from "../components/EditorsPick";
import HeroProductSlider from "../components/HeroProductSlider";
import BestsellerCard from "../components/BestsellerCard";
import NeuralBanner from "../components/NeuralBanner";
import FeaturedPosts from "../components/FeaturedPosts";
import Footer from "../layout/Footer";

// Ürün görselleri
import product1 from "../assets/products/product-1.jpg";
import product2 from "../assets/products/product-2.jpg";
import product3 from "../assets/products/product-3.jpg";
import product4 from "../assets/products/product-4.jpg";
import product5 from "../assets/products/product-5.jpg";
import product6 from "../assets/products/product-6.jpg";
import product7 from "../assets/products/product-7.jpg";
import product8 from "../assets/products/product-8.jpg";

const products = [
  product1, product2, product3, product4,
  product5, product6, product7, product8,
];

export default function HomePage() {
  return (
    <div className="w-full bg-white antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* 1. HERO SLIDER: Sitenin vitrini */}
      <section className="relative overflow-hidden shadow-2xl">
        <Slider />
      </section>

      {/* 2. EDITOR'S PICK: Kategorilere odaklanma */}
      <section className="bg-[#FAFAFA] py-20 md:py-32">
        <EditorsPick />
      </section>

      {/* 3. BESTSELLER PRODUCTS: Ürünlerin şovu */}
      <section className="mx-auto w-full max-w-[1250px] px-6 py-24 md:py-40">
        <header className="mb-20 flex flex-col items-center text-center">
          <span className="mb-3 text-[11px] font-black uppercase tracking-[0.5em] text-blue-500/80">
            Curated Collections
          </span>
          <h2 className="text-4xl font-black tracking-tighter text-[#252B42] md:text-5xl">
            BESTSELLER PRODUCTS
          </h2>
          <p className="mt-6 max-w-xl text-sm font-medium leading-relaxed text-[#737373] md:text-base">
            Discover the perfect balance between timeless design and modern innovation. 
            Our bestsellers are handpicked for those who value quality above all.
          </p>
          <div className="mt-8 h-[3px] w-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
        </header>

        <div className="grid grid-cols-1 gap-x-8 gap-y-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((img, index) => (
            <div 
              key={index} 
              className="transform-gpu transition-all duration-700 hover:-translate-y-4"
            >
              <BestsellerCard image={img} />
            </div>
          ))}
        </div>
      </section>

      {/* 4. PRODUCT SHOWCASE: Büyük Slider */}
      <div className="w-full overflow-hidden rounded-[2rem] md:rounded-[4rem] px-2 md:px-10">
         <section className="w-full shadow-inner overflow-hidden rounded-[2rem] md:rounded-[4rem]">
           <HeroProductSlider />
         </section>
      </div>

      {/* 5. CONTENT BANNERS: Hikaye anlatan bölümler */}
      <section className="w-full space-y-0">
        <NeuralBanner />
      </section>

      {/* 6. BLOG & POSTS: Topluluk ve İçerik */}
      <section className="bg-white py-24 md:py-40 border-t border-gray-50">
        <div className="mx-auto max-w-[1250px] px-6">
          <FeaturedPosts />
        </div>
      </section>

      {/* 7. FOOTER: Şık bir bitiş */}
      <footer className="border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
        <Footer />
      </footer>
    </div>
  );
}