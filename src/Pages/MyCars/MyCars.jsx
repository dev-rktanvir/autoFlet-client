import React from 'react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Link } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';
import useAuth from '../../hooks/useAuth/useAuth';

const MyCars = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const email = user?.email;

    const { data: cars = [], isLoading, isError } = useQuery({
        queryKey: ['myCars', email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-cars?email=${email}`);
            return res.data;
        },
        enabled: !!email,
    });

    if (isLoading) return <p className="text-center text-white">Loading...</p>;
    if (isError) return <p className="text-center text-red-500">Failed to load cars.</p>;

    // Show message if no cars found
    if (cars.length === 0) {
        return (
            <section className="bg-secondary py-20 px-4 min-h-screen mt-20 flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                    No cars added yet!
                </h2>
                <p className="text-gray-300 mb-6">Start by adding your first vehicle to get listed.</p>
                <Link
                    to="/add-car"
                    className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-80 transition"
                >
                    Add a Car
                </Link>
            </section>
        );
    }

    return (
        <section className="bg-secondary py-16 px-4 min-h-screen mt-10 md:mt-20">
            <div className="max-w-7xl mx-auto mb-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                    My <span className="text-primary">Cars</span>
                </h2>
                <p className="text-gray-100 mt-2">
                    All your listed vehicles at a glance.
                </p>
            </div>

            <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {cars.map((car) => (
                    <div
                        key={car.registrationNumber}
                        className="bg-[#1f1f2e] border border-primary rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
                    >
                        <img
                            src={car.image}
                            alt={car.carModel}
                            className="w-full h-48 object-cover"
                        />

                        <div className="p-5 text-white">
                            <h3 className="text-xl font-semibold mb-1">{car.carModel}</h3>
                            <p className="text-gray-300 mb-1">
                                <span className="font-medium">Price/Day:</span> ${car.rentalPrice}
                            </p>
                            <p className="text-gray-300 mb-1">
                                <span className="font-medium">Bookings:</span> {car.bookingCount}
                            </p>
                            <p className="text-gray-300 mb-1">
                                <span className="font-medium">Location:</span> {car.location}
                            </p>
                            <p className="text-gray-300 mb-1">
                                <span className="font-medium">Availability:</span>{' '}
                                <span
                                    className={
                                        car.availability === 'Available'
                                            ? 'text-green-400 font-semibold'
                                            : 'text-red-400 font-semibold'
                                    }
                                >
                                    {car.availability}
                                </span>
                            </p>
                            <p className="text-gray-300 mb-4">
                                <span className="font-medium">Date Added:</span>{' '}
                                {dayjs(car.created_at).format('MMM D, YYYY')}
                            </p>

                            <div className="flex justify-between">
                                <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition">
                                    Update
                                </button>
                                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MyCars;
