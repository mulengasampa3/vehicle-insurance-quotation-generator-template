import {useState} from "react";
import CompanyLogo from "../../media/icons/logo-white.png"; // Adjust the path as needed
import { Link } from "react-router-dom";

function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle the visibility
    };
    
    return (
        <div className="screen-container min-h-screen flex items-center justify-center bg-[#222222]">
            <form className="bg-auth-form-color rounded-lg flex flex-col shadow-[0 4px 30px rgba(25, 25, 25, 0.178)] backdrop-blur-[40px] hover:backdrop-blur-[20px] py-8 px-4 sm:px-10 h-screen sm:h-[590px] w-screen sm:w-[500px] justify-center rounded-lg sm:rounded-none shadow-md login-form space-y-6">
                {/* Logo */}
                <div className="img-container rounded-lg w-full flex items-center h-[70px] justify-center">
                    <img src={CompanyLogo} alt="Company Logo" className="h-full w-full object-contain" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-white" htmlFor="firstName">
                            Email:
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            placeholder="Enter your first name"
                            className="mt-1 block w-full p-2 border border-white  pl-4 h-[50px] rounded-[30px] bg-transparent text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-company-color-secondary"
                            required
                        />
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-white" htmlFor="lastName">
                            Password:
                        </label> 

                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            placeholder="Enter your password"
                            className="mt-1 block w-full p-2 border border-white pl-4 h-[50px] rounded-[30px] bg-transparent text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-company-color-secondary"
                            required
                        />

                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-[0px] bg-transparent top-[25%] flex items-center text-gray-400 hover:text-gray-700"
                        >
                            {showPassword ? (<i className="bi bi-eye-slash-fill"></i>) : (<i className="bi bi-eye-fill"></i>)}
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="w-full flex flex-col items-center justify-center">
                    <button
                        type="submit"
                        className="w-40 bg-green-700 hover:bg-[#626262] text-[#fff] py-2 rounded-md transition duration-200"
                    >
                        Login
                    </button>
                    <Link
                        to="/auth/register"
                        className="text-sm text-white mt-[10px] hover:text-company-color-secondary transition duration-200"
                    >
                        Don't have an account? Click here to sign up
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
