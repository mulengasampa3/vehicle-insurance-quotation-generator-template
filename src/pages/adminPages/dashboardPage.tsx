// Vehicle Details.tsx
//==========React Specific Imports===========
import { useNavigate } from "react-router-dom";

//==============My Imports==================
//1. Reusable Components
import Breadcrumb from "../../components/molecules/breadcrumb";
//2. Custom Hooks

//3. Types

//4. Stores and Api's

interface PageDetailsProps {
    pageName: string;
}

export default function Dashboard({ pageName }: PageDetailsProps) {
    const breadcrumbItems = [
        { label: "Home", path: "/" },
        { label: pageName }, // Dynamic page label
    ];

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className="h-full">
            {/* Page Header (Breadcrumbs) */}
            <div className="w-full h-[60px] flex items-center sm:px-4 px-4">
                <div className="flex items-center gap-2 w-full">
                    <div className="flex">
                        <Breadcrumb items={breadcrumbItems} pageTitle={pageName} goBack={goBack} />
                    </div>
                </div>
            </div>

            {/* Page Content */}
            <div className="wrapper w-full h-[calc(100%_-_60px)] gap-x-2 flex flex-col md:flex-row items-center justify-center md:items-start p-1">
                
            </div>
        </div>
    );
}