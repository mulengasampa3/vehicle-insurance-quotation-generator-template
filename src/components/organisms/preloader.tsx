// Loader.tsx
import React from 'react';
import { LoaderProps } from '../../types/uiComponents.types'; // Adjust the import path as necessary

const Loader: React.FC<LoaderProps> = ({
    bgColor = "bg-transparent",
    additionalClasses = "",
}) => {
    return (
        <div className={`flex flex-col w-full items-center justify-center h-full ${bgColor} ${additionalClasses}`}>
            <div className="loader-box absolute w-[50px] h-[50px] border-4 border-[#c18df1] border-b-gray-300 border-t-gray-300 rounded-full animate-spin"></div> 
            
            {/* The inner white pulsating circle */}
            <div className="white-loader absolute w-[40px] h-[40px] border-4 border-blue-500 border-b-white border-t-white rounded-full animate-leftToRight"></div> 
            
            {/* The innermost green spinning circle */}
            <div className="green-spin absolute w-[30px] h-[30px] border-4 border-green-500 border-b-transparent border-t-transparent rounded-full animate-spin-reverse"></div>
        </div>
    );
};

export default Loader;
