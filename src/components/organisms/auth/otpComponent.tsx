import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import CompanyLogo from "../../../media/icons/logo-white.png"; // Adjust the path as needed

interface OTPPageProps {
    heading: string; // Heading text
    subheading?: string; // Optional subheading
    onSubmit: (otp: string) => void; // Callback when OTP is submitted
    backLink: string; // Link to go back
    backLinkText: string; // Text for the back link
    otpLength?: number; // Default is 6
}

const OTPPage: React.FC<OTPPageProps> = ({
    heading,
    subheading,
    onSubmit,
    backLink,
    backLinkText,
    otpLength = 6, // Default OTP length is 6
}) => {
    const [otpValues, setOtpValues] = useState<string[]>(Array(otpLength).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Handle OTP input change
    const handleInputChange = (index: number, value: string) => {
        if (/^\d$/.test(value) || value === "") {
            const newOtpValues = [...otpValues];
            newOtpValues[index] = value;
            setOtpValues(newOtpValues);

            // Move to the next input if a digit is entered
            if (value !== "" && index < otpLength - 1) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    // Handle backspace to move to the previous input
    const handleBackspace = (index: number) => {
        if (otpValues[index] === "" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const otp = otpValues.join(""); // Combine OTP digits into a string
        if (otp.length === otpLength) {
            onSubmit(otp);
        } else {
            alert("Please complete the OTP.");
        }
    };

    return (
        <div className="screen-container min-h-screen flex items-start sm:items-center justify-center bg-custom-gradient">
            <form
                onSubmit={handleSubmit}
                className="otp-form bg-auth-form-color flex flex-col items-center shadow-[0 4px 30px rgba(25, 25, 25, 0.178)] backdrop-blur-[40px] hover:backdrop-blur-[20px] sm:py-8 py-24 px-4 sm:px-10 w-full sm:w-[500px] sm:h-full h-screen space-y-6"
            >
                <div className="img-container w-full h-[100px] flex items-center justify-center">
                    <img src={CompanyLogo} alt="Company Logo" className="h-full w-full object-contain" />
                </div>
                <h2 className="text-center text-white text-[1rem] font-medium mb-2">{heading}</h2>
                {subheading && (
                    <p className="text-center text-white text-sm mb-4">{subheading}</p>
                )}
                <div className="flex justify-center space-x-2">
                    {otpValues.map((value, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={value}
                            ref={(el) => (inputRefs.current[index] = el)}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onKeyDown={(e) => e.key === "Backspace" && handleBackspace(index)}
                            className="w-[40px] h-[40px] sm:w-[55px] sm:h-[55px] text-center text-white bg-transparent border border-white rounded-[30px] focus:outline-none focus:ring-2 focus:ring-company-color-primary text-xl"
                        />
                    ))}
                </div>

                <button
                    type="submit"
                    className="mt-6 w-40 bg-company-color-primary hover:bg-[#626262] text-white py-2 rounded-md transition duration-200"
                >
                    Verify OTP
                </button>

                <Link
                    to={backLink}
                    className="block text-center text-sm text-white mt-4 hover:text-company-color-primary transition duration-200"
                >
                    {backLinkText}
                </Link>
            </form>
        </div>
    );
};

export default OTPPage;
