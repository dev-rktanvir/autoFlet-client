import { Link } from "react-router";

const ErrorPage = () => {
    return (
        <section
            className="relative w-full h-screen bg-cover bg-center flex items-center justify-center text-white"
            style={{
                backgroundImage:
                    "url('/error.jpg')",
            }}
        >
            {/* Overlay for better readability */}
            <div className="absolute inset-0 bg-secondary/10"></div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6">
                {/* Left Column */}
                <div className="flex flex-col justify-center text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Something's missing.
                    </h1>
                    <p className="text-gray-300 mb-6 text-lg">
                        Looks like this page is missing. Don't worry though, our best team is
                        on the case.
                    </p>
                    <Link
                        to="/"
                    >
                        <button className="bg-primary text-white font-semibold px-12 py-3 rounded-lg hover:bg-primary/80 transition cursor-pointer">Go Home</button>
                    </Link>
                </div>

                {/* Right Column */}
                <div className="flex flex-col justify-center items-center">
                    <h2 className="text-9xl font-extrabold text-white drop-shadow-lg">
                        404
                    </h2>
                    <p className="text-2xl font-semibold mt-2">Not Found</p>
                </div>
            </div>
        </section>
    );
};

export default ErrorPage;
