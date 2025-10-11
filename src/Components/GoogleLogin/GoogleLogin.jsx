import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth/useAuth";
import useAlert from "../../hooks/useAlert/useAlert";
import { useLocation, useNavigate } from "react-router";

const GoogleLogin = () => {
    const { googleLogin } = useAuth();
    const showAlert = useAlert();
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleLogin()
            .then(res => {
                showAlert({
                    title: 'Login Successful!',
                    text: 'You have logged in with Google. Welcome to AutoFlet!',
                    icon: 'success',
                })
                navigate(location?.state || '/');
            })
            .catch(error => {
                showAlert({
                    title: 'Login Failed',
                    text: 'There was a problem logging in with Google. Please try again.',
                    icon: 'error',
                })
            })
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
