export default function EditorsPick() {
  return (
    <section className="flex w-full bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-14">
        {/* Title */}
        <div className="flex w-full flex-col items-center gap-2 text-center">
          <h2 className="text-2xl font-bold text-[#252B42]">EDITOR&apos;S PICK</h2>
          <p className="text-sm font-medium text-[#737373]">
            Problems trying to resolve the conflict between
          </p>
        </div>

        {/* Grid */}
        <div className="flex w-full flex-col gap-4 lg:flex-row">
          {/* MEN (big left) */}
          <div className="relative flex h-[460px] w-full overflow-hidden bg-[#F5F5F5] lg:h-[520px] lg:w-1/2">
            {/* ŞİMDİLİK PLACEHOLDER: sonra buraya kendi görselini koyacaksın */}
            <div className="h-full w-full bg-[linear-gradient(135deg,#e5e7eb,#f3f4f6)]" />

            <span className="absolute bottom-6 left-6 bg-white px-8 py-3 text-sm font-bold text-[#252B42]">
              MEN
            </span>
          </div>

          {/* Right side */}
          <div className="flex w-full flex-col gap-4 lg:w-1/2">
            {/* WOMEN (big top right) */}
            <div className="relative flex h-[460px] w-full overflow-hidden bg-[#F5F5F5] lg:h-[520px]">
              <div className="h-full w-full bg-[linear-gradient(135deg,#e5e7eb,#f3f4f6)]" />

              <span className="absolute bottom-6 left-6 bg-white px-8 py-3 text-sm font-bold text-[#252B42]">
                WOMEN
              </span>
            </div>

            {/* Bottom two */}
            <div className="flex w-full flex-col gap-4 md:flex-row">
              {/* ACCESSORIES */}
              <div className="relative flex h-[220px] w-full overflow-hidden bg-[#F5F5F5] md:w-1/2">
                <div className="h-full w-full bg-[linear-gradient(135deg,#e5e7eb,#f3f4f6)]" />

                <span className="absolute bottom-6 left-6 bg-white px-6 py-3 text-sm font-bold text-[#252B42]">
                  ACCESSORIES
                </span>
              </div>

              {/* KIDS */}
              <div className="relative flex h-[220px] w-full overflow-hidden bg-[#F5F5F5] md:w-1/2">
                <div className="h-full w-full bg-[linear-gradient(135deg,#e5e7eb,#f3f4f6)]" />

                <span className="absolute bottom-6 left-6 bg-white px-8 py-3 text-sm font-bold text-[#252B42]">
                  KIDS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}