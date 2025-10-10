import { Link } from "react-router";

const Banner = () => {
    return (
        <section
            className="relative w-full min-h-screen bg-fixed bg-center bg-cover flex items-center justify-center"
            style={{
                backgroundImage: `url('/banner1.jpg')`,
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content */}
            <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-2xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg leading-tight">
                    Your Next Car Awaits You.
                </h1>

                <Link
                    to="/cars"
                    className="inline-block text-white border border-primary px-5 sm:px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-[#1ecb1580] hover:bg-[#18b611] transition"
                >
                    View Available Cars
                </Link>
            </div>
        </section>
    );
};

export default Banner;
