import { Link } from "react-router";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Logo from "../Logo/Logo";

const Footer = () => {
    return (
        <footer className="bg-secondary text-white mt-10">
            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                {/* Left - Logo */}
                <div className="flex flex-col items-center md:items-start">
                    <Logo />
                    <p className="text-sm text-gray-400 mt-2">
                        Drive your dream — rent smart, ride easy.
                    </p>
                </div>

                {/* Middle - Social Links */}
                <div className="flex justify-center gap-6 text-primary text-2xl">
                    <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebook className="hover:scale-110 transition-transform duration-200" />
                    </Link>
                    <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="hover:scale-110 transition-transform duration-200" />
                    </Link>
                    <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="hover:scale-110 transition-transform duration-200" />
                    </Link>
                    <Link to="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="hover:scale-110 transition-transform duration-200" />
                    </Link>
                </div>

                {/* Right - Copyright */}
                <div className="text-center md:text-right text-gray-400 text-sm">
                    <p>© {new Date().getFullYear()} <span className="text-primary font-semibold">AutoFlet</span>. All rights reserved.</p>
                    <p className="mt-1">Developed by <span className="text-primary font-medium">Rk Tanvir</span></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
