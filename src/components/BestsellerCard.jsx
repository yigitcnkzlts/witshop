export default function BestsellerCard({ image }) {
  return (
    <div className="flex w-full flex-col bg-white">
      {/* Image */}
      <div className="w-full bg-[#F1F1F1]">
        <img
          src={image}
          alt="product"
          className="h-[300px] w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center gap-3 px-4 py-6 text-center">
        <h5 className="font-bold text-[#252B42]">Graphic Design</h5>

        <p className="text-sm text-[#737373]">English Department</p>

        {/* Colors */}
        <div className="flex gap-2">
          <span className="h-4 w-4 rounded-full bg-[#23A6F0]" />
          <span className="h-4 w-4 rounded-full bg-[#23856D]" />
          <span className="h-4 w-4 rounded-full bg-[#E77C40]" />
          <span className="h-4 w-4 rounded-full bg-[#252B42]" />
        </div>

        {/* Prices */}
        <div className="flex gap-2 font-bold">
          <span className="text-[#BDBDBD]">$16.48</span>
          <span className="text-[#23856D]">$6.48</span>
        </div>
      </div>
    </div>
  );
}