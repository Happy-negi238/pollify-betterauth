import { useForm } from "react-hook-form";
import { signUp } from "@/better-auth/api";
import { BarChart2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type SignUpForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {

  const navigation = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    mode: "onBlur"
  });

  const password = watch("password");

  const onSubmit = async (signUpFormFields: SignUpForm) => {
    try {
      const response = await signUp({
        name: signUpFormFields.name,
        email: signUpFormFields.email,
        password: signUpFormFields.password,
      });

      const { data, error } = response.data;

      if (error) {
        toast.error(error.message!);
        return;
      }

      toast.success("Account created successfully!");
      navigation("/log-in");
    } catch (error) {
      toast.error("Error: Creating account")
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
      <Toaster position="top-right" />
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-xl text-white">
            <BarChart2 strokeWidth={4} />
          </div>

          <h1 className="mt-3 text-2xl font-semibold text-slate-900">
            Create your account
          </h1>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Start creating live polls in minutes.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          {/* Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Full Name
            </label>

            <input
              type="text"
              placeholder="John Doe"
              {...register("name", {
                required: "Name is required",
              })}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm 
              outline-none transition focus:border-blue-300 focus:ring-blue-500/20 focus:ring-2"
            />

            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              placeholder="john@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email",
                },
              })}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm 
              outline-none transition focus:border-blue-300 focus:ring-blue-500/20 focus:ring-2"
            />

            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm 
              outline-none transition focus:border-blue-300 focus:ring-blue-500/20 focus:ring-2"
            />

            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm 
              outline-none transition focus:border-blue-300 focus:ring-blue-500/20 focus:ring-2"
            />

            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-blue-600 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <a
            href="/log-in"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Sign in
          </a>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
