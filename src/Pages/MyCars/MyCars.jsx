import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';
import useAuth from '../../hooks/useAuth/useAuth';
import useAlert from '../../hooks/useAlert/useAlert';

const PRIMARY_COLOR = "#1ecb15";
const SECONDARY_COLOR = "#121212";

const MyCars = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const email = user?.email;
    const alert = useAlert();
    const queryClient = useQueryClient();

    // Fetch user's cars
    const { data: cars = [], isLoading, isError } = useQuery({
        queryKey: ['myCars', email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-cars?email=${email}`);
            return res.data;
        },
        enabled: !!email,
    });

    // Delete car mutation
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/delete-cars/${id}`);
            return res.data;
        },
        onSuccess: () => {
            alert({
                title: 'Deleted!',
                text: 'Your car has been deleted.',
                icon: 'success'
            });
            queryClient.invalidateQueries(['myCars']);
        },
        onError: () => {
            alert({
                title: 'Error!',
                text: 'Failed to delete the car. Try again.',
                icon: 'error'
            });
        }
    });

    // Handle delete click with SweetAlert2 confirm
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This car will be permanently deleted.',
            icon: 'warning',
            background: '#ffffff',
            color: SECONDARY_COLOR,
            showCancelButton: true,
            confirmButtonColor: PRIMARY_COLOR,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            customClass: {
                title: 'swal2-title-primary',
            },
            didOpen: () => {
                const titleEl = document.querySelector(".swal2-title-primary");
                if (titleEl) {
                    titleEl.style.color = PRIMARY_COLOR;
                    titleEl.style.fontWeight = "700";
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id);
            }
        });
    };

    // UI states
    if (isLoading) return <p className="text-center text-white">Loading...</p>;
    if (isError) return <p className="text-center text-red-500">Failed to load cars.</p>;

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
                        key={car._id}
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
                                <Link to={`/update-car/${car._id}`}>
                                    <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition cursor-pointer">
                                        Update
                                    </button>
                                </Link>
                                <button
                                    onClick={() => handleDelete(car._id)}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition cursor-pointer"
                                >
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
