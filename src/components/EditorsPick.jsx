import { motion } from "framer-motion";
import menImg from "../assets/editors-men.png";
import womenImg from "../assets/editors-women.png";
import kidsImg from "../assets/editors-kids.png";
import accessoriesImg from "../assets/editors-accessories.png";

function Card({ img, label, position = "object-center", objectPosition }) {
  return (
    <div className="group relative h-full w-full overflow-hidden bg-[#F1F1F1] shadow-sm transition-all duration-500 hover:shadow-2xl">
      <img
        src={img}
        alt={label}
        className={`h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 ${position}`}
        style={objectPosition ? { objectPosition } : undefined}
      />
      
      {/* Overlay: Resmin üzerine gelince hafif bir kararma ekler */}
      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

      <div className="absolute bottom-6 left-6 z-10">
        <button className="bg-white px-10 py-3 text-[13px] font-black tracking-[0.1em] text-[#252B42] transition-all duration-300 group-hover:bg-[#23A6F0] group-hover:text-white group-hover:px-12">
          {label}
        </button>
      </div>
    </div>
  );
}

export default function EditorsPick() {
  return (
    <section className="w-full bg-[#FAFAFA] py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-black tracking-tighter text-[#252B42]"
        >
          EDITOR&apos;S PICK
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-3 text-sm font-medium text-[#737373]"
        >
          Problems trying to resolve the conflict between
        </motion.p>
      </div>

      <div className="mx-auto mt-16 w-full max-w-6xl px-4">
        <div className="flex flex-col gap-8 md:h-[620px] md:flex-row md:items-stretch">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:flex-[2] md:h-full"
          >
            <Card img={menImg} label="MEN" position="object-[50%_15%]" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:flex-1 md:h-full"
          >
            <Card img={womenImg} label="WOMEN" position="object-[50%_20%]" />
          </motion.div>

          <div className="flex flex-col gap-8 md:flex-1 md:h-full">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:flex-1"
            >
              <Card
                img={accessoriesImg}
                label="ACCESSORIES"
                position="object-cover"
                objectPosition="50% 0%"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:flex-1"
            >
              <Card img={kidsImg} label="KIDS" position="object-[50%_15%]" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}