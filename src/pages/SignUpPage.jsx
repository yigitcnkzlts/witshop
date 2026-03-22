import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";

export default function SignUpPage() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const selectedRole = watch("role_id");
  const password = watch("password");

  // Fetch roles on component mount
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get("/roles");
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
        toast.error("Failed to load roles");
      }
    };
    fetchRoles();
  }, []);

  // Find if selected role is store
  const isStoreRole = roles.find(role => role.id == selectedRole)?.name === "store";

  const onSubmit = async (data) => {
    setLoading(true);
    
    try {
      let submitData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: parseInt(data.role_id)
      };

      // If store role is selected, add store information
      if (isStoreRole) {
        submitData.store = {
          name: data.store_name,
          phone: data.store_phone,
          tax_no: data.store_tax_id,
          bank_account: data.store_bank_account
        };
      }

      await api.post("/signup", submitData);
      
      toast.success("You need to click link in email to activate your account!");
      history.goBack();
      
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-md px-4">
        <div className="rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-6 text-center text-2xl font-bold text-[#252B42]">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name *
              </label>
              <input
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters"
                  }
                })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#23A6F0] focus:outline-none focus:ring-1 focus:ring-[#23A6F0]"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email *
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#23A6F0] focus:outline-none focus:ring-1 focus:ring-[#23A6F0]"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password *
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 4,
                    message: "Password must be at least 4 characters"
                  }
                })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#23A6F0] focus:outline-none focus:ring-1 focus:ring-[#23A6F0]"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Password Confirmation */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password *
              </label>
              <input
                type="password"
                {...register("password_confirmation", {
                  required: "Please confirm your password",
                  validate: value => value === password || "Passwords do not match"
                })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#23A6F0] focus:outline-none focus:ring-1 focus:ring-[#23A6F0]"
                placeholder="Confirm your password"
              />
              {errors.password_confirmation && (
                <p className="mt-1 text-sm text-red-600">{errors.password_confirmation.message}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role *
              </label>
              <select
                {...register("role_id", { required: "Please select a role" })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#23A6F0] focus:outline-none focus:ring-1 focus:ring-[#23A6F0]"
              >
                <option value="">Select Role</option>
                {roles.map(role => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
              {errors.role_id && (
                <p className="mt-1 text-sm text-red-600">{errors.role_id.message}</p>
              )}
            </div>

            {/* Store Fields - Only show if store role is selected */}
            {isStoreRole && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Store Name *
                  </label>
                  <input
                    type="text"
                    {...register("store_name", {
                      required: isStoreRole ? "Store name is required" : false,
                      minLength: {
                        value: 3,
                        message: "Store name must be at least 3 characters"
                      }
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#23A6F0] focus:outline-none focus:ring-1 focus:ring-[#23A6F0]"
                  />
                  {errors.store_name && (
                    <p className="mt-1 text-sm text-red-600">{errors.store_name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Store Phone *
                  </label>
                  <input
                    type="tel"
                    {...register("store_phone", {
                      required: isStoreRole ? "Store phone is required" : false,
                      pattern: {
                        value: /^(\+90|0)?[5][0-9]{9}$/,
                        message: "Please enter a valid Turkish phone number"
                      }
                    })}
                    placeholder="+90 555 123 45 67"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#23A6F0] focus:outline-none focus:ring-1 focus:ring-[#23A6F0]"
                  />
                  {errors.store_phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.store_phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Store Tax ID *
                  </label>
                  <input
                    type="text"
                    {...register("store_tax_id", {
                      required: isStoreRole ? "Store tax ID is required" : false,
                      pattern: {
                        value: /^T\d{4}V\d{6}$/,
                        message: "Tax ID must match pattern TXXXXVXXXXXX"
                      }
                    })}
                    placeholder="T1234V123456"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#23A6F0] focus:outline-none focus:ring-1 focus:ring-[#23A6F0]"
                  />
                  {errors.store_tax_id && (
                    <p className="mt-1 text-sm text-red-600">{errors.store_tax_id.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Store Bank Account (IBAN) *
                  </label>
                  <input
                    type="text"
                    {...register("store_bank_account", {
                      required: isStoreRole ? "Store bank account is required" : false,
                      pattern: {
                        value: /^TR\d{2}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{2}$/,
                        message: "Please enter a valid Turkish IBAN"
                      }
                    })}
                    placeholder="TR12 3456 7890 1234 5678 9012 34"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#23A6F0] focus:outline-none focus:ring-1 focus:ring-[#23A6F0]"
                  />
                  {errors.store_bank_account && (
                    <p className="mt-1 text-sm text-red-600">{errors.store_bank_account.message}</p>
                  )}
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-[#23A6F0] px-4 py-2 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Creating Account...
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}