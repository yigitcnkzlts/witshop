export default function CategoryCard({ category }) {
  // Backend sadece görsel linkini verir; bu URL <img src> ile ekrana basılır.
  const imageUrl = category.img;

  return (
    <article className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={category.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="p-4">
        <h3 className="text-base font-bold text-[#252B42]">{category.title}</h3>
        <p className="mt-2 text-sm font-medium text-[#737373]">
          Rating: <span className="text-[#23A6F0]">{category.rating}</span>
        </p>
      </div>
    </article>
  );
}
