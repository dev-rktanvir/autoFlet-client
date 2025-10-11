import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import GoogleLogin from "../../../Components/GoogleLogin/GoogleLogin";
import useAuth from "../../../hooks/useAuth/useAuth";
import useAlert from "../../../hooks/useAlert/useAlert";

const LoginPage = () => {
    const { loginUser } = useAuth();
    const showAlert = useAlert();
    const location = useLocation();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        loginUser(data.email, data.password)
            .then(res => {
                showAlert({
                    title: 'Login Successful!',
                    text: 'Welcome back to AutoFlet!',
                    icon: 'success',
                });
                navigate(location?.state || '/');
            })
            .catch(error => {
                showAlert({
                    title: 'Login Failed!',
                    text: 'Invalid username or password. Please try again.',
                    icon: 'error',
                });
            })
    };

    return (
        <section
            className="w-full min-h-screen bg-cover bg-center flex items-center justify-center relative"
            style={{
                backgroundImage: "url('/login.jpg')",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-secondary/10"></div>

            {/* Login Form */}
            <div className="relative z-10 bg-white rounded-lg shadow-lg p-8 w-[90%] max-w-md mx-auto mt-10 md:mt-0">
                <h2 className="text-3xl font-bold text-center text-secondary mb-6">
                    Welcome Back
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            {...register("password", { required: "Password is required" })}
                            placeholder="Enter your password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-primary/80 transition cursor-pointer"
                    >
                        Sign In
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                    <hr className="flex-1 border-gray-300" />
                    <span className="text-gray-500 text-sm">or</span>
                    <hr className="flex-1 border-gray-300" />
                </div>

                {/* Google Login */}
                <div>
                    <GoogleLogin />
                </div>

                {/* Links */}
                <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
                    <Link
                        to="/forgot-password"
                        className="hover:text-primary/80 transition"
                    >
                        Forgot Password?
                    </Link>
                    <Link to="/register" className="hover:text-primary/80 transition">
                        Create Account
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;
