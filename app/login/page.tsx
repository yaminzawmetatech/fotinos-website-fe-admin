// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import Cookies from 'js-cookie';
// import { motion } from "framer-motion";
// import apiClient from "@/lib/apiClient";

// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";

// import { Eye, EyeOff } from "lucide-react";

// type LoginForm = {
//   email: string;
//   password: string;
// };

// export default function LoginPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const { register, handleSubmit } = useForm<LoginForm>();

//   const onSubmit = async (data: LoginForm) => {
//     try {
//       setLoading(true);
//       setError("");

//       const res = await apiClient.post("login", data);

//       const access_token = res.data?.access_token;

//       if (access_token) {
//         localStorage.setItem('user', JSON.stringify(res?.data));
//         Cookies.set("jwt_authorization", res.data.access_token);
//       }

//       router.push("/dashboard");
//     } catch (err: any) {
//       setError(err?.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

//       {/* 🌄 Background Illustration Layer */}
//       <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-100" />

//       {/* Decorative blur shapes */}
//       <div className="absolute w-[500px] h-[500px] bg-orange-400/20 rounded-full blur-3xl top-[-100px] left-[-100px]" />
//       <div className="absolute w-[400px] h-[400px] bg-orange-500/20 rounded-full blur-3xl bottom-[-120px] right-[-120px]" />

//       {/* Login Card */}
//       <motion.div
//         initial={{ opacity: 0, y: 30, scale: 0.95 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ duration: 0.6 }}
//         className="relative w-[420px]"
//       >
//         <div className="backdrop-blur-xl bg-white/60 border border-white/30 shadow-2xl rounded-2xl p-8">

//           {/* Title */}
//           <h1 className="text-2xl font-bold text-center text-orange-600">
//             Welcome Back
//           </h1>

//           <p className="text-center text-gray-500 text-sm mt-1 mb-6">
//             Sign in to continue
//           </p>

//           {/* Form */}
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

//             {/* Email */}
//             <div>
//               <Label>Email</Label>
//               <Input
//                 type="email"
//                 placeholder="you@example.com"
//                 {...register("email", { required: true })}
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <Label>Password</Label>

//               <div className="relative">
//                 <Input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="••••••••"
//                   {...register("password", { required: true })}
//                 />

//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-2.5 text-gray-500"
//                 >
//                   {showPassword ? (
//                     <EyeOff size={18} />
//                   ) : (
//                     <Eye size={18} />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Error */}
//             {error && (
//               <p className="text-sm text-red-500">{error}</p>
//             )}

//             {/* Button */}
//             <Button
//               type="submit"
//               className="w-full bg-orange-600 hover:bg-orange-700 text-white"
//               disabled={loading}
//             >
//               {loading ? "Signing in..." : "Login"}
//             </Button>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { motion } from "framer-motion";

import apiClient from "@/lib/apiClient";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true);
      setError("");

      const res = await apiClient.post("login", data);

      const access_token = res?.data?.access_token;

      if (access_token) {
        // Save user
        localStorage.setItem("user", JSON.stringify(res.data));

        // Save token in cookies
        Cookies.set("jwt_authorization", access_token, {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 overflow-hidden">
      {/* Background Illustration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-[url('/login-bg.svg')] bg-cover bg-center bg-no-repeat"
      />

      {/* Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-md p-8 rounded-2xl shadow-lg backdrop-blur-xl bg-white/40 border border-white/30"
      >
        <h2 className="text-3xl font-bold text-orange-600 text-center mb-6">
          Welcome Back
        </h2>

        {error && (
          <p className="text-red-600 text-center mb-4 bg-red-100 p-2 rounded-md">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <Label className="text-orange-700">Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
              className="bg-white/50 backdrop-blur rounded-lg border-orange-300 focus:ring-orange-500"
            />
          </div>

          {/* Password */}
          <div>
            <Label className="text-orange-700">Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", { required: true })}
                className="bg-white/50 backdrop-blur rounded-lg border-orange-300 focus:ring-orange-500"
              />

              {/* Eye Toggle */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-orange-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-xl shadow"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}