import React, { useEffect, useState } from "react";

interface ToastProps {
    open: boolean;
    type: "success" | "error" | "warning" | "notification" | "mail";
    title?: string;
    message: string;
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    duration?: number;
    animation?: "fade" | "slide-up" | "slide-left" | "zoom";
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
    open,
    type,
    title,
    message,
    position = "bottom-right",
    duration = 3000,
    animation = "fade",
    onClose,
}) => {
    const [progress, setProgress] = useState(100); // Start at 100%

    useEffect(() => {
        if (open) {
            const interval = setInterval(() => {
                setProgress((prev) => Math.max(prev - 100 / (duration / 100), 0)); // Decrease progress
            }, 100);

            const timer = setTimeout(() => {
                onClose();
                clearInterval(interval);
            }, duration);

            return () => {
                clearInterval(interval);
                clearTimeout(timer);
            };
        } else {
            setProgress(100); // Reset to 100% when toast is reopened
        }
    }, [open, duration, onClose]);

    const typeStyles = {
        success: { border: "border-green-500", bgOuter: "bg-green-200", bgMiddle: "bg-green-400", textColor: "text-green-500", icon: "bx bx-check" },
        error: { border: "border-red-500", bgOuter: "bg-red-200", bgMiddle: "bg-red-400", textColor: "text-red-500", icon: "bx bx-x" },
        warning: { border: "border-orange-500", bgOuter: "bg-orange-200", bgMiddle: "bg-orange-400", textColor: "text-orange-500", icon: "bi bi-exclamation" },
        notification: { border: "border-blue-500", bgOuter: "bg-blue-200", bgMiddle: "bg-white", textColor: "text-frontier-light-blue", icon: "bx bx-bell" },
        mail: { border: "border-green-500", bgOuter: "bg-green-200", bgMiddle: "bg-white", textColor: "text-green-500", icon: "bx bx-envelope" },
    };

    const positionStyles = {
        "top-left": "top-5 left-5",
        "top-right": "top-5 right-5",
        "bottom-left": "bottom-5 left-5",
        "bottom-right": "bottom-5 right-5",
    };

    const animationStyles = {
        fade: open ? "opacity-100 scale-100" : "opacity-0 scale-95",
        "slide-up": open ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
        "slide-left": open ? "translate-x-0 opacity-100" : "-translate-x-5 opacity-0",
        zoom: open ? "scale-100 opacity-100" : "scale-75 opacity-0",
    };

    const { border, bgOuter, bgMiddle, textColor, icon } = typeStyles[type];
    const positionClass = positionStyles[position];
    const animationClass = animationStyles[animation];

    return (
        <div
            className={`fixed ${positionClass} flex flex-col items-center justify-between p-2 bg-white dark:bg-[#222222] rounded-xl ${border} border shadow z-10 transition-all duration-300 ${animationClass} pointer-events-${open ? "auto" : "none"}`}
        >
            <div className="flex">
                <div className="circle-message-pair flex items-center">
                    {/* Icon circle */}
                    <div className="concentric-circles relative min-w-[50px] h-[50px] text-[30px] mr-2 rounded-full flex items-center justify-center">
                        <div className={`inner-circle-1 absolute inset-0 rounded-full ${bgOuter}`}></div>
                        <div className={`inner-circle-2 absolute inset-[6px] rounded-full ${bgMiddle}`}></div>
                        <div className={`inner-circle-3 absolute inset-[12px] flex items-center justify-center rounded-full bg-white ${textColor}`}>
                            <i className={icon}></i>
                        </div>
                    </div>

                    {/* Message */}
                    <div className="message text-[15px] flex flex-col">
                        <span className={`message-title font-extrabold text-[19px] leading-5 ${textColor}`}>{title}</span>
                        <span className="message-body font-extralight dark:text-white">{message}</span>
                    </div>
                </div>

                <div className="cancel-btn h-full py-1 pr-1 items-center">
                    <button
                        onClick={onClose}
                        className="w-[25px] h-[25px] bg-[#dcdcdc] flex items-center justify-center rounded-full text-[#626262] text-[22px]"
                    >
                        <i className="bx bx-x"></i>
                    </button>
                </div>
            </div>

            {open && (
                <div className="progress-bar-container w-full h-[4px] mt-2 bg-gray-300 rounded-full">
                    <div
                        className="progress-bar h-full bg-green-500 rounded-full"
                        style={{ width: `${progress}%`, transition: "width 0.1s ease-out" }}
                    ></div>
                </div>
            )}
        </div>
    );
};

export default Toast;