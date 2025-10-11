import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import GoogleLogin from "../../../Components/GoogleLogin/GoogleLogin";
import useAuth from "../../../hooks/useAuth/useAuth";
import useAlert from "../../../hooks/useAlert/useAlert";

const RegisterPage = () => {
    const { createUser } = useAuth();
    const showAlert = useAlert();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
                showAlert({
                    title: 'Registration Successful!',
                    text: 'Your account has been created. Welcome AutoFlet!',
                    icon: 'success',
                });
                reset();
                navigate('/');
            })
            .catch(error => {
                showAlert({
                    title: 'Registration Failed',
                    text: 'Something Wrong. Try Again',
                    icon: 'error',
                });
            })
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* 🔸 Top Section */}
            <div
                className="w-full h-[40vh] bg-cover bg-center flex items-center justify-center relative"
                style={{
                    backgroundImage: "url('/subheader.jpg')",
                }}
            >
                <div className="absolute inset-0 bg-secondary/10"></div>
                <h1 className="relative text-white text-4xl md:text-5xl font-bold drop-shadow-lg">
                    Register
                </h1>
            </div>

            {/* 🔸 Bottom Section */}
            <section className="bg-white py-16 px-6">
                <div className="max-w-4xl mx-auto text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-secondary">
                        Don't have an account?{" "}
                        <span className="text-primary">Register now.</span>
                    </h2>
                    <p className="text-gray-600 mt-3">
                        Welcome to <span className="font-semibold text-primary">AutoFlet</span>. We're
                        excited to have you on board. By creating an account, you'll gain
                        access to exclusive benefits and convenient features that make your
                        car rental experience even smoother.
                    </p>
                </div>

                {/* 🔸 Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="max-w-4xl mx-auto bg-gray-50 p-8 rounded-2xl shadow-md"
                >
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <label className="block text-left text-gray-700 font-medium mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                {...register("name", { required: "Name is required" })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Enter your name"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-left text-gray-700 font-medium mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                {...register("email", { required: "Email is required" })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Enter your email"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-left text-gray-700 font-medium mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    validate: {
                                        minLength: (value) =>
                                            value.length >= 6 ||
                                            "Password must be at least 6 characters",
                                        hasUpperCase: (value) =>
                                            /[A-Z]/.test(value) ||
                                            "Password must contain at least one uppercase letter",
                                        hasLowerCase: (value) =>
                                            /[a-z]/.test(value) ||
                                            "Password must contain at least one lowercase letter",
                                    },
                                })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Enter your password"
                            />

                            {/* Display all error messages separately */}
                            {errors.password && (
                                <div className="text-red-500 text-sm mt-1 space-y-1">
                                    {errors.password.types?.minLength && (
                                        <p>{errors.password.types.minLength}</p>
                                    )}
                                    {errors.password.types?.hasUpperCase && (
                                        <p>{errors.password.types.hasUpperCase}</p>
                                    )}
                                    {errors.password.types?.hasLowerCase && (
                                        <p>{errors.password.types.hasLowerCase}</p>
                                    )}
                                    {!errors.password.types && (
                                        <p>{errors.password.message}</p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Photo Upload */}
                        <div>
                            <label className="block text-left text-gray-700 font-medium mb-1">
                                Upload Photo
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                {...register("photo")}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8 text-center">
                        <button
                            type="submit"
                            className="bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary/80 transition cursor-pointer"
                        >
                            Register Now
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <hr className="flex-1 border-gray-300" />
                        <span className="text-gray-500 text-sm">or</span>
                        <hr className="flex-1 border-gray-300" />
                    </div>

                    {/* Google Login Button */}
                    <div className="max-w-sm mx-auto">
                        <GoogleLogin />
                    </div>

                    {/* Login Link */}
                    <p className="text-gray-600 text-center mt-6">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-primary font-medium hover:underline"
                        >
                            Login here
                        </Link>
                    </p>
                </form>
            </section>
        </div>
    );
};

export default RegisterPage;
