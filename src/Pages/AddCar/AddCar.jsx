import { useForm } from "react-hook-form";
import useAlert from "../../hooks/useAlert/useAlert";
import useAuth from "../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import useHandleImg from "../../hooks/useHandleImg/useHandleImg";
import { useNavigate } from "react-router";

const AddCar = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const alert = useAlert();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const {
        handleImageChange,
        preview,
        uploadedUrl,
        loading,
        resetImage,
    } = useHandleImg();

    const onSubmit = async (data) => {
        if (!uploadedUrl) {
            alert({
                title: "Upload Required",
                text: "Please upload an image before submitting.",
                icon: "error",
            });
            return;
        }

        // Convert comma-separated features string to array
        const featuresArray = data.features
            ? data.features.split(",").map(f => f.trim()).filter(Boolean)
            : [];

        // Prepare newCar object
        const newCar = {
            ...data,
            features: featuresArray, // <-- updated to array
            image: uploadedUrl,
            owner_email: user.email,
            created_at: new Date().toISOString(),
        };

        // Save to DB
        const res = await axiosSecure.post('/all-cars', newCar);
        if (res.data.insertedId) {
            alert({
                title: "Car Added Successfully!",
                text: `${data.carModel} has been added to your collection.`,
                icon: "success",
            });
            reset();
            resetImage();
            navigate('/my-cars');
        }
    };


    return (
        <section className="mt-16 min-h-screen bg-secondary flex items-center justify-center py-16 px-6">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-8">
                <h2 className="text-3xl font-bold text-center text-secondary mb-6">
                    Add a New Car
                </h2>
                <p className="text-center text-gray-600 mb-8">
                    Fill out the details below to add a car to your rental inventory.
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {/* Car Model */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Car Model
                        </label>
                        <input
                            type="text"
                            {...register("carModel", { required: "Car model is required" })}
                            placeholder="e.g. Toyota Corolla"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        {errors.carModel && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.carModel.message}
                            </p>
                        )}
                    </div>

                    {/* Daily Rental Price */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Daily Rental Price ($)
                        </label>
                        <input
                            type="number"
                            {...register("rentalPrice", {
                                required: "Price is required",
                                min: { value: 1, message: "Minimum value is 1" },
                            })}
                            placeholder="e.g. 50"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        {errors.rentalPrice && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.rentalPrice.message}
                            </p>
                        )}
                    </div>

                    {/* Availability */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Availability
                        </label>
                        <select
                            {...register("availability", { required: "Availability required" })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="">Select...</option>
                            <option value="Available">Available</option>
                            <option value="Unavailable">Unavailable</option>
                        </select>
                        {errors.availability && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.availability.message}
                            </p>
                        )}
                    </div>

                    {/* Vehicle Registration Number */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Vehicle Registration Number
                        </label>
                        <input
                            type="text"
                            {...register("registrationNumber", {
                                required: "Registration number required",
                            })}
                            placeholder="e.g. DHA-12345"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        {errors.registrationNumber && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.registrationNumber.message}
                            </p>
                        )}
                    </div>

                    {/* Features */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Features
                        </label>
                        <input
                            type="text"
                            {...register("features")}
                            placeholder="e.g. GPS, AC, Bluetooth"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Location
                        </label>
                        <input
                            type="text"
                            {...register("location", { required: "Location is required" })}
                            placeholder="e.g. Dhaka, Bangladesh"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        {errors.location && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.location.message}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Description
                        </label>
                        <textarea
                            {...register("description")}
                            rows="3"
                            placeholder="Write a short description about the car..."
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        ></textarea>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Upload Car Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        {loading && (
                            <p className="text-blue-500 text-sm mt-1">Uploading image...</p>
                        )}
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="mt-2 w-full max-w-xs rounded-lg border"
                            />
                        )}
                        {!uploadedUrl && !loading && (
                            <p className="text-red-500 text-sm mt-1">Please upload an image</p>
                        )}
                    </div>

                    {/* Hidden Booking Count */}
                    <input type="hidden" {...register("bookingCount")} value={0} />

                    {/* Submit Button */}
                    <div className="md:col-span-2 flex justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-primary text-white cursor-pointer font-semibold px-8 py-3 rounded-lg hover:bg-primary/80 transition"
                        >
                            Add Car
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AddCar;
