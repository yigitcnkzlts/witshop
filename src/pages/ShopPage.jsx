import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Görsel Importları (Dosya yollarının doğruluğundan emin ol)
import category1 from "../assets/shop/category-1.jpg";
import category2 from "../assets/shop/category-2.jpg";
import category3 from "../assets/shop/category-3.jpg";
import category4 from "../assets/shop/category-4.jpg";
import category5 from "../assets/shop/category-5.jpg";

import ShopGridCard from "../components/ShopGridCard";
import Pagination from "../components/Pagination";
import { fetchCategories, fetchProducts } from "../store/actions";

const defaultCategories = [
  { id: 1, title: "CLOTHS", items: 5, image: category1 },
  { id: 2, title: "CLOTHS", items: 5, image: category2 },
  { id: 3, title: "CLOTHS", items: 5, image: category3 },
  { id: 4, title: "CLOTHS", items: 5, image: category4 },
  { id: 5, title: "CLOTHS", items: 5, image: category5 },
];

function CategoryCard({ title, items, image, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="group relative block h-[280px] w-full cursor-pointer overflow-hidden rounded-lg shadow-sm transition-all duration-500 hover:shadow-xl md:h-[223px]"
    >
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      {/* Premium Gradyan: Yazının okunurluğunu artırır */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
        <span className="mb-1 text-[10px] font-black uppercase tracking-[3px] text-blue-400">
          {items} Items
        </span>
        <h3 className="text-xl font-black tracking-widest transition-transform duration-500 group-hover:scale-110">
          {title}
        </h3>
        {/* Hoverda uzayan şık çizgi */}
        <div className="mt-2 h-[2px] w-0 bg-white transition-all duration-500 group-hover:w-12" />
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-[#23A6F0]"></div>
    </div>
  );
}

export default function ShopPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const { categories, productList, total, fetchState } = useSelector(state => state.product);
  
  // Local state for filters
  const [sortValue, setSortValue] = useState("");
  const [filterText, setFilterText] = useState("");
  
  // Get category ID from URL params
  const categoryId = params.categoryId ? parseInt(params.categoryId) : null;
  
  useEffect(() => {
    // Fetch categories when component mounts
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    // Fetch products when component mounts or params change
    const queryParams = {};
    
    if (categoryId) {
      queryParams.category = categoryId;
    }
    
    if (sortValue) {
      queryParams.sort = sortValue;
    }
    
    if (filterText) {
      queryParams.filter = filterText;
    }
    
    dispatch(fetchProducts(queryParams));
  }, [dispatch, categoryId, sortValue, filterText]);

  const handleCategoryClick = (category) => {
    // Navigate to category URL
    const gender = category.gender === 'k' ? 'kadin' : 'erkek';
    const categoryName = category.title?.toLowerCase().replace(/\s+/g, '-') || 'kategori';
    history.push(`/shop/${gender}/${categoryName}/${category.id}`);
  };

  const handleSortChange = (e) => {
    setSortValue(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const handleFilterSubmit = () => {
    // Filter will be applied automatically via useEffect
    // This is just for UI feedback
  };

  // Use API categories if available, otherwise use default ones
  const displayCategories = categories.length > 0 
    ? categories.slice(0, 5).map((cat, index) => ({
        ...cat,
        image: defaultCategories[index]?.image || category1
      }))
    : defaultCategories;

  return (
    <div className="w-full bg-white antialiased">
      {/* TITLE + BREADCRUMB */}
      <section className="bg-gray-50/50">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-6 py-12 md:flex-row md:justify-between">
          <h1 className="text-3xl font-black tracking-tight text-[#252B42]">Shop</h1>
          <nav className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider">
            <Link to="/" className="text-[#252B42] transition-colors hover:text-[#23A6F0]">Home</Link>
            <span className="text-gray-300 font-normal">/</span>
            <span className="text-[#BDBDBD]">Shop</span>
          </nav>
        </div>

        {/* CATEGORY GRID */}
        <div className="mx-auto max-w-6xl px-6 pb-16">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {displayCategories.map((c, index) => (
              <CategoryCard 
                key={c.id || index} 
                title={c.title || c.name}
                items={c.items || c.rating || 5}
                image={c.image}
                onClick={() => handleCategoryClick(c)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS / FILTER BAR */}
      <section className="sticky top-0 z-20 border-y border-gray-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-5 md:flex-row md:justify-between">
          <p className="text-sm font-bold text-gray-500">
            Showing <span className="text-black">{productList.length}</span> of <span className="text-black">{total}</span> results
          </p>

          <div className="flex items-center gap-4">
            <span className="hidden text-xs font-black uppercase tracking-widest text-gray-400 md:block">Views</span>
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button className="flex h-9 w-9 items-center justify-center rounded-md bg-white shadow-sm transition-all hover:scale-105 active:scale-95">▦</button>
              <button className="flex h-9 w-9 items-center justify-center rounded-md text-gray-400 transition-all hover:text-black">≡</button>
            </div>
          </div>

          <div className="flex w-full items-center gap-3 sm:w-auto">
            <input
              type="text"
              placeholder="Filter products..."
              value={filterText}
              onChange={handleFilterChange}
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/10 sm:w-[200px]"
            />
            <select 
              className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-6 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/10 sm:w-[180px]"
              value={sortValue}
              onChange={handleSortChange}
            >
              <option value="">Sort by</option>
              <option value="price:asc">Price: Low-High</option>
              <option value="price:desc">Price: High-Low</option>
              <option value="rating:asc">Rating: Low-High</option>
              <option value="rating:desc">Rating: High-Low</option>
            </select>
            <button 
              className="h-12 flex-1 rounded-xl bg-[#23A6F0] px-10 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-blue-500/20 transition-all hover:brightness-110 active:scale-95 sm:flex-none"
              onClick={handleFilterSubmit}
            >
              Filter
            </button>
          </div>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          {fetchState === "FETCHING" ? (
            <LoadingSpinner />
          ) : fetchState === "FAILED" ? (
            <div className="text-center py-20">
              <p className="text-red-600">Failed to load products. Please try again.</p>
              <button 
                onClick={() => dispatch(fetchProducts())}
                className="mt-4 rounded-xl bg-[#23A6F0] px-6 py-2 text-white hover:bg-blue-600"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-8 gap-y-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {productList.map((p) => (
                <ShopGridCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* PAGINATION */}
      <section className="pb-24">
        <Pagination />
      </section>

      {/* BRANDS STRIP */}
      <section className="bg-gray-50/30 py-20 border-t border-gray-100">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 items-center justify-items-center gap-12 opacity-30 grayscale transition-all duration-700 hover:opacity-100 hover:grayscale-0 md:grid-cols-3 lg:grid-cols-6">
             {["hooli", "lyft", "stripe", "aws", "reddit", "github"].map(brand => (
               <span key={brand} className="cursor-default text-3xl font-black tracking-tighter transition-transform hover:scale-110">{brand}</span>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
}