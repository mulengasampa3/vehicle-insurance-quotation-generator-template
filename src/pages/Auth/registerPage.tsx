import {useState} from "react";
import CompanyLogo from "../../media/icons/logo-white.png"; // Adjust the path as needed
import { Link } from "react-router-dom";

function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false); // For Password
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For Confirm Password
  
    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);
    return (
        <div className="screen-container min-h-screen flex items-center justify-center bg-[#222222]">  
            <form className="bg-auth-form-color border-[#4d4d4d] border shadow-lg flex flex-col shadow-[0 4px 30px rgba(25, 25, 25, 0.178)] backdrop-blur-[40px] overflow-auto hover:backdrop-blur-[20px] py-8 px-4 sm:px-10 rounded-lg w-[1000px] h-screen sm:h-auto register-form space-y-6">
                {/* Logo */}
                <div className="img-container w-full flex items-center h-[70px] justify-center">
                    <img src={CompanyLogo} alt="Company Logo" className="h-full w-full object-contain" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium  text-62" htmlFor="firstName">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            placeholder="Enter your first name"
                            className="mt-1 block w-full border bg-dc pl-4 h-[50px] rounded-[30px] text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-company-color-secondary"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-62" htmlFor="lastName">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            placeholder="Enter your last name"
                            className="mt-1 block w-full border bg-dc pl-4 h-[50px] rounded-[30px] text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-company-color-secondary"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-62" htmlFor="state">
                            Gender
                        </label>
                        <select
                            id="state"
                            className="custom-select bg-dc mt-1 block w-full p-2 border border-white h-[50px] rounded-[30px] text-slate-500 focus:outline-none focus:ring-2 focus:ring-company-color-secondary"
                            required
                        >
                            <option value="" disabled className="bg-[#626262]">Select Gender</option>
                            <option value="male" className="bg-[#626262]">Male</option>
                            <option value="female" className="bg-[#626262]">Female</option>
                            <option value="other" className="bg-[#626262]">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-62" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="mt-1 block w-full border bg-dc pl-4 h-[50px] rounded-[30px] text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-company-color-secondary"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <label className="block text-sm font-medium text-62" htmlFor="address">
                            Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            placeholder="Enter your password"
                            className="mt-1 block w-full border bg-dc pl-4 h-[50px] rounded-[30px] text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-company-color-secondary"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-[0px] bg-transparent top-[25%] flex items-center text-gray-400 hover:text-company-ring-company-color-secondary"
                        >
                            {showPassword ? (<i className="bi bi-eye-slash-fill"></i>) : (<i className="bi bi-eye-fill"></i>)}
                        </button>
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-62" htmlFor="city">
                            Comfirm Password
                        </label>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="comfirmPassword"
                            placeholder="Enter your password again"
                            className="mt-1 block w-full border bg-dc pl-4 h-[50px] rounded-[30px] text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-company-color-secondary"
                            required
                        />
                        <button
                            type="button"
                            onClick={toggleConfirmPasswordVisibility}
                            className="absolute inset-y-0 right-[0px] bg-transparent top-[25%] flex items-center text-gray-400 hover:text-company-ring-company-color-secondary"
                        >
                            {showConfirmPassword ? (<i className="bi bi-eye-slash-fill"></i>) : (<i className="bi bi-eye-fill"></i>)}
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="w-full flex flex-col items-center justify-center">
                    <button
                        type="submit"
                        className="w-40 bg-company-color-secondary hover:bg-indigo-500 text-[#fff] py-2 rounded-md transition duration-200"
                    >
                        Sign Up
                    </button>
                    <Link
                        to="../login"
                        className="text-sm text-white mt-[10px] hover:text-company-color-secondary transition duration-200"
                    >
                        Already have an account? Click here to login
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default RegisterForm;
