import { Link } from "react-router-dom";
import React from "react"; // Added this import for React.FC

interface BreadcrumbItem {
    label: string;
    path?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    pageTitle: string; // pageTitle should be a direct prop, not part of each item
    goBack: () => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, pageTitle, goBack }) => {
    return (
        <div className="flex-1 flex-col">
            {/* Access pageTitle directly from props */}
            <div className="title-btn-pair flex items-center justify-center">
                <button
                    onClick={goBack}
                    className="go-previous-pg-btn rounded-lg h-8 min-w-8 bg-dc dark:bg-[#4d4d4d] text-62 dark:text-white  flex items-center justify-center"
                >
                    <i className="bi bi-caret-left-fill" ></i>
                </button>
                <span className="font-bold uppercase ml-2 h-8 display flex items-center justify-center sm:text-2xl text-xl leading-3 dark:text-white text-[#429775]">
                    {pageTitle}
                </span>

            </div>

            <nav className="flex items-center dark:text-white text-62 text-sm">
                {items.map((item, index) => (
                    <div key={index} className="flex items-center dark:text-white text-62">
                        {index !== 0 && (
                            <i className="bx bx-chevron-right-circle mx-2 dart:text-white text-62"></i>
                        )}
                        {item.path ? (
                            <Link to={item.path} className=" dark:text-white text-62 text-[12px] hover:underline">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="dark:text-62 text-blue-400 text-[12px]">{item.label}</span>
                        )}
                    </div>
                ))}
            </nav>
        </div>
    );
};

export default Breadcrumb;