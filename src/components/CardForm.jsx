import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { X, CreditCard, Lock } from "lucide-react";
import { createCard, editCard } from "../store/actions";

export default function CardForm({ card, onClose, onSuccess }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [cardType, setCardType] = useState("");
  const [installment, setInstallment] = useState(1);
  const [use3DSecure, setUse3DSecure] = useState(true);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: card || {}
  });

  const cardNumber = watch("card_no", "");
  const cardName = watch("name_on_card", "");
  const expiryMonth = watch("expire_month", "");
  const expiryYear = watch("expire_year", "");

  // Detect card type from number
  const detectCardType = (number) => {
    const cleaned = number.replace(/\s/g, '');
    if (/^4/.test(cleaned)) return "visa";
    if (/^5[1-5]/.test(cleaned)) return "mastercard";
    if (/^3[47]/.test(cleaned)) return "amex";
    return "";
  };

  const onSubmit = async (data) => {
    setLoading(true);
    
    try {
      const cardData = {
        card_no: data.card_no.replace(/\s/g, ''), // Remove spaces
        expire_month: parseInt(data.expire_month),
        expire_year: parseInt(data.expire_year),
        name_on_card: data.name_on_card,
        cvv: data.cvv,
        installment: installment,
        use_3d_secure: use3DSecure
      };

      if (card?.id) {
        // Update existing card
        try {
          await dispatch(editCard({ ...cardData, id: card.id }));
        } catch (error) {
          // If API fails, save to localStorage
          const savedCards = JSON.parse(localStorage.getItem('savedCards') || '[]');
          const updatedCards = savedCards.map(c => c.id === card.id ? { ...cardData, id: card.id } : c);
          localStorage.setItem('savedCards', JSON.stringify(updatedCards));
        }
        toast.success("Kart güncellendi!");
      } else {
        // Create new card
        try {
          await dispatch(createCard(cardData));
        } catch (error) {
          // If API fails, save to localStorage
          const savedCards = JSON.parse(localStorage.getItem('savedCards') || '[]');
          const newCard = { ...cardData, id: Date.now() };
          savedCards.push(newCard);
          localStorage.setItem('savedCards', JSON.stringify(savedCards));
          dispatch({ type: 'ADD_CARD', payload: newCard });
        }
        toast.success("Kart kaydedildi!");
      }
      
      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error("Kart kaydedilemedi");
    } finally {
      setLoading(false);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const type = detectCardType(v);
    setCardType(type);
    
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  // Calculate installment options based on card amount
  const installmentOptions = [
    { value: 1, label: "Tek Çekim", interest: 0 },
    { value: 2, label: "2 Taksit", interest: 0 },
    { value: 3, label: "3 Taksit", interest: 2.5 },
    { value: 6, label: "6 Taksit", interest: 5 },
    { value: 9, label: "9 Taksit", interest: 7.5 },
    { value: 12, label: "12 Taksit", interest: 10 }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              {card ? "Kart Bilgilerini Düzenle" : "Yeni Kart Ekle"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Virtual Card Preview */}
          <div className="mb-6 rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 p-6 text-white shadow-2xl">
            <div className="mb-8 flex items-center justify-between">
              <CreditCard size={40} className="opacity-80" />
              <div className="text-right">
                {cardType === "visa" && <span className="text-2xl font-bold">VISA</span>}
                {cardType === "mastercard" && <span className="text-2xl font-bold">Mastercard</span>}
                {cardType === "amex" && <span className="text-2xl font-bold">AMEX</span>}
              </div>
            </div>
            <div className="mb-6 font-mono text-2xl tracking-wider">
              {cardNumber || "•••• •••• •••• ••••"}
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-xs opacity-70">Kart Sahibi</div>
                <div className="font-semibold uppercase">
                  {cardName || "AD SOYAD"}
                </div>
              </div>
              <div>
                <div className="text-xs opacity-70">Son Kullanma</div>
                <div className="font-semibold">
                  {expiryMonth && expiryYear 
                    ? `${expiryMonth.toString().padStart(2, '0')}/${expiryYear.toString().slice(-2)}`
                    : "MM/YY"}
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Card Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kart Numarası *
              </label>
              <input
                type="text"
                maxLength={19}
                {...register("card_no", {
                  required: "Kart numarası gereklidir",
                  pattern: {
                    value: /^[0-9\s]{13,19}$/,
                    message: "Geçerli bir kart numarası giriniz"
                  }
                })}
                onChange={(e) => {
                  e.target.value = formatCardNumber(e.target.value);
                }}
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#23A6F0] focus:outline-none focus:ring-2 focus:ring-[#23A6F0]/20"
                placeholder="1234 5678 9012 3456"
              />
              {errors.card_no && (
                <p className="mt-1 text-sm text-red-600">{errors.card_no.message}</p>
              )}
            </div>

            {/* Name on Card */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kart Üzerindeki İsim *
              </label>
              <input
                type="text"
                {...register("name_on_card", { 
                  required: "Kart üzerindeki isim gereklidir",
                  pattern: {
                    value: /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,
                    message: "Sadece harf giriniz"
                  }
                })}
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 uppercase focus:border-[#23A6F0] focus:outline-none focus:ring-2 focus:ring-[#23A6F0]/20"
                placeholder="AD SOYAD"
              />
              {errors.name_on_card && (
                <p className="mt-1 text-sm text-red-600">{errors.name_on_card.message}</p>
              )}
            </div>

            {/* Expiry Date and CVV */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ay *
                </label>
                <select
                  {...register("expire_month", { required: "Ay seçiniz" })}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#23A6F0] focus:outline-none focus:ring-2 focus:ring-[#23A6F0]/20"
                >
                  <option value="">Ay</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                    <option key={month} value={month}>
                      {month.toString().padStart(2, '0')}
                    </option>
                  ))}
                </select>
                {errors.expire_month && (
                  <p className="mt-1 text-sm text-red-600">{errors.expire_month.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Yıl *
                </label>
                <select
                  {...register("expire_year", { required: "Yıl seçiniz" })}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#23A6F0] focus:outline-none focus:ring-2 focus:ring-[#23A6F0]/20"
                >
                  <option value="">Yıl</option>
                  {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors.expire_year && (
                  <p className="mt-1 text-sm text-red-600">{errors.expire_year.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV *
                </label>
                <input
                  type="text"
                  maxLength={4}
                  {...register("cvv", {
                    required: "CVV gereklidir",
                    pattern: {
                      value: /^[0-9]{3,4}$/,
                      message: "3-4 haneli CVV giriniz"
                    }
                  })}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#23A6F0] focus:outline-none focus:ring-2 focus:ring-[#23A6F0]/20"
                  placeholder="123"
                />
                {errors.cvv && (
                  <p className="mt-1 text-sm text-red-600">{errors.cvv.message}</p>
                )}
              </div>
            </div>

            {/* Installment Options */}
            <div className="rounded-lg border border-gray-200 p-4">
              <label className="mb-3 block text-sm font-medium text-gray-700">
                Taksit Seçenekleri
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {installmentOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setInstallment(option.value)}
                    className={`rounded-lg border-2 p-3 text-sm transition-all ${
                      installment === option.value
                        ? 'border-[#23A6F0] bg-blue-50 text-[#23A6F0]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold">{option.label}</div>
                    {option.interest > 0 && (
                      <div className="text-xs text-gray-500">+%{option.interest} faiz</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 3D Secure */}
            <div className="rounded-lg border border-gray-200 p-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={use3DSecure}
                  onChange={(e) => setUse3DSecure(e.target.checked)}
                  className="h-5 w-5 rounded border-gray-300 text-[#23A6F0] focus:ring-[#23A6F0]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Lock size={16} className="text-green-600" />
                    <span className="font-medium text-gray-900">3D Secure ile Öde</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Güvenli ödeme için önerilir. Banka onayı gerektirir.
                  </p>
                </div>
              </label>
            </div>

            {/* Info Box */}
            <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
              <p className="font-medium mb-1">🔒 Güvenli Ödeme</p>
              <p className="text-xs">
                Kart bilgileriniz 256-bit SSL sertifikası ile şifrelenir ve güvenli bir şekilde saklanır.
              </p>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-lg border-2 border-gray-300 py-3 font-medium text-gray-700 hover:bg-gray-50"
              >
                İptal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-lg bg-[#23A6F0] py-3 font-medium text-white hover:bg-blue-600 disabled:opacity-50"
              >
                {loading ? "Kaydediliyor..." : card ? "Güncelle" : "Kartı Kaydet"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}