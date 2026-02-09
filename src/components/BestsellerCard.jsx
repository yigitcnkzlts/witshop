import { motion } from "framer-motion";

export default function BestsellerCard({ image }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group flex w-full flex-col bg-white overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F1F1F1]">
        <img
          src={image}
          alt="product"
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />
      
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/5" />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center gap-2 px-4 py-8 text-center">
        <h5 className="text-base font-black uppercase tracking-tight text-[#252B42] md:text-lg">
          Graphic Design
        </h5>

        <p className="text-[13px] font-bold tracking-wider text-[#737373] opacity-80 uppercase">
          English Department
        </p>

        {/* Prices */}
        <div className="mt-2 flex items-center justify-center gap-3 font-black">
          <span className="text-sm text-[#BDBDBD] line-through decoration-red-400/40">
            $16.48
          </span>
          <span className="text-lg text-[#23856D]">
            $6.48
          </span>
        </div>

        {/* Colors: Daha şık ve etkileşimli */}
        <div className="mt-4 flex gap-2">
          {[ "#23A6F0", "#23856D", "#E77C40", "#252B42" ].map((color, i) => (
            <motion.span 
              key={i}
              whileHover={{ scale: 1.25 }}
              className="h-4 w-4 rounded-full border border-white ring-1 ring-gray-200 cursor-pointer shadow-sm transition-shadow hover:shadow-md" 
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}