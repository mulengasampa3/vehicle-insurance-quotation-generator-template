// Vehicle Details.tsx
//==========React Specific Imports===========
import { useNavigate } from "react-router-dom";
import { useState } from "react";

//==============My Imports==================
//1. Reusable Components
import Breadcrumb from "../../components/molecules/breadcrumb";
//2. Custom Hooks

//3. Types

//4. Stores and Api's

//5. Media Imports
import CoverImage from '../../media/staticImages/temp-image.jpg';
// import CarBadge from '../../media/staticImages/toyota.png'

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

    // Enable Editing Of Information
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const handleEdit = () => {
        setIsEditing(true);
    };

    const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

    const cancelEdit = () => {
        setIsEditing(false)
    }



    return (
        <div className="h-full">
            {/* Page Header (Breadcrumbs) */}
            <div className="w-full h-[60px] flex items-center sm:px-4 px-4">
                <div className="flex items-center justify-between w-full">
                    <div className="flex">
                        <Breadcrumb items={breadcrumbItems} pageTitle={pageName} goBack={goBack} />
                    </div>
                    {!isEditing ? (
                        <button
                            onClick={handleEdit}
                            className="editable-btn text-white right-0 bg-blue-400 rounded text-sm  px-4 py-2">
                            <i className="bi bi-pencil-square mr-1"></i>
                            Edit Details
                        </button>
                    ) : (
                        <div className="flex space-x-2">
                            <button className="editable-btn text-white bg-green-500 rounded text-sm  px-4 py-2">
                                <i className="bi bi bi-floppy mr-1"></i>
                                Save Details
                            </button>
                            <button
                                onClick={cancelEdit}
                                className="editable-btn dark:text-white text-62 bg-dc dark:bg-[#4d4d4d] rounded text-sm  px-4 py-2">
                                <i className="bi bi bi-x-square mr-1"></i>
                                cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Page Content */}
            <div className="wrapper w-full h-[calc(100%_-_60px)] gap-x-2 flex flex-col  md:items-start p-1">
                {/* ==========  FIRST SECTION ========== */}
                <section className="vehicle-details p-2 overflow-y-auto flex w-full h-auto border rounded-md">
                    <div className="left w-2/5 P-1 border h-[350px] relative">
                        <img src={CoverImage} alt="VEHICLE PICTURES" className="w-full h-full object-contain" />
                        {isEditing && (
                            <>
                                <input
                                    type="file"
                                    id="uploadVehicle"
                                    className="hidden"
                                />
                                <label htmlFor="uploadVehicle" className="cursor-pointer flex flex-col absolute bottom-0 floating-upload-btn items-center justify-center w-full h-[70px] bg-gray-300 dark:bg-[#4d4d4d]">
                                    <i className={`bi ${uploadStatus === 'success' ? 'bi-check-circle-fill text-green-500' :
                                            uploadStatus === 'error' ? 'bi-x-circle-fill text-red-500' :
                                                'bi-camera-fill text-blue-400 dark:text-white'
                                        } text-[50px] leading-3`}></i>

                                    <span className={`text-center ${uploadStatus === 'success' ? 'text-green-500' :
                                            uploadStatus === 'error' ? 'text-red-500' :
                                                'text-blue-400 dark:text-white'
                                        }`}>
                                        {uploadStatus === 'uploading' && 'Uploading image...'}
                                        {uploadStatus === 'success' && 'Upload successful'}
                                        {uploadStatus === 'error' && 'Upload failed'}
                                        {uploadStatus === 'idle' && 'Click to upload'}
                                    </span>
                                </label>

                            </>
                        )}
                    </div>
                    <div className="right w-3/5 border h-[350px]">
                        <span className="vehicle-name text-[30px] flex font-bold">
                            {/* <img src={CarBadge} alt="" className="car-badge-image w-10 h-10 object-contain" /> */}
                            TOYOTA IMPRESSA
                        </span>
                    </div>
                </section>

                {/* ========== SECOND SECTION ========== */}
            </div>
        </div>
    );
}