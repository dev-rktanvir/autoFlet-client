import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';
import useAlert from '../../hooks/useAlert/useAlert';
import useHandleImg from '../../hooks/useHandleImg/useHandleImg';

const UpdateCar = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const alert = useAlert();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        handleImageChange,
        preview,
        uploadedUrl,
        loading: imgUploading,
        resetImage
    } = useHandleImg();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            carModel: '',
            rentalPrice: '',
            availability: '',
            registrationNumber: '',
            features: '',
            location: '',
            description: '',
            imageLink: '',
            bookingCount: 0
        }
    });

    // Fetch car data
    const { data: car, isLoading } = useQuery({
        queryKey: ['car', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-cars/${id}`);
            return res.data;
        }
    });

    // Reset form values when car data is available
    useEffect(() => {
        if (car) {
            reset({
                carModel: car.carModel,
                rentalPrice: car.rentalPrice,
                availability: car.availability,
                registrationNumber: car.registrationNumber,
                features: car.features?.join(', '),
                location: car.location,
                description: car.description,
                imageLink: car.image,
                bookingCount: car.bookingCount || 0
            });
        }
    }, [car, reset]);

    // Handle form submit
    const mutation = useMutation({
        mutationFn: async (updatedCar) => {
            return await axiosSecure.patch(`/update-car/${id}`, updatedCar);
        },
        onSuccess: () => {
            alert({
                title: 'Car Updated Successfully',
                text: 'Changes saved successfully.',
                icon: 'success'
            });
            queryClient.invalidateQueries(['myCars']);
            navigate('/my-cars');
        },
        onError: () => {
            alert({
                title: 'Update Failed',
                text: 'Something went wrong. Please try again.',
                icon: 'error'
            });
        }
    });

    const onSubmit = (data) => {
        const featuresArray = data.features
            ? data.features.split(',').map(f => f.trim()).filter(Boolean)
            : [];

        const finalImage = uploadedUrl || data.imageLink;

        if (!finalImage) {
            alert({
                title: 'Image Required',
                text: 'Please upload an image or provide a link.',
                icon: 'error'
            });
            return;
        }

        const updatedCar = {
            ...data,
            features: featuresArray,
            image: finalImage,
            updated_at: new Date().toISOString()
        };

        mutation.mutate(updatedCar);
    };

    if (isLoading) {
        return <p className="text-center text-white mt-20">Loading car info...</p>;
    }

    return (
        <section className="mt-16 min-h-screen bg-secondary flex items-center justify-center py-16 px-6">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-8">
                <h2 className="text-3xl font-bold text-center text-secondary mb-6">
                    Update Car
                </h2>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {/* Car Model */}
                    <div>
                        <label className="block font-medium mb-2">Car Model</label>
                        <input
                            type="text"
                            {...register('carModel', { required: 'Car model is required' })}
                            className="w-full border px-4 py-2 rounded-lg"
                        />
                        {errors.carModel && <p className="text-red-500">{errors.carModel.message}</p>}
                    </div>

                    {/* Rental Price */}
                    <div>
                        <label className="block font-medium mb-2">Rental Price ($)</label>
                        <input
                            type="number"
                            {...register('rentalPrice', {
                                required: 'Price required',
                                min: { value: 1, message: 'Minimum $1' }
                            })}
                            className="w-full border px-4 py-2 rounded-lg"
                        />
                        {errors.rentalPrice && <p className="text-red-500">{errors.rentalPrice.message}</p>}
                    </div>

                    {/* Availability */}
                    <div>
                        <label className="block font-medium mb-2">Availability</label>
                        <select
                            {...register('availability', { required: 'Required' })}
                            className="w-full border px-4 py-2 rounded-lg"
                        >
                            <option value="">Select...</option>
                            <option value="Available">Available</option>
                            <option value="Unavailable">Unavailable</option>
                        </select>
                        {errors.availability && <p className="text-red-500">{errors.availability.message}</p>}
                    </div>

                    {/* Registration Number */}
                    <div>
                        <label className="block font-medium mb-2">Registration Number</label>
                        <input
                            type="text"
                            {...register('registrationNumber', { required: 'Required' })}
                            className="w-full border px-4 py-2 rounded-lg"
                        />
                    </div>

                    {/* Features */}
                    <div>
                        <label className="block font-medium mb-2">Features (comma separated)</label>
                        <input
                            type="text"
                            {...register('features')}
                            className="w-full border px-4 py-2 rounded-lg"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block font-medium mb-2">Location</label>
                        <input
                            type="text"
                            {...register('location', { required: 'Location required' })}
                            className="w-full border px-4 py-2 rounded-lg"
                        />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="block font-medium mb-2">Description</label>
                        <textarea
                            rows={3}
                            {...register('description')}
                            className="w-full border px-4 py-2 rounded-lg"
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block font-medium mb-2">Upload New Image (optional)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full border px-4 py-2 rounded-lg"
                        />
                        {imgUploading && <p className="text-blue-500 text-sm mt-1">Uploading image...</p>}
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="mt-2 w-full max-w-xs rounded-lg border"
                            />
                        )}
                        {!preview && car?.image && (
                            <div className="mt-2">
                                <p className="text-gray-600 mb-1">Current Image:</p>
                                <img
                                    src={car.image}
                                    alt="Current"
                                    className="w-full max-w-xs rounded-lg border"
                                />
                            </div>
                        )}
                    </div>

                    {/* OR image link */}
                    <div>
                        <label className="block font-medium mb-2">Image Link</label>
                        <input
                            type="text"
                            {...register('imageLink')}
                            className="w-full border px-4 py-2 rounded-lg"
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    {/* Hidden bookingCount */}
                    <input type="hidden" {...register('bookingCount')} />

                    {/* Submit */}
                    <div className="md:col-span-2 flex justify-center mt-6">
                        <button
                            type="submit"
                            disabled={mutation.isLoading}
                            className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/80 transition"
                        >
                            {mutation.isLoading ? 'Updating...' : 'Update Car'}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default UpdateCar;
