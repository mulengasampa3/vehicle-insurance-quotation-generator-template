// =========== React Specific Imports ===========
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// =========== My Imports ===========

//1. Reusable Components
import ConfirmationModal from '../../organisms/comfirmationModal';
import OffCanvas from '../../organisms/offcanvas';

//2. Data
import topBarMenuOptions from '../../../data/topBarMenuOptions.json';

//3. Types

//4. Media and Assets


const TopbarTwo: React.FC = () => {
    const [isLogOutComfirmationModalOpen, setIsLogOutComfirmationModalOpen] = useState(false);

    const handleLogout = () => {
        console.log("Logging out..."); // Replace with actual logout logic
        setIsLogOutComfirmationModalOpen(false);
    };
    const [isMenuOptionsOffcanvasOpen, setIsMenuOptionsOffcanvasOpen] = useState(false);
    return (
        <nav className="topbar w-full dark:bg-[#2a2a2a] border-b dark:border-62 z-40 bg-white shadow-[0_-10px_25px_rgba(0,0,0,0.1)] sm:h-[60px] h-[47.5px] flex lg:px-[10rem] sm:px-[1.25rem] px-0 items-center justify-between">
            <div className="offCanvas-portion">
                <button
                    className="logout-icon notification-icon mx-[5px] w-[40px] h-[40px] dark:bg-transparent bg-dc border-2 dark:border-white border-transparent rounded-xl hover:rounded-[50%] transition-all cursor-pointer relative"
                    onClick={() => setIsMenuOptionsOffcanvasOpen(true)}

                >
                    <i className="bi bi-list w-full h-full dark:text-white text-62 flex items-center justify-center text-[25px] font-[500]"></i>
                </button>
                <OffCanvas
                    isOffCanvasOpen={isMenuOptionsOffcanvasOpen}
                    closeOffCanvas={() => setIsMenuOptionsOffcanvasOpen(false)}
                    location="left"
                    size="default"
                    overlayOpacity={50}
                    slideTransitionDuration="duration-150"
                    title="Menu"
                    scrollable
                >
                    {topBarMenuOptions.map((option, index) => (
                        <Link
                            key={index}
                            to={option.path}
                            onClick={() => setIsMenuOptionsOffcanvasOpen(false)}
                            className={` text-62 dark:hover:bg-[#4d4d4d]  px-4 h-[60px] flex hover:bg-dc text-[0.61rem] sm:text-[0.85rem] items-center justify-start`}
                        >
                            <i className={`bi ${option.icon} mr-2 text-white' font-extrabold text-[22px] leading-4 block`}></i>
                            <span className={`sm:block text-62 dark:text-white font-semibold text-[0.85rem]`}>
                                {option.title}
                            </span>
                        </Link>
                    ))}
                </OffCanvas>
            </div>
            <div className="icons flex">
                <button className="notification-icon mx-[5px] w-[40px] h-[40px] dark:bg-transparent bg-dc border-2 dark:border-white border-transparent rounded-xl hover:rounded-[50%] transition-all cursor-pointer relative"
                    onClick={() => document.documentElement.classList.toggle('dark')}
                >
                    <i className="bi bi-moon-stars w-full h-full dark:text-white text-62 flex items-center justify-center text-[22px] font-[500]"></i>
                </button>
                <button className="notification-icon mx-[5px] w-[40px] h-[40px] dark:bg-transparent bg-dc border-2 dark:border-white border-transparent rounded-xl hover:rounded-[50%] transition-all cursor-pointer relative"
                    onClick={() => setIsLogOutComfirmationModalOpen(true)}
                    title="Logout"
                >
                    <i className="bi bi-box-arrow-right w-full h-full dark:text-white text-62 flex items-center justify-center text-[22px] font-[500]"></i>
                </button>
            </div>
            {/* Logout Confirmation Modal */}
            <ConfirmationModal
                isOpen={isLogOutComfirmationModalOpen}
                title="Confirm Logout"
                description="Are you sure you want to log out?"
                confirmLabel="Logout"
                iconName="bx bx-power-off"
                iconColor="text-red-500"
                buttonColor="bg-red-500"
                onConfirm={handleLogout}
                onCancel={() => setIsLogOutComfirmationModalOpen(false)}
            />
        </nav>
    );
};

export default TopbarTwo;
