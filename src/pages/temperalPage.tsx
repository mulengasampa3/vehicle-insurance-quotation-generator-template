import { Link } from "react-router-dom";
// Temporal Landing Page.tsx
// ==========React Specific Imports===========

// ==============My Imports==================
//1. Reusable Components

//2. Custom Hooks

//3. Types

//4. Stores and Api's

//5. Media and Assets
import CompanyLogo from '../media/icons/Logo-writing-white.png'
import CompanyIcon from '../media/icons/logo-white.png'

export default function TemperalLandingPage() {
    return (
        <div className="w-screen h-screen flex flex-col bg-[#222222] items-center justify-center">
            <nav className="h-14 w-full sm:px-[150px] px-2 flex items-center justify-between">
                <img src={CompanyLogo} alt="" className="h-16 hidden sm:block" />
                <img src={CompanyIcon} alt="" className="h-10 sm:hidden block" />
                <div className="space-x-2 flex items-center justify-center">
                    <Link to={'auth/login'} className="cursor-pointer px-4 py-2 h-full hover:scale-110 hover:text-green-500 text-sm sm:text-[16px] transition duration-200 text-white">Login</Link>
                    <Link to={'auth/register'} className="cursor-pointer px-4 py-2 h-full hover:scale-110 hover:text-green-500 text-sm sm:text-[16px] transition duration-200 text-white">Register</Link>
                </div>
            </nav>
            <div className="flex flex-col w-full items-center flex-1 justify-center">
                <span className="message text-white text-center">
                    This is a temperal landing page as this is a react template meant to demonstrate webflow. <br />
                    if a backend is implemented one is free to discard this page route from app.tsx <br />
                    HAPPY CODING!!!
                </span>
                <div className="container w-full flex flex-col max-w-[350px] p-2">
                    <div className="top-stuff w-full h-1/2 flex justify-center space-x-0 sm:space-x-6  flex-col sm:flex-row">
                        <Link to={'dashboard-app'} className="h-14 w-full no-underline bg-green-500 flex mb-2 items-center justify-center text-white text-sm rounded-md hover:scale-110 transition duration-300"> To Company Portal</Link>
                        <Link to={'client-app'} className="h-14 w-full no-underline bg-green-500 flex mb-2 items-center justify-center text-white text-sm rounded-md hover:scale-110 transition duration-300"> To User Portal</Link>
                    </div>
                </div>
            </div>
            <footer className="information w-full flex items-center justify-center h-[80px] space-x-3">
                <a href="https://github.com/mulengasampa3" className="text-white hover:scale-110 transition duration-200">
                    <i className="bi bi-github text-[25px] bg-black w-14 h-14 rounded-full flex items-center justify-center"></i>
                </a>
                <a href="https://www.linkedin.com/in/mulenga-sampa-271365221/" className="text-white hover:scale-110 transition duration-200">
                    <i className="bx bxl-linkedin text-[25px] bg-blue-500 w-14 h-14 rounded-full flex items-center justify-center "></i>
                </a>
                <a href="tel:+260778837581" className="text-white hover:scale-110 transition duration-200">
                    <i className="bx bxs-phone text-[25px] w-14 h-14 rounded-full bg-purple-500 flex items-center justify-center"></i>
                </a>
                <a href="mailto:mulengasampa3@gmail.com" className="text-white hover:scale-110 transition duration-200">
                    <i className="bx bxl-gmail text-[25px] w-14 h-14 rounded-full bg-red-500 flex items-center justify-center"></i>
                </a>
            </footer>
        </div>
    );
}