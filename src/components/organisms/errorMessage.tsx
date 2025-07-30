// Loader.tsx
import React from 'react';

interface LoaderProps {
    width?: string; // Tailwind class for width (e.g., "w-16")
    height?: string; // Tailwind class for height (e.g., "h-16")
    borderColor?: string; // Tailwind class for border color (e.g., "border-blue-500")
    bgColor?: string; // Background color for the loader container (e.g., "bg-gray-100")
    additionalClasses?: string; // Additional Tailwind classes
    ptagstyles?: string;
    errorText?: string; // Text to display below the loader
    iconStyles?: string;
}

const ErrorMessage: React.FC<LoaderProps> = ({
    width = "w-8",
    height = "h-8",
    bgColor = "bg-transparent",
    additionalClasses = "",
    errorText = "An error occured...",
    ptagstyles = "text-center text-[18px] text-company-color-primary",
    iconStyles = "text-red-500 text-[40px]",
}) => {
    return (
        <div className={`flex flex-col w-full items-center justify-center h-full ${bgColor} ${additionalClasses}`}>
            <div className={`mb-2 animate-jelloEffect rounded-full ${width} ${height}`}>
                <i className={`${iconStyles}`}></i>
            </div>
            <span className={`${ptagstyles} animate-jelloEffect`}>{errorText}</span>
        </div>
    );
};

export default ErrorMessage;
