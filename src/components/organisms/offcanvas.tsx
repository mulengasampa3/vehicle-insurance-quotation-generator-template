import { useEffect, useRef } from "react";
import { OffCanvasTypes } from "../../types/uiComponents.types";
import { cn } from "../../utils/twmerge";

function OffCanvas({
    location = "right",
    className = "",
    isOffCanvasOpen = false,
    title = "Panel",
    closeOffCanvas,
    size = "default",
    scrollable = true,
    overlayOpacity = 50,
    animation = "",
    slideTransitionDuration = "duration-200",
    children
}: OffCanvasTypes) {
    const offCanvasRef = useRef<HTMLDivElement>(null);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isOffCanvasOpen &&
                offCanvasRef.current &&
                !offCanvasRef.current.contains(event.target as Node)
            ) {
                closeOffCanvas();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOffCanvasOpen, closeOffCanvas]);

    // Translate animation based on location
    const translateClass = {
        right: isOffCanvasOpen ? "translate-x-0" : "translate-x-full",
        left: isOffCanvasOpen ? "translate-x-0" : "-translate-x-full",
        top: isOffCanvasOpen ? "translate-y-0" : "-translate-y-full",
        bottom: isOffCanvasOpen ? "translate-y-0" : "translate-y-full",
    }[location];

    // Position class based on location
    const positionClass = {
        right: "top-0 right-0 h-full",
        left: "top-0 left-0 h-full",
        top: "top-0 left-0 w-full",
        bottom: "bottom-0 left-0 w-full",
    }[location];

    // Dynamic size class based on location and size
    const dynamicSizeClass = () => {
        switch (location) {
            case "right":
            case "left":
                // For left/right, 'size' primarily controls width
                return {
                    sm: "w-[250px]",
                    full: "w-screen",
                    "half-page": "w-1/2",
                    "quater-full": "w-1/4",
                    default: "w-[290px]",
                }[size];
            case "top":
            case "bottom":
                // For top/bottom, 'size' primarily controls height
                return {
                    sm: "h-[250px]",
                    full: "h-screen",
                    "half-page": "h-1/2",
                    "quater-full": "h-1/4",
                    default: "h-[290px]",
                }[size];
            default:
                return "w-[290px]"; // Fallback for width
        }
    };

    return (
        <>
            {/* Overlay */}
            {isOffCanvasOpen && (
                <div
                    className={cn( `right-0 fixed inset-y-[0px] inset-[0px] bg-black transition-opacity`, `opacity-${overlayOpacity}`)}
                    onClick={closeOffCanvas}
                >

                </div>
            )}

            {/* Offcanvas panel */}
            <div
                ref={offCanvasRef}
                className={cn(
                    `fixed ${positionClass} ${dynamicSizeClass()} z-50 bg-white dark:bg-[#222222] text-black dark:text-white shadow-lg transform transition-transform`,
                    translateClass,
                    scrollable ? "overflow-y-auto" : "",
                    animation,
                    slideTransitionDuration,
                    className
                )}
            >
                {/* OffCanvas Header */}
                <div className="flex justify-between items-center px-2 bg-[#1b4f3c] dark:bg-[#222222] py-1">
                    <h2 className="text-lg font-semibold uppercase text-white">{title}</h2>
                    <button
                        className="text-white w-[35px] h-[35px] flex items-center bg-transparent justify-center border-[2px] border-white rounded-[30%]"
                        onClick={closeOffCanvas}
                    >
                        <i className="bx bx-x text-2xl"></i>
                    </button>
                </div>

                {/* Canvas Body */}
                <div className="flex-1 flex flex-col">{children}</div>
            </div>
        </>
    );
}

export default OffCanvas;