import { motion } from "framer-motion";
import { FaCarSide } from "react-icons/fa";

const Loading = () => {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-secondary text-white z-50">
            {/* Spinning Ring */}
            <motion.div
                className="w-24 h-24 border-4 border-primary border-t-transparent rounded-full mb-6"
                animate={{ rotate: 360 }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Animated Car Icon */}
            <motion.div
                animate={{
                    x: [0, 20, 0],
                }}
                transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <FaCarSide className="text-primary text-4xl mb-3" />
            </motion.div>

            {/* Text */}
            <motion.p
                className="text-lg tracking-wide text-gray-300"
                animate={{
                    opacity: [0.5, 1, 0.5],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                }}
            >
                Loading your drive...
            </motion.p>
        </div>
    );
};

export default Loading;
