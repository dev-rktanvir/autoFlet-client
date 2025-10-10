import { FcGoogle } from "react-icons/fc";

const GoogleLogin = () => {
    const handleGoogleSignIn = () => {
        alert("Google Sign-In Clicked");
    };
    return (
        <button
            onClick={handleGoogleSignIn}
            type="button"
            className="flex items-center justify-center gap-2 border border-gray-300 w-full py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
        >
            <FcGoogle className="text-2xl" />
            <span className="text-gray-700 font-medium">Continue with Google</span>
        </button>
    );
};

export default GoogleLogin;
