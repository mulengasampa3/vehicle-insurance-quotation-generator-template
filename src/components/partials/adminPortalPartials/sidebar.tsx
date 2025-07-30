import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import companyName from '../../../media/icons/Logo-writing-white.png'; // Adjust the path as needed
import MenuItemsData from '../../../data/sidebarMenuOptions.json';
import SidebarFooterData from '../../../data/sidebarFooter.json';

interface SidebarItemProps {
    item: {
        title: string;
        icon: string;
        path?: string;
        children?: SidebarItemProps["item"][];
    };
    setSidebarOpen: (open: boolean) => void;
}

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item, setSidebarOpen }) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        if (item.path) {
            setSidebarOpen(false);
        }
    };

    if (item.children) {
        return (
            <div className={open ? "menu-item open " : "menu-item"}>
                <div className="menu-option-title" onClick={() => setOpen(!open)}>
                    <span className="icon-title-pair">
                        {item.icon && <i className={`${item.icon} text-white dark:text-white`}></i>}
                        <span className="value text-nowrap text-white dark:text-white">{item.title}</span>
                    </span>
                    <i className="bi bi-caret-down-fill toggle-btn text-white dark:text-white"></i>
                </div>
                <div className="menu-option-content text-white dark:text-white">
                    {item.children.map((child, index) => (
                        <SidebarItem key={index} item={child} setSidebarOpen={setSidebarOpen} />
                    ))}
                </div>
            </div>
        );
    } else {
        return (
            <Link to={item.path || "#"} className="menu-item plain " onClick={handleClick}>
                {item.icon && <i className={`${item.icon} text-white dark:text-white`}></i>}
                <span className="value text-nowrap text-white dark:text-white">{item.title}</span>
            </Link>
        );
    }
};

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
    const trigger = useRef<HTMLButtonElement | null>(null);
    const sidebar = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const clickHandler = ({ target }: MouseEvent) => {
            if (!sidebar.current || !trigger.current) return;
            if (!sidebarOpen || sidebar.current.contains(target as Node) || trigger.current.contains(target as Node)) return;
            setSidebarOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    }, [sidebarOpen]);

    useEffect(() => {
        const keyHandler = ({ keyCode }: KeyboardEvent) => {
            if (!sidebarOpen || keyCode !== 27) return;
            setSidebarOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    }, [sidebarOpen]);

    return (
        <aside
            className={`sidebar w-[290px] fixed duration-150 flex shadow-[0_0_5px_rgba(0,0,0,0.5)] flex-col text-white h-full dark:bg-[#222222] bg-[#1b4f3c]
              ${sidebarOpen ? 'lg:translate-x-[-100%] translate-x-0 z-50 lg:z-50' : 'lg:translate-x-0 translate-x-[-290px] lg:z-0 z-50'}`}
        >

            <div className="company-name shadow-[0_5px_5px_rgba(0,0,0,0.05)] flex pl-4 w-full h-[100px]">
                <img src={companyName} alt="Company Logo" className="h-full w-[80%] object-contain" />
            </div>
            <div className="menu-options flex-grow">
                {MenuItemsData.map((item, index) => (
                    <SidebarItem key={index} item={item} setSidebarOpen={setSidebarOpen} />
                ))}
            </div>
            <div className="sidebar-footer shadow-[0_-10px_10px_rgba(0,0,0,0.05)] overflow-hidden">
                {SidebarFooterData.map((item, index) => (
                    <SidebarItem key={index} item={item} setSidebarOpen={setSidebarOpen} />
                ))}
            </div>
        </aside>
    );
}