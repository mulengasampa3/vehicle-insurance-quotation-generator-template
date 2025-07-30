import React, { useState, useEffect, useRef } from "react";
import TemporalImage from '../../../media/staticImages/temp-image.jpg'; // Adjust the path as needed

interface NavbarProps {
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    sidebarOpen: boolean;
}

interface DropdownItem {
    avatar?: string;
    title: string;
    description: string;
    time?: string;
}

interface DropdownIconProps {
    iconClass: string;
    dropdownItems: DropdownItem[];
    type: 'notification' | 'chat' | 'extras'; // Add 'extras' type
    grid?: boolean; // Add grid prop for extras dropdown
}

const DropdownIcon: React.FC<DropdownIconProps> = ({ iconClass, dropdownItems, type, grid = false }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const iconRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setDropdownVisible((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                iconRef.current &&
                dropdownRef.current &&
                !iconRef.current.contains(event.target as Node) &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const title = type === 'notification' ? 'Notifications' : type === 'chat' ? 'Chats' : 'Extras';
    const newItemLabel = type === 'notification' ? 'New' : type === 'chat' ? 'New Messages' : ''; // No new label for extras
    const viewAllLabel = type === 'notification' ? 'View All Notifications' : type === 'chat' ? 'View All Chats' : 'View All Options';

    return (
        <div className="DropdownComponent relative">
            <div
                className="notification-icon mx-[5px] w-[40px] h-[40px] dark:bg-transparent bg-dc border-2 dark:border-white border-transparent rounded-xl hover:rounded-[50%] transition-all cursor-pointer relative"
                onClick={toggleDropdown}
                ref={iconRef}
            >
                <i className={`${iconClass} w-full h-full dark:text-white text-62 flex items-center justify-center text-[25px] font-[500] absolute`}></i>
                {dropdownItems.length > 0 && (
                    <span className="bubble absolute w-[20px] h-[20px] rounded-[30%] text-[12px] font-bold flex items-center justify-center text-white bg-red-500 right-[-5px] top-[-5px]">
                        {dropdownItems.length}
                    </span>
                )}
            </div>
            {dropdownVisible && (
                <div
                    className="z-10 fixed top-[65px] right-[10px] w-[350px] border bg-system-white dark:bg-[#222222] shadow-lg rounded-lg overflow-hidden"
                    ref={dropdownRef}
                >
                    <div className="p-3 text-62 font-semibold border-b border-gray-300 flex justify-between items-center">
                        {title}
                        {newItemLabel && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{dropdownItems.length} {newItemLabel}</span>}
                    </div>
                    <ul className={`max-h-[300px] overflow-y-auto ${grid ? 'grid grid-cols-3 gap-2 p-2' : ''}`}> {/* Grid added here */}
                        {dropdownItems.map((item, index) => (
                            <li key={index} className={`flex items-start gap-3 p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100 ${grid ? 'rounded-lg overflow-hidden flex-col items-center justify-center text-center border border-gray-300' : ''}`}> {/* Grid item styling */}
                                {item.avatar ? (
                                    <img src={item.avatar} alt={item.title} className={`w-10 h-10 rounded-full ${grid ? 'mb-2' : ''}`} />
                                ) : (
                                    <div className={`w-10 h-10 flex items-center justify-center rounded-full bg-dc text-62 font-bold ${grid ? 'mb-2' : ''}`}>
                                        {item.title[0].toUpperCase()}
                                    </div>
                                )}
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                    <p className="text-xs text-gray-400">{item.time}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button className="w-full text-center py-2 text-[rgba(23,217,215,1)]  border-t border-gray-300 bg-white dark:bg-[#222222] font-medium hover:bg-gray-200">{viewAllLabel}</button>
                </div>
            )}
        </div>
    );
};

const Navbar: React.FC<NavbarProps> = ({ setSidebarOpen, sidebarOpen }) => {
    const notifications: DropdownItem[] = [
        { avatar: "https://randomuser.me/api/portraits/men/10.jpg", title: "Daisy Anderson", description: "The standard chunk of lorem", time: "5 sec ago" },
        { title: "New Orders", description: "You have received new orders", time: "2 min ago" },
        { title: "New Orders", description: "You have received new orders", time: "2 min ago" },
        { avatar: "https://randomuser.me/api/portraits/women/5.jpg", title: "Althea Cabardo", description: "Many desktop publishing packages", time: "14 sec ago" },
        { title: "Account Created", description: "Successfully created new email", time: "28 min ago" },
        { title: "New Product Approved", description: "Your new product has approved", time: "2 hrs ago" },
        { avatar: "https://randomuser.me/api/portraits/women/20.jpg", title: "Katherine Pechon", description: "Making this the first true generator", time: "15 min ago" },
    ];

    const chats: DropdownItem[] = [
        { avatar: "https://randomuser.me/api/portraits/men/2.jpg", title: "John Doe", description: "Hey, how are you?", time: "1 min ago" },
        { title: "Jane Smith", description: "Meeting today?", time: "5 min ago" },
    ];

    return (
        <div className="w-[100%] h-[50px] dark:bg-[#2a2a2a] border-b dark:border-62 bg-white  flex justify-between items-center pl-2 pr-2">
            {/* Minimize button */}
            <div
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="minimize-btn mx-[5px] w-[40px] h-[40px] dark:bg-transparent bg-dc border-2 dark:border-white border-transparent rounded-xl hover:rounded-[50%] transition-all cursor-pointer relative"
            >
                <i className="bx bx-menu w-full h-full dark:text-white text-62 flex items-center justify-center text-[25px] font-[500]"></i>
            </div>

            {/* Dark Mode toggler btn */}
            <button 
                onClick={() => document.documentElement.classList.toggle('dark')}
                className="notification-icon mx-[5px] w-[40px] h-[40px] dark:bg-transparent bg-dc border-2 dark:border-white border-transparent rounded-xl hover:rounded-[50%] transition-all cursor-pointer relative">
                <i className={`w-full h-full dark:text-white text-62 flex items-center justify-center text-[25px] font-[500] bi bi-brightness-high-fill`}></i>
            </button>

            {/* right icons */}
            <div className="right-navbar w-auto h-full flex items-center">

                <DropdownIcon iconClass="bx bxs-bell-ring" dropdownItems={notifications} type="notification" />
                <DropdownIcon iconClass="bx bxs-chat" dropdownItems={chats} type="chat" />

                <div className="user-profile flex items-center mx-1 justify-center">
                    <img
                        src={TemporalImage}
                        alt="User"
                        className="w-[40px] h-[40px] object-cover rounded-xl hover:rounded-[50%] transition-all cursor-pointer"
                    />
                    <div className="user-name sm:flex hidden flex-col justify-center mx-1  px-1">
                        <span className="user-name dark:text-white text-62 font-bold text-md leading-3">Okra Mutale</span>
                        <span className="role text-[12px] font-light dark:text-white">(Crush)</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;