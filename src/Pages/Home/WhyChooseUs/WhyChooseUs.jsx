import { FaCarSide, FaDollarSign, FaHeadset } from "react-icons/fa";
import { MdTouchApp } from "react-icons/md";

const WhyChooseUs = () => {
    const features = [
        {
            icon: <FaCarSide />,
            title: "Wide Variety of Cars",
            desc: "From budget-friendly options to luxury vehicles.",
        },
        {
            icon: <FaDollarSign />,
            title: "Affordable Prices",
            desc: "Competitive daily rates you can count on.",
        },
        {
            icon: <MdTouchApp />,
            title: "Easy Booking Process",
            desc: "Seamlessly book your ride in just a few clicks.",
        },
        {
            icon: <FaHeadset />,
            title: "Customer Support",
            desc: "24/7 assistance for all your queries.",
        },
    ];

    return (
        <section className="bg-secondary py-16 px-4">
            <div className="max-w-7xl mx-auto text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                    Why Choose <span className="text-primary">Us</span>
                </h2>
                <p className="text-gray-100 mt-2">
                    We go the extra mile to make your car rental experience smooth and stress-free.
                </p>
            </div>

            <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
                {features.map((item, index) => (
                    <div
                        key={index}
                        className="group border border-primary rounded-2xl shadow-md p-8 hover:shadow-xl transition duration-300 bg-secondary hover:bg-primary cursor-pointer"
                    >
                        <div className="flex justify-center text-4xl text-primary mb-4 group-hover:text-white transition">
                            {item.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                            {item.title}
                        </h3>
                        <p className="text-gray-100">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhyChooseUs;
