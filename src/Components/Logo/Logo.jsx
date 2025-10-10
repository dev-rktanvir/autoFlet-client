import { Link } from "react-router";

const Logo = () => {
    return (
        <Link to="/" className="flex items-center gap-2">
            <img
                src="/super-car.png"
                alt="AutoFlet Logo"
                className="w-16 h-16 object-contain"
            />
            <span className="text-xl font-bold text-white">AutoFlet</span>
        </Link>
    );
};

export default Logo;
