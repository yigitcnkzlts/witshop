# WITShop - E-Ticaret Projesi

Modern ve kullanıcı dostu bir e-ticaret platformu. React, Redux ve Tailwind CSS kullanılarak geliştirilmiştir.

## 🚀 Özellikler

### ✅ Tamamlanan Görevler (T1-T23)

#### 🏗️ Proje Kurulumu (T1-T2)
- React + Vite ile modern proje yapısı
- Responsive tasarım (Mobile-first yaklaşım)
- Tailwind CSS ile stil yönetimi
- React Router v5 ile sayfa yönlendirme
- Redux + Redux Thunk ile state yönetimi
- Axios ile API entegrasyonu
- React Toastify ile bildirimler
- Lucide React ile ikonlar

#### 📄 Sayfalar ve Routing (T3-T7)
- **Ana Sayfa** (`/`) - Hero slider, ürün vitrinleri, blog yazıları
- **Mağaza** (`/shop`) - Ürün listesi, kategori filtreleme, sayfalama
- **Ürün Detay** (`/shop/:productId`) - Ürün bilgileri, resimler, yorumlar
- **İletişim** (`/contact`) - İletişim formu, harita, SSS
- **Ekip** (`/team`) - Takım üyeleri, roller, LinkedIn bağlantıları
- **Hakkımızda** (`/about`) - Şirket bilgileri, misyon, vizyon

#### 🔐 Kullanıcı Yönetimi (T8, T10-T11)
- **Kayıt Ol** (`/signup`) - React Hook Form ile doğrulama
- **Giriş Yap** (`/login`) - Email/şifre ile giriş
- **Otomatik Giriş** - Token ile oturum yönetimi
- **Gravatar** - Profil resmi entegrasyonu
- **Çıkış Yap** - Güvenli oturum sonlandırma

#### 🛍️ E-Ticaret Özellikleri (T12-T23)
- **Kategori Yönetimi** - API'den dinamik kategori listesi
- **Ürün Yönetimi** - Filtreleme, sıralama, sayfalama
- **Ürün Detay** - API'den gerçek ürün bilgileri (T16)
- **Query Parameters** - Kategori, filtre, sıralama URL parametreleri (T14)
- **Pagination** - Sayfa bazlı ürün yükleme (T15)
- **Alışveriş Sepeti** - Ürün ekleme, çıkarma, miktar güncelleme (T17)
- **Sepet Sayfası** - Sepet yönetimi, sipariş özeti (T18-T19)
- **Adres Yönetimi** - Adres ekleme, düzenleme, silme (T20)
- **Kart Yönetimi** - Kredi kartı ekleme, düzenleme, silme (T21)
- **Sipariş Oluşturma** - İki adımlı sipariş süreci (T22)
- **Sipariş Geçmişi** - Geçmiş siparişleri görüntüleme (T23)
- **Protected Routes** - Giriş gerektiren sayfalar
- **Loading States** - Yükleme animasyonları
- **Error Handling** - Hata yönetimi ve kullanıcı bildirimleri

#### 🎨 Layout ve Bileşenler (T1-T2)
- **Header** - Navigasyon, kullanıcı menüsü, kategori dropdown, sepet dropdown
- **Footer** - Bağlantılar, sosyal medya, newsletter
- **PageContent** - Route yönetimi ve sayfa içeriği
- **ProtectedRoute** - Giriş gerektiren sayfalar için koruma

#### 🔄 Redux Store Yapısı (T9, T20-T23)
- **Client Reducer** - Kullanıcı, roller, tema, dil
- **Product Reducer** - Kategoriler, ürünler, ürün detay, filtreleme
- **Shopping Cart Reducer** - Sepet, ödeme, adres bilgileri
- **Address Reducer** - Adres listesi ve seçili adres (T20)
- **Card Reducer** - Kart listesi ve seçili kart (T21)
- **Order Reducer** - Sipariş listesi (T22-T23)

## 🛠️ Teknoloji Stack

- **Frontend:** React 18, Vite
- **State Management:** Redux, Redux Thunk, Redux Logger
- **Routing:** React Router v5
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Form Management:** React Hook Form
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Notifications:** React Toastify
- **Image Slider:** Swiper.js

## 📦 Kurulum

```bash
# Projeyi klonla
git clone [repository-url]
cd witshop

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build
```

## 🌐 API Entegrasyonu

Proje `https://workintech-fe-ecommerce.onrender.com` API'sini kullanmaktadır.

### Demo Hesap
Hızlı test için hazır hesap:
- **Email:** customer@commerce.com
- **Şifre:** 123456

Login sayfasında "Quick Login" butonu ile tek tıkla giriş yapabilirsiniz.

## 📱 Responsive Tasarım

- **Mobile First:** Önce mobil, sonra desktop
- **Breakpoints:** Tailwind CSS standart breakpoint'leri
- **Flexible Layout:** Flexbox ve Grid kullanımı
- **Touch Friendly:** Mobil dokunmatik deneyim

## 🎯 Öne Çıkan Özellikler

### 🔒 Güvenlik
- JWT token ile oturum yönetimi
- LocalStorage ile "Beni Hatırla" özelliği
- Otomatik token doğrulama
- Protected routes (giriş gerektiren sayfalar)
- Güvenli API çağrıları

### 🎨 Kullanıcı Deneyimi
- Smooth animasyonlar
- Loading states
- Error handling
- Toast bildirimleri
- Responsive tasarım
- Modal formlar

### 🛒 E-Ticaret
- Dinamik kategori listesi
- Ürün filtreleme ve sıralama
- Sepet yönetimi
- Ürün detay sayfaları
- Adres ve kart yönetimi
- İki adımlı sipariş süreci
- Sipariş geçmişi

### 💳 Ödeme Sistemi
- Kayıtlı kartları yönetme
- Güvenli kart bilgisi saklama
- Kart numarası maskeleme
- Form validasyonları

### 📦 Sipariş Yönetimi
- Sipariş oluşturma
- Sipariş geçmişi
- Sipariş detayları
- Sipariş durumu takibi

## 📁 Proje Yapısı

```
src/
├── api/                 # API konfigürasyonu
├── assets/             # Görseller ve statik dosyalar
├── components/         # Yeniden kullanılabilir bileşenler
├── data/              # Statik veri dosyaları
├── layout/            # Layout bileşenleri
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── PageContent.jsx
├── pages/             # Sayfa bileşenleri
├── store/             # Redux store
│   ├── actions/       # Action creators
│   ├── reducer.js     # Root reducer
│   └── store.js       # Store konfigürasyonu
└── main.jsx           # Uygulama giriş noktası
```

## 🚀 Deployment

Proje Vercel, Netlify veya Render platformlarında deploy edilebilir.

```bash
# Build oluştur
npm run build

# Build'i test et
npm run preview
```

## 👥 Geliştirici Ekibi

- **Gökhan Özdemir** - Project Manager
- **Yiğit Can Kızıltaş** - Full Stack Developer

## 📄 Lisans

Bu proje eğitim amaçlı geliştirilmiştir.

---

**WITShop** - Modern e-ticaret deneyimi 🛍️
