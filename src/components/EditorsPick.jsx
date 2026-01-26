import menImg from "../assets/editors-men.png";
import womenImg from "../assets/editors-women.png";
import kidsImg from "../assets/editors-kids.png";
import accessoriesImg from "../assets/editors-accessories.png";

function Card({ img, label, position = "object-center" }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#F1F1F1]">
      <img
        src={img}
        alt={label}
        className={`h-full w-full object-cover ${position}`}
      />

      <div className="absolute left-6 top-6 bg-white px-6 py-3 text-sm font-bold tracking-wide">
        {label}
      </div>
    </div>
  );
}

export default function EditorsPick() {
  return (
    <section className="w-full bg-white py-14">
      {/* Title */}
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 text-center">
        <h2 className="text-2xl font-bold text-[#252B42]">EDITOR&apos;S PICK</h2>
        <p className="mt-2 text-sm text-[#737373]">
          Problems trying to resolve the conflict between
        </p>
      </div>

      {/* Grid */}
      <div className="mx-auto mt-10 w-full max-w-6xl px-4">
        
        <div className="grid gap-6 lg:grid-cols-4 lg:grid-rows-2 lg:h-[560px]">
          {/* MEN - sol büyük */}
          <div className="h-[420px] lg:h-full lg:col-span-2 lg:row-span-2">
            <Card img={menImg} label="MEN" position="object-top" />
          </div>

          {/* WOMEN - orta büyük (tam boy) */}
          <div className="h-[260px] lg:h-full lg:col-span-1 lg:row-span-2">
            <Card img={womenImg} label="WOMEN" position="object-center" />
          </div>

          {/* ACCESSORIES - sağ üst */}
          <div className="h-[240px] lg:h-full lg:col-span-1 lg:row-span-1">
            <Card img={accessoriesImg} label="ACCESSORIES" position="object-top" />
          </div>

          {/* KIDS - sağ alt */}
          <div className="h-[240px] lg:h-full lg:col-span-1 lg:row-span-1">
            <Card img={kidsImg} label="KIDS" position="object-top" />
          </div>
        </div>
      </div>
    </section>
  );
}