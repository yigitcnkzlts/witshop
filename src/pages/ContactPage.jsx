import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Copy,
  CheckCircle2,
  Send,
  HelpCircle,
  ChevronDown,
  Navigation,
} from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function ContactPage() {
  const [status, setStatus] = useState("idle"); // idle | sending | success
  const [copiedKey, setCopiedKey] = useState(null); // "email" | "phone" | null
  const [openFaq, setOpenFaq] = useState(0);

  const contact = useMemo(
    () => ({
      email: "support@witshop.com",
      phone: "+90 (212) 000 00 00",
      address: "İstanbul / Türkiye",
      hours: "Hafta içi 09:00 – 18:00",
    }),
    []
  );

  const faqs = useMemo(
    () => [
      {
        q: "Ne kadar sürede dönüş yapıyorsunuz?",
        a: "Genellikle hafta içi 24 saat içinde dönüş yapıyoruz. Yoğun dönemlerde süre uzayabilir.",
      },
      {
        q: "Siparişimle ilgili destek almak için ne yapmalıyım?",
        a: "E-posta üzerinden sipariş numaranı yazarak bize iletebilirsin. En kısa sürede yardımcı oluruz.",
      },
      {
        q: "İş birliği / sponsorluk için hangi kanaldan ulaşmalıyım?",
        a: "Konu kısmına “İş Birliği” yazarak formu gönderebilir veya direkt e-posta ile iletişime geçebilirsin.",
      },
    ],
    []
  );

  const copyToClipboard = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(null), 1200);
    } catch {
      // Clipboard izin vermeyebilir; UI-only.
    }
  };

  const handleFakeSubmit = (e) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    window.setTimeout(() => {
      setStatus("success");
      window.setTimeout(() => setStatus("idle"), 2200);
    }, 900);
  };

  return (
    <main className="w-full">
      <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16">
        {/* Hero: premium başlık + hafif glow arka plan */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative mb-10 overflow-hidden rounded-2xl border bg-white p-6 shadow-sm md:p-10"
        >
          <div className="pointer-events-none absolute -left-16 -top-20 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 -bottom-24 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" />

          <div className="relative">
            <p className="inline-flex items-center rounded-full border bg-white/70 px-3 py-1 text-xs font-semibold text-gray-700">
              WITShop • Destek & İş Birliği
            </p>

            <h1 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
              İletişim
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-gray-600 md:text-base">
              Soruların, önerilerin veya iş birliği taleplerin için bize ulaşabilirsin.
              Mesajını bırak, en kısa sürede dönüş yapalım.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                { label: "Yanıt Süresi", value: "24 Saat" },
                { label: "Destek", value: "Hafta İçi" },
                { label: "Konum", value: "İstanbul" },
                { label: "Kanal", value: "E-posta / Telefon" },
              ].map((x) => (
                <div
                  key={x.label}
                  className="rounded-xl border bg-white/70 p-3 text-center"
                >
                  <p className="text-[11px] font-semibold text-gray-500">{x.label}</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">{x.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* İçerik: sol info + sağ form */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-8 md:grid-cols-2"
        >
          {/* Sol: iletişim bilgileri + FAQ */}
          <motion.div variants={item} className="space-y-8">
            {/* İletişim kartı */}
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-200/40 via-transparent to-indigo-200/40 blur-[1px]" />
              <div className="relative rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Bize Ulaşın</h2>
                    <p className="mt-1 text-sm text-gray-600">
                      Aşağıdaki kanallardan hızlıca iletişime geçebilirsin.
                    </p>
                  </div>
                  <div className="rounded-xl border bg-gray-50 p-2 text-xs font-semibold text-gray-700">
                    Canlı Destek: Yakında
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {/* Email */}
                  <div className="flex items-center justify-between rounded-xl border bg-white p-4 transition hover:bg-gray-50">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-gray-50 p-2">
                        <Mail size={18} className="text-gray-700" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500">E-posta</p>
                        <p className="mt-0.5 text-sm font-semibold text-gray-900">{contact.email}</p>
                        <p className="mt-1 text-xs text-gray-500">Destek talepleri için ideal.</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => copyToClipboard(contact.email, "email")}
                      className="inline-flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
                      aria-label="E-postayı kopyala"
                    >
                      {copiedKey === "email" ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                      {copiedKey === "email" ? "Kopyalandı" : "Kopyala"}
                    </button>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center justify-between rounded-xl border bg-white p-4 transition hover:bg-gray-50">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-gray-50 p-2">
                        <Phone size={18} className="text-gray-700" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500">Telefon</p>
                        <p className="mt-0.5 text-sm font-semibold text-gray-900">{contact.phone}</p>
                        <p className="mt-1 text-xs text-gray-500">Acil konular için.</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => copyToClipboard(contact.phone, "phone")}
                      className="inline-flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
                      aria-label="Telefonu kopyala"
                    >
                      {copiedKey === "phone" ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                      {copiedKey === "phone" ? "Kopyalandı" : "Kopyala"}
                    </button>
                  </div>

                  {/* Address + Hours */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border bg-white p-4 transition hover:bg-gray-50">
                      <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-gray-50 p-2">
                          <MapPin size={18} className="text-gray-700" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500">Adres</p>
                          <p className="mt-0.5 text-sm font-semibold text-gray-900">{contact.address}</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border bg-white p-4 transition hover:bg-gray-50">
                      <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-gray-50 p-2">
                          <Clock size={18} className="text-gray-700" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500">Çalışma Saatleri</p>
                          <p className="mt-0.5 text-sm font-semibold text-gray-900">{contact.hours}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Not */}
                  <div className="rounded-xl border bg-gray-50 p-4">
                    <p className="text-xs text-gray-600">
                      Bu sayfa UI görevidir. Gönderim işlemi demo olarak çalışır; backend bağlanınca gerçek gönderim yapılacaktır.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Accordion */}
            <motion.div variants={item} className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-200/30 via-transparent to-blue-200/30 blur-[1px]" />
              <div className="relative rounded-2xl border bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2">
                  <HelpCircle size={18} className="text-gray-700" />
                  <h3 className="text-base font-semibold text-gray-900">Sık Sorulan Sorular</h3>
                </div>

                <div className="mt-5 divide-y">
                  {faqs.map((f, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div key={f.q} className="py-2">
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                          className="flex w-full items-center justify-between gap-3 py-3 text-left"
                        >
                          <span className="text-sm font-semibold text-gray-900">{f.q}</span>
                          <ChevronDown
                            size={18}
                            className={`shrink-0 text-gray-600 transition-transform ${isOpen ? "rotate-180" : ""}`}
                          />
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <p className="pb-4 text-sm text-gray-600">{f.a}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Sağ: form + harita placeholder */}
          <motion.div variants={item} className="space-y-8">
            {/* Form kartı */}
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-200/35 via-transparent to-blue-200/35 blur-[1px]" />
              <div className="relative rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                <h2 className="text-lg font-semibold text-gray-900">Mesaj Gönder</h2>
                <p className="mt-1 text-sm text-gray-600">
                  Formu doldur; mesajın bize ulaşsın.
                </p>

                <form onSubmit={handleFakeSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-900">Ad Soyad</label>
                    <input
                      type="text"
                      required
                      placeholder="Adınızı girin"
                      className="mt-2 w-full rounded-xl border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-black/10"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-900">E-posta</label>
                    <input
                      type="email"
                      required
                      placeholder="ornek@mail.com"
                      className="mt-2 w-full rounded-xl border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-black/10"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-900">Konu</label>
                    <input
                      type="text"
                      required
                      placeholder="Örn: Sipariş hakkında"
                      className="mt-2 w-full rounded-xl border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-black/10"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-900">Mesaj</label>
                    <textarea
                      rows="5"
                      required
                      placeholder="Mesajınızı yazın..."
                      className="mt-2 w-full resize-none rounded-xl border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-black/10"
                    />
                  </div>

                  <div className="space-y-3">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "sending" ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Gönderiliyor...
                        </>
                      ) : (
                        <>
                          <Send size={16} className="transition-transform group-hover:-translate-y-0.5" />
                          Gönder
                        </>
                      )}
                    </button>

                    <AnimatePresence>
                      {status === "success" && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          className="flex items-center gap-2 rounded-xl border bg-green-50 p-3 text-sm font-semibold text-green-800"
                        >
                          <CheckCircle2 size={18} />
                          Mesajın alındı! Yakında dönüş yapacağız.
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <p className="text-xs text-gray-500">
                      Bu form UI amaçlıdır. Backend entegrasyonu sonrasında gerçek gönderim aktif olacaktır.
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Harita placeholder (UI) */}
            <motion.div variants={item} className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-200/30 via-transparent to-indigo-200/30 blur-[1px]" />
              <div className="relative overflow-hidden rounded-2xl border bg-white shadow-sm">
                <div className="flex items-center justify-between gap-3 p-6">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Konum</h3>
                    <p className="mt-1 text-sm text-gray-600">İstanbul / Türkiye</p>
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
                    aria-label="Yol tarifi al"
                  >
                    <Navigation size={16} />
                    Yol tarifi
                  </button>
                </div>

                <div className="relative h-48 w-full bg-gradient-to-br from-gray-50 to-gray-100">
                  <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-blue-200/30 blur-2xl" />
                  <div className="pointer-events-none absolute -right-10 -bottom-10 h-44 w-44 rounded-full bg-indigo-200/30 blur-2xl" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center gap-2 rounded-xl border bg-white/80 px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm">
                      <MapPin size={18} />
                      Harita Önizleme (UI)
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 rounded-lg bg-white/80 px-3 py-1 text-[11px] font-semibold text-gray-700">
                    Yakında Google Maps entegrasyonu
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
