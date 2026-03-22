import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { loginUser } from "../store/actions";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [autoLoginLoading, setAutoLoginLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    
    try {
      await dispatch(loginUser(data));
      toast.success("Successfully logged in!");
      
      // Redirect to previous page or home
      const previousPath = history.location.state?.from?.pathname || "/";
      history.push(previousPath);
      
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async () => {
    setAutoLoginLoading(true);
    
    try {
      // Use test account
      await dispatch(loginUser({
        email: "customer@commerce.com",
        password: "123456",
        rememberMe: true
      }));
      
      toast.success("Quick login successful!");
      
      // Redirect to home
      history.push("/");
      
    } catch (error) {
      console.error("Quick login error:", error);
      toast.error("Quick login failed. Please try manual login.");
    } finally {
      setAutoLoginLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-md px-4">
        <div className="rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-6 text-center text-2xl font-bold text-[#252B42]">
            Login
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required"
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 pr-10 focus:border-[#23A6F0] focus:outline-none focus:ring-1 focus:ring-[#23A6F0]"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register("rememberMe")}
                className="h-4 w-4 rounded border-gray-300 text-[#23A6F0] focus:ring-[#23A6F0]"
              />
              <label className="ml-2 text-sm text-gray-700">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-[#23A6F0] px-4 py-2 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Logging in...
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Quick Login Button */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleQuickLogin}
              disabled={autoLoginLoading}
              className="mt-4 w-full rounded-md border-2 border-[#23A6F0] bg-white px-4 py-2 text-[#23A6F0] transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {autoLoginLoading ? (
                <div className="flex items-center justify-center">
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-[#23A6F0] border-t-transparent"></div>
                  Logging in...
                </div>
              ) : (
                "🚀 Quick Login (Demo Account)"
              )}
            </button>
            
            <p className="mt-2 text-center text-xs text-gray-500">
              Click to login with demo account instantly
            </p>
          </div>

          {/* Sign Up Link */}
          <div className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold text-[#23A6F0] hover:underline">
              Sign Up
            </Link>
          </div>

          {/* Demo Account Info */}
          <div className="mt-6 rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🔑</span>
              <h3 className="text-sm font-bold text-blue-900">Demo Account</h3>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium text-blue-800">Email:</span>
                <code className="rounded bg-white px-2 py-1 text-blue-900">customer@commerce.com</code>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-blue-800">Password:</span>
                <code className="rounded bg-white px-2 py-1 text-blue-900">123456</code>
              </div>
            </div>
            <p className="mt-3 text-xs text-blue-700">
              💡 Use Quick Login button above or copy these credentials
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}