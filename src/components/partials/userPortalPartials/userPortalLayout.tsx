import React from "react";
import { Outlet } from "react-router-dom";
// import Topbar from './topbar'
import TopbarTwo from "./topbarTwo";

const ClientLayout: React.FC = () => {
    return (
        <div className="layout flex flex-col-reverse sm:flex-col items-center h-screen w-screen relative">
            {/* Topbar Component */}
            <TopbarTwo />
            {/* Main Content */}
            <main className={`duration-300 dark:bg-[#222222] h-full md:px-[10rem] px-0 overflow-auto transition-all  w-full z-10`}>
                <div className="bg-white h-full dark:bg-[#2a2a2a] dark:border-62 border-b border-x w-full flex ">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default ClientLayout;