import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import { createAddress, editAddress } from "../store/actions";

const turkishCities = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin",
  "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale",
  "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum",
  "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Isparta", "Mersin",
  "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir", "Kocaeli",
  "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir",
  "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat",
  "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt",
  "Karaman", "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük",
  "Kilis", "Osmaniye", "Düzce"
];

export default function AddressForm({ address, onClose, onSuccess }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: address || {}
  });

  const onSubmit = async (data) => {
    setLoading(true);
    
    try {
      if (address?.id) {
        // Update existing address
        await dispatch(editAddress({ ...data, id: address.id }));
        toast.success("Address updated successfully!");
      } else {
        // Create new address
        await dispatch(createAddress(data));
        toast.success("Address added successfully!");
      }
      
      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save address");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {address ? "Edit Address" : "Add New Address"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Address Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address Title *
            </label>
            <input
              type="text"
              {...register("title", { required: "Address title is required" })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#23A6F0] focus:outline-none focus:ring-1 focus:ring-[#23A6F0]"
              placeholder="e.g., Home, Office"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* Name & Surname */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name *
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#23A6F0] focus:outline-none focus:ring-1 focus:ring-[#23A6F0]"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Surname *
              </label>
              <input
                type="text"
                {...register("surname", { required: "Surname is required" })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#23A6F0] focus:outline-none focus:ring-1 focus:ring-[#23A6F0]"
              />
              {errors.surname && (
                <p className="mt-1 text-sm text-red-600">{errors.surname.message}</p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone *
            </label>
            <input
              type="tel"
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^(\+90|0)?[5][0-9]{9}$/,
                  message: "Please enter a valid Turkish phone number"
                }
              })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#23A6F0] focus:outline-none focus:ring-1 focus:ring-[#23A6F0]"
              placeholder="05XX XXX XX XX"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City *
            </label>
            <select
              {...register("city", { required: "City is required" })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#23A6F0] focus:outline-none focus:ring-1 focus:ring-[#23A6F0]"
            >
              <option value="">Select City</option>
              {turkishCities.map(city => (
                <option key={city} value={city.toLowerCase()}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>

          {/* District */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              District *
            </label>
            <input
              type="text"
              {...register("district", { required: "District is required" })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#23A6F0] focus:outline-none focus:ring-1 focus:ring-[#23A6F0]"
              placeholder="e.g., Kadıköy"
            />
            {errors.district && (
              <p className="mt-1 text-sm text-red-600">{errors.district.message}</p>
            )}
          </div>

          {/* Address Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address Details *
            </label>
            <textarea
              rows={3}
              {...register("neighborhood", { required: "Address details are required" })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#23A6F0] focus:outline-none focus:ring-1 focus:ring-[#23A6F0]"
              placeholder="Neighborhood, street, building and door number"
            />
            {errors.neighborhood && (
              <p className="mt-1 text-sm text-red-600">{errors.neighborhood.message}</p>
            )}
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
              {loading ? "Saving..." : address ? "Update" : "Add Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}