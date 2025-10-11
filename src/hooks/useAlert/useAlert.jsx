import Swal from "sweetalert2";

const PRIMARY_COLOR = "#1ecb15";
const SECONDARY_COLOR = "#121212";

const useAlert = () => {
    const showAlert = ({
        title = "Success!",
        text = "Operation completed successfully.",
        icon = "success",
        timer = 1500,
    }) => {
        Swal.fire({
            title,
            text,
            icon,
            background: "#ffffff",       // white background
            color: SECONDARY_COLOR,      // text color
            timer,
            showConfirmButton: false,    // no confirm button
            customClass: {
                title: "swal2-title-primary",
            },
            didOpen: () => {
                const titleEl = document.querySelector(".swal2-title-primary");
                if (titleEl) {
                    titleEl.style.color = PRIMARY_COLOR;
                    titleEl.style.fontWeight = "700";  // bold
                }
            },
        });
    };

    return showAlert;
};

export default useAlert;
