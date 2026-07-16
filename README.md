# WITShop - Full Stack E-Ticaret Projesi

Modern ve kullanıcı dostu bir e-ticaret platformu. React + Redux frontend ve Java Spring Boot backend ile geliştirilmiştir.

## Teknoloji Stack

**Frontend**
- React 18 + Vite
- Redux + Redux Thunk
- React Router v5
- Tailwind CSS
- Axios
- React Hook Form
- Framer Motion
- React Toastify
- Swiper.js

**Backend**
- Java 21
- Spring Boot 3.4.2
- Spring Web, Spring Data JPA, Spring Security
- JWT Authentication (JJWT)
- H2 Database (dosya tabanlı)
- Maven

## Kurulum

### Gereksinimler
- Node.js 18+
- Java 21+
- Maven 3.8+

### Yerel Geliştirme

```bash
# Bağımlılıkları yükle
npm install

# Frontend + Backend birlikte başlat
npm run dev:full
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

### Ayrı Ayrı Başlatmak

```bash
# Sadece frontend
npm run dev

# Sadece backend
npm run dev:server
```

## Demo Hesap

```
Email: customer@commerce.com
Şifre: 123456
```

## API Endpoint'leri

| Method | Endpoint | Auth | Açıklama |
|--------|----------|------|----------|
| GET | /health | — | Sunucu durumu |
| GET | /roles | — | Kullanıcı rolleri |
| POST | /signup | — | Kayıt ol |
| POST | /login | — | Giriş yap, JWT token döner |
| GET | /verify | ✓ | Token doğrulama |
| GET | /categories | — | Kategori listesi |
| GET | /products | — | Ürün listesi (filtre, sıralama, sayfalama) |
| GET | /products/{id} | — | Ürün detayı |
| GET | /user/address | ✓ | Adres listesi |
| POST | /user/address | ✓ | Adres ekle |
| PUT | /user/address/{id} | ✓ | Adres güncelle |
| DELETE | /user/address/{id} | ✓ | Adres sil |
| GET | /user/card | ✓ | Kart listesi |
| POST | /user/card | ✓ | Kart ekle |
| PUT | /user/card/{id} | ✓ | Kart güncelle |
| DELETE | /user/card/{id} | ✓ | Kart sil |
| GET | /order | ✓ | Sipariş geçmişi |
| POST | /order | ✓ | Sipariş oluştur |

## Proje Yapısı

```
witshop/
├── src/                        # React frontend
│   ├── api/api.js              # API bağlantı ayarları
│   ├── components/             # Yeniden kullanılabilir bileşenler
│   ├── layout/                 # Header, Footer, PageContent
│   ├── pages/                  # Sayfa bileşenleri
│   └── store/                  # Redux store, actions, reducers
├── server/                     # Java Spring Boot backend
│   ├── pom.xml                 # Maven bağımlılıkları
│   └── src/main/java/com/witshop/
│       ├── bootstrap/          # Başlangıç veri yükleyici
│       ├── config/             # CORS ve Security ayarları
│       ├── controller/         # REST controller'lar
│       ├── dto/                # Response DTO'ları
│       ├── model/              # JPA entity'leri
│       ├── repository/         # Spring Data repository'leri
│       ├── security/           # JWT filter ve service
│       └── service/            # İş mantığı katmanı
├── public/                     # Statik dosyalar
├── package.json
└── render.yaml                 # Render deploy ayarı
```

## Frontend API Bağlantısı

`src/api/api.js` dosyasında ortama göre otomatik URL seçimi:

```js
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "http://localhost:3001" : "https://witshop-api.onrender.com");
```

- **Local:** `http://localhost:3001`
- **Production (Vercel):** `https://witshop-api.onrender.com`
- **Özel:** `.env` dosyasında `VITE_API_URL` tanımlanabilir

## Deploy

**Frontend → Vercel**
```bash
npm run build
```

**Backend → Render**
`render.yaml` dosyası ile otomatik deploy. JAR üretmek için:
```bash
cd server && mvn clean package -DskipTests
java -jar target/witshop-api-1.0.0.jar
```

## Geliştirici

**Yiğit Can Kızıltaş** — Full Stack Developer
