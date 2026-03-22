import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import { createCard, editCard } from "../store/actions";

export default function CardForm({ card, onClose, onSuccess }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: card || {}
  });

  const onSubmit = async (data) => {
    setLoading(true);
    
    try {
      const cardData = {
        card_no: data.card_no.replace(/\s/g, ''), // Remove spaces
        expire_month: parseInt(data.expire_month),
        expire_year: parseInt(data.expire_year),
        name_on_card: data.name_on_card
      };

      if (card?.id) {
        // Update existing card
        await dispatch(editCard({ ...cardData, id: card.id }));
        toast.success("Card updated successfully!");
      } else {
        // Create new card
        await dispatch(createCard(cardData));
        toast.success("Card added successfully!");
      }
      
      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save card");
    } finally {
      setLoading(false);
    }
  };

  const formatCardNumber = (value) => {
    // Remove all non-digit characters
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    // Add spaces every 4 digits
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {card ? "Edit Card" : "Add New Card"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Card Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Card Number *
            </label>
            <input
              type="text"
              maxLength={19}
              {...register("card_no", {
                required: "Card number is required",
                pattern: {
                  value: /^[0-9\s]{13,19}$/,
                  message: "Please enter a valid card number"
                }
              })}
              onChange={(e) => {
                e.target.value = formatCardNumber(e.target.value);
              }}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#23A6F0] focus:outline-none focus:ring-1 focus:ring-[#23A6F0]"
              placeholder="1234 5678 9012 3456"
            />
            {errors.card_no && (
              <p className="mt-1 text-sm text-red-600">{errors.card_no.message}</p>
            )}
          </div>

          {/* Name on Card */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name on Card *
            </label>
            <input
              type="text"
              {...register("name_on_card", { required: "Name on card is required" })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#23A6F0] focus:outline-none focus:ring-1 focus:ring-[#23A6F0]"
              placeholder="John Doe"
            />
            {errors.name_on_card && (
              <p className="mt-1 text-sm text-red-600">{errors.name_on_card.message}</p>
            )}
          </div>

          {/* Expiry Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expiry Month *
              </label>
              <select
                {...register("expire_month", { required: "Expiry month is required" })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#23A6F0] focus:outline-none focus:ring-1 focus:ring-[#23A6F0]"
              >
                <option value="">Month</option>
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
              <label className="block text-sm font-medium text-gray-700">
                Expiry Year *
              </label>
              <select
                {...register("expire_year", { required: "Expiry year is required" })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#23A6F0] focus:outline-none focus:ring-1 focus:ring-[#23A6F0]"
              >
                <option value="">Year</option>
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
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-md border border-gray-300 py-2 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-md bg-[#23A6F0] py-2 text-white hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? "Saving..." : card ? "Update" : "Add Card"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}