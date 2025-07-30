import { ModalPropTypes } from "../../types/uiComponents.types";
import { cn } from "../../utils/twmerge";

function Modal({
    open,
    title,
    children,
    size = "default",
    scrollable,
    animated = "sm:animate-fadeInUp animate-none",
    closeModal  }: ModalPropTypes) {
    const handleClose = () => {
        if (closeModal) {
            closeModal();
        }
    };

    return (
        // You can use this for form
        <div className={`modal ${open ? "flex" : "hidden"} fixed w-screen h-screen justify-center top-0 left-0 z-[10000000] items-center bg-black bg-opacity-50 backdrop-blur-lg`}>
            <div
                className={cn(
                    "modal-dialog bg-white rounded-lg  no-scrollbar",
                    {
                        "w-full max-w-sm": size === "sm",
                        "w-full max-w-[800px]": size === "lg",
                        "w-full max-w-[500px]": size === "default",
                        "w-full max-w-[1140px]": size === "xl",
                        "w-[95%] h-[95%] max-w-none": size === "fullscreen",
                        "w-full h-[550px] max-w-[800px]": size === "fixed"
                    }, animated 
                )}
            >
                {/* Modal header */}
                <div className="flex justify-between items-center px-2 bg-[#78ac64] rounded-t-lg py-1">
                    <h5 className="text-xl font-semibold text-white uppercase">{title || ""}</h5>
                    <button
                        title="close"
                        type="button"
                        className=" text-white w-[35px] h-[35px] flex items-center bg-transparent justify-center border-[2px] border-white rounded-[30%]"
                        onClick={() => handleClose()}
                    >
                        <i className="bx bx-x text-[30px]"></i>
                    </button>
                </div>

                {/* Modal body */}
                <div className={cn("dark:bg-[#222222] bg-[white] rounded-b-lg",
                    scrollable? "max-h-[80vh] overflow-y-auto" : "h-full",
                )}>
                    {children || null}
                </div>
            </div>
        </div>
    );
}

export default Modal;
