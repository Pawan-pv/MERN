import { useEffect } from "react";

type ToastProps = {
    message: string;
    type: "SUCCESS" | "ERROR";
    onClose: () => void; // Added onClose to ToastProps
};

const Toast = ({ message, type, onClose }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);
        return () => {
            clearTimeout(timer);
        };
    }, [onClose]);

    const styles =
        type === "SUCCESS"
            ? "fixed top-4 z-50 rounded-md bg-green-600 text-white max-w-md p-4"
            : "fixed top-4 z-50 rounded-md bg-red-600 text-white max-w-md p-4"; // Adjusted to use bg-red-600 for ERROR

    return (
        <div className={styles}> {/* Corrected className usage */}
            <div className="flex justify-center items-center"> {/* Corrected "iteam" to "items" */}
                <span className="text-lg font-semibold">
                    {message}
                </span>
            </div>
        </div>
    );
};

export default Toast;
