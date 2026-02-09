import { Link } from "react-router-dom";
import {
  Linkedin,
  Users,
  Target,
  Sparkles,
  ShieldCheck,
  Rocket,
  Code2,
  HeartHandshake,
} from "lucide-react";

/* Takım verisi: foto indirmeden güzel görünmesi için avatar (initial) kullanıyoruz */
const teamMembers = [
  {
    id: "gokhan",
    name: "Gökhan Özdemir",
    role: "Project Manager",
    linkedin: "https://www.linkedin.com/",
    highlight: true,
    skills: ["Roadmap", "Sprint", "Stakeholder", "Delivery"],
  },
  {
    id: "yigit",
    name: "Yiğit Can Kızıltaş",
    role: "Full Stack Developer",
    linkedin: "https://www.linkedin.com/",
    highlight: true,
    skills: ["React", "JavaScript", "Tailwind", "SQL"],
  },
  {
    id: "frontend",
    name: "Ayşe Demir",
    role: "Frontend Developer",
    linkedin: "https://www.linkedin.com/",
    skills: ["React", "UI", "Accessibility", "Performance"],
  },
  {
    id: "backend",
    name: "Mehmet Kaya",
    role: "Backend Developer",
    linkedin: "https://www.linkedin.com/",
    skills: ["API", "Database", "Auth", "Caching"],
  },
  {
    id: "design",
    name: "Elif Yılmaz",
    role: "UI/UX Designer",
    linkedin: "https://www.linkedin.com/",
    skills: ["Design System", "Figma", "UX", "Prototyping"],
  },
  {
    id: "qa",
    name: "Can Aksoy",
    role: "QA Engineer",
    linkedin: "https://www.linkedin.com/",
    skills: ["Test Plan", "Regression", "Bug Triage", "Automation"],
  },
];

/* İsimden baş harf üret */
function getInitials(fullName) {
  const parts = String(fullName).trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase()).join("");
}

/* Basit ama premium görünen avatar (foto yoksa bile çok iyi durur) */
function Avatar({ name, highlight = false }) {
  const initials = getInitials(name);
  return (
    <div
      className={[
        "relative flex h-14 w-14 items-center justify-center rounded-2xl",
        "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900",
        "ring-1 ring-black/5",
        highlight ? "shadow-sm" : "",
      ].join(" ")}
      aria-hidden="true"
    >
      {/* Hafif parıltı */}
      <div className="pointer-events-none absolute -left-6 -top-6 h-16 w-16 rounded-full bg-blue-200/30 blur-2xl" />
      <div className="pointer-events-none absolute -right-6 -bottom-6 h-16 w-16 rounded-full bg-indigo-200/30 blur-2xl" />
      <span className="relative text-sm font-black tracking-wider">{initials}</span>
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-xs font-semibold text-gray-700">
      {children}
    </span>
  );
}

export default function TeamPage() {
  return (
    <main className="w-full">
      <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16">
        {/* Hero: Sayfayı dolduran premium başlık alanı */}
        <div className="relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm md:p-10">
          <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 -bottom-24 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl" />

          <div className="relative">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>Bandage • Team</Badge>
              <Badge>React Router</Badge>
              <Badge>Responsive</Badge>
            </div>

            <h1 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
              Ekip
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-gray-600 md:text-base">
              Bandage projesini birlikte büyüten ekibimiz. Ürün, tasarım ve
              geliştirme süreçlerinde her birimiz farklı bir katkı sağlıyoruz.
            </p>

            {/* Mini istatistikler: sayfayı “boş” göstermeyen kısım */}
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                { label: "Takım Üyesi", value: `${teamMembers.length}+` },
                { label: "Roller", value: "PM • Dev • Design • QA" },
                { label: "Odak", value: "E-ticaret" },
                { label: "Süreç", value: "Agile" },
              ].map((x) => (
                <div key={x.label} className="rounded-xl border bg-white/70 p-3 text-center">
                  <p className="text-[11px] font-semibold text-gray-500">{x.label}</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">{x.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Takım kartları */}
        <div className="mt-10">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Takım Üyeleri</h2>
              <p className="mt-1 text-sm text-gray-600">
                Her rol; ürünün kalitesini ve deneyimini yükseltmek için çalışır.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-gray-600">
              <Users size={16} />
              Bandage Team
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((m) => (
              <article
                key={m.id}
                className={[
                  "group rounded-2xl border bg-white p-6 shadow-sm",
                  "transition hover:-translate-y-0.5 hover:shadow-md",
                  m.highlight ? "ring-1 ring-black/5" : "",
                ].join(" ")}
              >
                {/* Üye üst bilgisi: avatar + isim/rol */}
                <div className="flex items-start gap-4">
                  <Avatar name={m.name} highlight={m.highlight} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate text-base font-semibold text-gray-900">
                        {m.name}
                      </h3>
                      {m.highlight && (
                        <span className="rounded-full border bg-gray-50 px-2 py-0.5 text-[10px] font-bold text-gray-700">
                          ÖNE ÇIKAN
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm font-medium text-gray-600">{m.role}</p>
                  </div>
                </div>

                {/* Yetenek rozetleri */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {m.skills?.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Link alanı */}
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500">Bandage</span>
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
                    aria-label={`${m.name} LinkedIn`}
                  >
                    <Linkedin size={16} />
                    LinkedIn
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Değerler / Çalışma prensipleri: sayfayı dolduran kaliteli bölüm */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Target size={18} className="text-gray-700" />
              <h3 className="text-base font-semibold text-gray-900">Odak</h3>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              Kullanıcı deneyimi ve performansı önceleyen, sürdürülebilir bir e-ticaret ürününe
              odaklanıyoruz.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-gray-700" />
              <h3 className="text-base font-semibold text-gray-900">Kalite</h3>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              Tutarlı UI, temiz component mimarisi ve test yaklaşımıyla “üretim kalitesi” hedefliyoruz.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <HeartHandshake size={18} className="text-gray-700" />
              <h3 className="text-base font-semibold text-gray-900">İş Birliği</h3>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              PM–Design–Dev uyumunu güçlendirerek hızlı ve doğru teslimat yapıyoruz.
            </p>
          </div>
        </div>

        {/* Tech stack / kısa bölüm */}
        <div className="mt-12 rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Code2 size={18} className="text-gray-700" />
              <h3 className="text-base font-semibold text-gray-900">Teknoloji Yığını</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {["React", "React Router", "TailwindCSS", "Vite", "JavaScript"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border bg-white px-3 py-1 text-xs font-semibold text-gray-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
            Bu sayfa T6 kapsamında: <span className="font-semibold text-gray-800">Team page</span> oluşturma,
            Router bağlantısı ve içerik kartları ile responsive düzeni göstermeyi hedefler.
          </div>
        </div>

        {/* CTA: sayfanın altını dolduran güzel kapanış */}
        <div className="mt-12 rounded-2xl border bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2">
                <Rocket size={18} className="text-gray-700" />
                <h3 className="text-base font-semibold text-gray-900">
                  Takıma Katılmak mı İstiyorsun?
                </h3>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Projeyi büyütmek için yeni fikirler ve katkılar her zaman değerli.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
              >
                <Sparkles size={16} />
                İletişime Geç
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-xl border bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Ürünleri Gör
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
