import { Link } from "react-router";
import { useEffect, useState } from "react";
import Logo from "../Logo/Logo";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [lastScrollTop, setLastScrollTop] = useState(0);

    const handleAuthToggle = () => setIsLoggedIn(!isLoggedIn);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;

            // Show background if scrolled more than 50px
            setScrolled(currentScroll > 50);

            // Hide navbar when scrolling down, show when scrolling up
            if (currentScroll > lastScrollTop && currentScroll > 100) {
                setHidden(true);
            } else {
                setHidden(false);
            }

            setLastScrollTop(currentScroll <= 0 ? 0 : currentScroll);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollTop]);

    const navItems = isLoggedIn
        ? [
              { name: "Home", path: "/" },
              { name: "Available Cars", path: "/cars" },
              { name: "Add Car", path: "/add-car" },
              { name: "My Cars", path: "/my-cars" },
              { name: "My Bookings", path: "/bookings" },
          ]
        : [
              { name: "Home", path: "/" },
              { name: "Available Cars", path: "/cars" },
          ];

    return (
        <nav
            className={`
                fixed top-0 left-0 w-full z-50 transition-all duration-300
                ${scrolled ? "bg-secondary/80 shadow-md" : "bg-transparent"}
                ${hidden ? "-translate-y-full" : "translate-y-0"}
                text-white
            `}
        >
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <Logo />

                <ul className="hidden md:flex gap-6">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className="hover:text-primary transition-colors duration-200"
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div>
                    {isLoggedIn ? (
                        <button
                            onClick={handleAuthToggle}
                            className="bg-primary text-white px-8 py-2 rounded-lg hover:opacity-90 transition cursor-pointer"
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            onClick={handleAuthToggle}
                            className="bg-primary text-white px-8 py-2 rounded-lg hover:opacity-90 transition cursor-pointer"
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
