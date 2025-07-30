// Loader.tsx
import React from 'react';
import CompanyLogo from "../../media/icons/logo-white.png"; // Adjust the path as needed

interface LoaderProps {
    width?: string; // Tailwind class for width (e.g., "w-16")
    height?: string; // Tailwind class for height (e.g., "h-16")
    borderColor?: string; // Tailwind class for border color (e.g., "border-blue-500")
    bgColor?: string; // Background color for the loader container (e.g., "bg-gray-100")
    additionalClasses?: string; // Additional Tailwind classes
    ptagstyles?: string;
    preloaderText?: string; // Text to display below the loader
}

const Loader: React.FC<LoaderProps> = ({
    width = "w-8",
    height = "h-8",
    borderColor = "border-blue-500",
    bgColor = "bg-transparent",
    additionalClasses = "",
    preloaderText = "Loading...",
    ptagstyles = "text-center text-[18px] text-company-color-primary",
}) => {
    return (
        <div className={`flex flex-col w-full items-center justify-center h-full ${bgColor} ${additionalClasses}`}>
            <div className={`animate-rotascaling mb-2 rounded-full ${width} ${height} ${borderColor}`}>
                <img src={CompanyLogo} alt="" className="logo w-full h-full object-contain" />
            </div>
            <p className={`${ptagstyles}`}>{preloaderText}</p>
        </div>
    );
};

export default Loader;
