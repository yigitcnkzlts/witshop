import { Link } from "react-router-dom";
import { CheckCircle2, Truck, ShieldCheck, Headphones } from "lucide-react";

export default function AboutPage() {
  return (
    <section className="w-full px-4 pt-24 pb-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* HERO */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Hakkımızda
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
              Modern alışveriş deneyimini hızlı, güvenli ve sade hale getiriyoruz.
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
              WITShop; kullanıcı dostu arayüz, güvenli ödeme ve özenle seçilmiş ürünlerle
              alışverişi kolaylaştırmayı hedefleyen bir e-ticaret platformudur.
              Amacımız; ilk tıklamadan teslimata kadar sorunsuz bir deneyim sunmak.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
              >
                Alışverişe Başla
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-900 transition-colors hover:bg-gray-50"
              >
                İletişime Geç
              </Link>
            </div>
          </div>

          {/* STATS */}
          <div className="grid w-full gap-4 sm:grid-cols-2 lg:w-[420px]">
            <StatCard label="Ürün Çeşidi" value="1.000+" />
            <StatCard label="Mutlu Müşteri" value="10.000+" />
            <StatCard label="Ortalama Teslimat" value="24–48s" />
            <StatCard label="Destek" value="7/24" />
          </div>
        </div>

        {/* DIVIDER */}
        <div className="mt-12 h-px w-full bg-gray-200" />

        {/* MISSION / VISION */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-black text-gray-900">Misyonumuz</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Alışverişi herkes için hızlı, sade ve güvenilir hale getirmek.
              Kullanıcı deneyimini merkeze alır, süreçleri şeffaf tutarız.
            </p>
            <ul className="mt-5 space-y-3">
              <Bullet>Temiz arayüz ve kolay gezinme</Bullet>
              <Bullet>Güvenli ödeme ve kullanıcı verisi hassasiyeti</Bullet>
              <Bullet>Hızlı destek ve net iletişim</Bullet>
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-black text-gray-900">Vizyonumuz</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Dijital alışverişte deneyim standartlarını yükselten, güven ve memnuniyet odaklı
              örnek bir platform olmak.
            </p>
            <ul className="mt-5 space-y-3">
              <Bullet>Ürün sayfalarında doğru bilgi</Bullet>
              <Bullet>Sorunsuz teslimat ve takip edilebilir süreç</Bullet>
              <Bullet>Kolay iade ve müşteri memnuniyeti</Bullet>
            </ul>
          </div>
        </div>

        {/* VALUES */}
        <div className="mt-12">
          <h3 className="text-xl font-black text-gray-900">Neye önem veriyoruz?</h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
            Alışverişin güvenli ve keyifli olması için temel prensiplerimizi her adımda uygularız.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ValueCard
              icon={<ShieldCheck size={18} />}
              title="Güven"
              desc="Güvenli ödeme ve şeffaf süreç."
            />
            <ValueCard
              icon={<Truck size={18} />}
              title="Hız"
              desc="Siparişten teslimata hızlı akış."
            />
            <ValueCard
              icon={<CheckCircle2 size={18} />}
              title="Kalite"
              desc="Özenle seçilmiş ürünler."
            />
            <ValueCard
              icon={<Headphones size={18} />}
              title="Destek"
              desc="Sorulara hızlı dönüş."
            />
          </div>
        </div>

        {/* PROCESS */}
        <div className="mt-12 rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <h3 className="text-xl font-black text-gray-900">Nasıl çalışıyoruz?</h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
            Süreçleri basit tutuyoruz: ürün seçimi → sipariş → hazırlık → teslimat → destek.
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-4">
            <StepCard step="01" title="Seç" desc="Ürünleri filtrele, karşılaştır." />
            <StepCard step="02" title="Sipariş ver" desc="Güvenli ödeme ile tamamla." />
            <StepCard step="03" title="Takip et" desc="Kargo sürecini anlık izle." />
            <StepCard step="04" title="Destek al" desc="Sorunda hızlı çözüm." />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-black text-gray-900">{value}</p>
    </div>
  );
}

function Bullet({ children }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-2 h-2 w-2 rounded-full bg-gray-900" />
      <p className="text-sm leading-6 text-gray-700">{children}</p>
    </li>
  );
}

function ValueCard({ icon, title, desc }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-center gap-2 text-gray-900">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100">
          {icon}
        </span>
        <p className="text-sm font-black">{title}</p>
      </div>
      <p className="mt-3 text-sm leading-6 text-gray-600">{desc}</p>
    </div>
  );
}

function StepCard({ step, title, desc }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <p className="text-xs font-black tracking-widest text-gray-500">{step}</p>
      <p className="mt-2 text-sm font-black text-gray-900">{title}</p>
      <p className="mt-2 text-sm leading-6 text-gray-600">{desc}</p>
    </div>
  );
}
