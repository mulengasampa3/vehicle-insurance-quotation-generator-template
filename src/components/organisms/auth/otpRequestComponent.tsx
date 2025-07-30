import React, { ChangeEvent, useState } from "react";
import CompanyLogo from "../../../media/icons/logo-white.png"; // Adjust the path as needed

interface OtpRequestFormProps {
    onSubmit: (data: { method: string; value: string }) => void;  // Callback when form is submitted
    loading: boolean;  // Loading state passed as prop
    title: string;  // Custom title (e.g., "Request a Password Reset")
    otpMethods: string[];  // OTP methods available (e.g., ["phone", "email"])
    defaultMethod?: string;  // Default OTP method to be preselected
}

const OtpRequestForm: React.FC<OtpRequestFormProps> = ({
    onSubmit,
    loading,
    title,
    otpMethods,
    defaultMethod = "phone",
}) => {
    const [selectedOption, setSelectedOption] = useState<string>(defaultMethod);
    const [inputValue, setInputValue] = useState<string>("");

    // Handle phone input formatting
    const handlePhoneInput = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target;
        if (!input.value.startsWith("+260")) {
            input.value = "+260" + input.value.replace(/^\+?\d{0,3}/, "");
        }
        input.value = "+260" + input.value.slice(4).replace(/\D/g, "");
        setInputValue(input.value);
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue && selectedOption) {
            onSubmit({ method: selectedOption, value: inputValue });
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-auth-form-color flex flex-col shadow-[0 4px 30px rgba(25, 25, 25, 0.178)] backdrop-blur-[40px] hover:backdrop-blur-[20px] sm:px-10 px-5 sm:py-6 py-24 justify-start shadow-md w-full sm:w-[500px] sm:h-full h-screen client-login-form space-y-6"
        >
            {/* Logo */}
            <div className="img-container w-full h-[100px] flex items-center justify-center">
                <img src={CompanyLogo} alt="Company Logo" className="h-full w-full object-contain" />
            </div>

            {/* Title */}
            <div className="text-center text-white flex items-center justify-center space-x-2">
                {title}
            </div>

            {/* Buttons to choose OTP method */}
            <div className="flex justify-center space-x-4">
                {otpMethods.map((method) => (
                    <button
                        key={method}
                        type="button"
                        onClick={() => setSelectedOption(method)}
                        className={`w-40 py-2 rounded-md transition duration-200 ${
                            selectedOption === method ? "bg-company-color-primary text-white" : "bg-[#626262] text-white"
                        }`}
                    >
                        {method === "phone" ? "Send by Phone" : "Send by Email"}
                        <i className={`ml-2 ${method === "phone" ? "bi-phone-fill" : "bi-envelope-at-fill"}`}></i>
                    </button>
                ))}
            </div>

            {/* Loading spinner */}
            {loading && (
                <div className="text-center text-white flex items-center justify-center space-x-2">
                    <div className="spinner-border animate-spin inline-block w-6 h-6 border-4 border-t-transparent border-white rounded-full"></div>
                    <p>Loading...</p>
                </div>
            )}

            {/* Conditional input fields */}
            {selectedOption === "phone" && !loading && (
                <div>
                    <label className="block text-sm font-medium text-white" htmlFor="phoneNumber">
                        Phone Numbers:
                    </label>
                    <input
                        type="text"
                        id="phoneNumber"
                        placeholder="+260..."
                        className="mt-1 block w-full p-2 border border-white pl-4 h-[50px] rounded-[30px] bg-transparent text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-company-color-primary"
                        required
                        defaultValue="+260"
                        onInput={handlePhoneInput}
                    />
                </div>
            )}

            {selectedOption === "email" && !loading && (
                <div>
                    <label className="block text-sm font-medium text-white" htmlFor="email">
                        Email Address:
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email..."
                        className="mt-1 block w-full p-2 border border-white pl-4 h-[50px] rounded-[30px] bg-transparent text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-company-color-primary"
                        required
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </div>
            )}

            {/* Submit Button */}
            <div className="w-full flex flex-col items-center justify-center">
                <button
                    type="submit"
                    className="w-40 bg-company-color-primary hover:bg-[#626262] text-[#fff] py-2 rounded-md transition duration-200"
                    disabled={loading}
                >
                    Send OTP
                </button>
            </div>
        </form>
    );
};

export default OtpRequestForm;