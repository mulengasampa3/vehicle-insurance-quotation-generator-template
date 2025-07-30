import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import CompanyLogo from "../../../media/icons/Logo-writing-black.png"; // Adjust the path as needed
import topBarMenuOptions from '../../../data/topBarMenuOptions.json';
import ConfirmationModal from '../../../components/organisms/comfirmationModal';

const Topbar: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = () => {
        console.log("Logging out..."); // Replace with actual logout logic
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="topbar w-full z-40 bg-white shadow-[0_-10px_25px_rgba(0,0,0,0.1)] sm:h-[60px] h-[47.5px] flex lg:px-[10rem] sm:px-[1.25rem] px-0 items-center justify-between">
                <div className="company-logo h-[50px] w-auto hidden sm:block">
                    <img src={CompanyLogo} alt="Company Logo" className="w-full h-full object-contain" />
                </div>
                <div className="menu-options w-full sm:w-auto h-full flex bg-[#fff]">
                    {topBarMenuOptions.map((option, index) => (
                        <NavLink
                            key={index}
                            to={option.path}
                            className={({ isActive }) =>
                                `sm:w-auto w-[calc(100%/3)] ${isActive ? 'bg-company-color-secondary text-white ' : ''} px-4 h-auto flex flex-col text-[0.61rem] sm:text-[0.85rem] sm:flex-row items-center justify-center`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <i
                                        className={`bi ${option.icon} mr-2 ${isActive ? 'bg-company-color-secondary text-white' : ''} font-extrabold text-[22px] leading-4 block sm:hidden`}
                                    ></i>
                                    <span className={`sm:block ${isActive ? 'bg-company-color-secondary text-white' : ''}`}>
                                        {option.title}
                                    </span>
                                </>
                            )}
                        </NavLink>
                    ))}
                    {/* Logout Button */}
                    <button
                        className="sm:w-auto w-[calc(100%/3)] px-4 h-auto flex flex-col text-[0.61rem] sm:text-[0.85rem] sm:flex-row items-center justify-center"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <i className="bi bi-box-arrow-right mr-2 font-extrabold text-[22px] leading-4 block sm:hidden"></i>
                        <span className="sm:block">Logout</span>
                    </button>
                </div>
            </div>

            {/* Logout Confirmation Modal */}
            <ConfirmationModal
                isOpen={isModalOpen}
                title="Confirm Logout"
                description="Are you sure you want to log out?"
                confirmLabel="Logout"
                iconName="bx bx-power-off"
                iconColor="text-red-500"
                buttonColor="bg-red-500"
                onConfirm={handleLogout}
                onCancel={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default Topbar;
