// Create New Insurance Details.tsx
//==========React Specific Imports===========
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";

//==============My Imports==================
//1. Reusable Components
import Breadcrumb from "../../components/molecules/breadcrumb";
import Modal from "../../components/organisms/modal";
import OffCanvas from "../../components/organisms/offcanvas";
import Preloader from "../../components/organisms/preloader";

//2. Custom Hooks

//3. Types
import { Quotation } from "../../types/insurance.types";

//4. Stores and Api's
import QuotationList from '../../data/dummyData/quotationList.json'; // Simulates an API response for quotations

//5. Media and Assets

interface PageDetailsProps {
    pageName: string;
}

export default function QuotationsList({ pageName }: PageDetailsProps) {
    const breadcrumbItems = [
        { label: "Home", path: "/" },
        { label: pageName },
    ];

    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    // Simulating an api response (states can st)
    const [quotationList, setQuotationList] = useState<Quotation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null); // Specify Error type

    // ----------------- Pagination useStates ---------------------
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items to show per pagex
    const totalQuotations = quotationList.length;

    const totalPages = Math.ceil(totalQuotations / itemsPerPage);
    const indexOfLastQuotation = currentPage * itemsPerPage;
    const indexOfFirstQuotation = indexOfLastQuotation - itemsPerPage;
    const currentQuotations = quotationList.slice(indexOfFirstQuotation, indexOfLastQuotation);

    const handleNextPage = () => currentPage < totalPages && setCurrentPage(prev => prev + 1);
    const handlePrevPage = () => currentPage > 1 && setCurrentPage(prev => prev - 1);
    // -----------------------------------------------------------

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Final Data:", formData);
    };

    //-----------------OffCanvas useStates-------------------
    const [isFilterOffCanvasOpen, setIsFilterOffCanvasOpen] = useState(false);
    const offCanvasRef = useRef<HTMLDivElement>(null);

    /* ------------- Add Modal Logic Starts Here ------------------*/
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
    const steps = [
        { title: "Vehicle Details" },
        { title: "Buyer Details" },
        { title: "Insurance Details" },
        { title: "Review & Submit" },
    ];

    const totalSteps = steps.length;
    const [currentStep, setCurrentStep] = React.useState(0);
    const [formData, setFormData] = React.useState<any>({});

    const nextStep = () => {
        if (currentStep < totalSteps - 1) setCurrentStep(prev => prev + 1);
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(prev => prev - 1);
    };

    const inputClass = "w-full mt-1 rounded-none outline-green-500 outline-1 bg-[#ededed] text-sm dark:text-white border-none dark:bg-[#4d4d4d]";
    const labelClass = "block text-sm font-medium text-gray-700 dark:text-white";
    const sectionTitleClass = "w-full text-center sub-section-title text-xl dark:text-white text-[#429775] font-extrabold uppercase";
    const grid2Cols = "grid grid-cols-1 sm:grid-cols-2 gap-4 border-2 mb-2 p-2 rounded-md";
    const grid3Cols = "grid grid-cols-1 sm:grid-cols-3 gap-4 border-2 mb-2 p-2 rounded-md";
    /* ------------- Add Modal Logic Ends Here ------------------*/

    // ------------------Now fetching the data from the simulated API response------------------
    // In your useEffect
    useEffect(() => {
        try {
            setTimeout(() => {
                setQuotationList(QuotationList as Quotation[]);
                setLoading(false);
            }, 3500);
        } catch (e) {
            setError(e as Error);
            setLoading(false); // ✅ fix
        }
    }, []);

    // Close when clicking outside the offcanvas
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isFilterOffCanvasOpen &&
                offCanvasRef.current &&
                !offCanvasRef.current.contains(event.target as Node)
            ) {
                setIsFilterOffCanvasOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isFilterOffCanvasOpen]);


    if (loading) {
        return (
            <Preloader />
        );
    }

    if (error) {
        return (
            <div className="text-center h-full flex text-sm items-center justify-center py-4 dark:text-white">Error: {error.message}</div>
        );
    }

    // Helper function to determine badge color
    const getBadgeColorClass = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-blue-200 dark:bg-blue-700 text-blue-600 dark:text-blue-300';
            case 'accepted':
                return 'bg-green-200 dark:bg-green-700 text-green-600 dark:text-green-300';
            case 'rejected':
                return 'bg-red-200 dark:bg-red-700 text-red-600 dark:text-red-300';
            case 'expired':
                return 'bg-gray-400 dark:bg-gray-600 text-gray-800 dark:text-gray-200';
            default:
                return 'bg-gray-200 text-gray-800';
        }
    };

    return (
        <div className="h-full">
            <div className="w-full h-[60px] flex items-center sm:px-4 px-4">
                <div className="flex items-center gap-2 w-full">
                    <div className="flex">
                        <Breadcrumb items={breadcrumbItems} pageTitle={pageName} goBack={goBack} />
                    </div>
                </div>
            </div>

            <div className="wrapper w-full h-[calc(100%_-_60px)] gap-x-2 flex flex-col md:flex-row items-center justify-center md:items-start p-1">
                <div className="flex flex-col items-center justify-center w-full h-full">
                    {/* ===========DATATABLE COMPONENT=========== */}
                    <div className="table-card flex flex-col p-2 border h-full w-full max-w-6xl">
                        {/* 1. Table Filters */}
                        <div className="for-filters-and-btns w-full py-2 px-2 flex items-center justify-between">
                            <button
                                className="add-item bg-green-500 text-white text-[13px] md:text-[16px] rounded-md"
                                onClick={() => setIsAddModalOpen(true)}
                            >
                                <i className="bi bi-plus-circle mr-1"></i>
                                Add Quotation
                            </button>
                            <div className="filter-offcanvas-pair">
                                <button
                                    className="filters-on-offcanvas bg-green-500 text-[13px] md:text-[16px] text-white rounded-md"
                                    onClick={() => setIsFilterOffCanvasOpen(true)}
                                >
                                    <i className="bx bx-slider-alt mr-1"></i>
                                    Filters
                                </button>
                                <OffCanvas
                                    isOffCanvasOpen={isFilterOffCanvasOpen}
                                    closeOffCanvas={() => setIsFilterOffCanvasOpen(false)}
                                    location="right"
                                    size="default"
                                    overlayOpacity={0}
                                    slideTransitionDuration="duration-150"
                                    title="Filter Vehicles"
                                    scrollable
                                >
                                    <div className="w-full h-full p-2"></div>
                                </OffCanvas>
                            </div>

                        </div>

                        {/* 2. Table*/}
                        <div className="overflow-for-table overflow-x-auto border-t">
                            <table className="w-full text-sm text-left border dark:border-gray-600">
                                <thead className="hidden md:table-header-group">
                                    <tr className="bg-gray-100 dark:text-white text-62 dark:bg-[#4d4d4d]">
                                        <th className="px-4 py-2">Quotation ID</th>
                                        <th className="px-4 py-2">Client Name</th>
                                        <th className="px-4 py-2">Vehicle</th>
                                        <th className="px-4 py-2">Quoted Amount</th>
                                        <th className="px-4 py-2">Status</th>
                                        <th className="px-4 py-2">Expiry Date</th>
                                        <th className="px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="block md:table-row-group">
                                    {currentQuotations.length === 0 ? (
                                        <tr className="block md:table-row p-4 md:p-0 bg-white dark:bg-[#3d3d3d]">
                                            <td colSpan={8} className="text-center py-4 text-black dark:text-white">No vehicles found.</td>
                                        </tr>
                                    ) : (
                                        currentQuotations.map((quotation, i) => (
                                            <tr
                                                key={i}
                                                className="block md:table-row border-b md:border-none p-4 md:p-0 bg-white dark:bg-[#3d3d3d]"
                                            >
                                                {/* Correctly accessing the nested data for the table cells */}
                                                <td
                                                    data-label="Quotation ID"
                                                    className="block md:table-cell border-b px-4 md:py-3 py-2 text-black dark:text-white before:font-semibold before:content-['Quotation_ID:'] md:before:content-none"
                                                >
                                                    <span className="md:mx-0 mx-1">{quotation.quotationId}</span>
                                                </td>
                                                <td
                                                    data-label="Client Name"
                                                    className="block md:table-cell border-b px-4 md:py-3 py-2 text-black dark:text-white before:font-semibold before:content-['Client_Name:'] md:before:content-none"
                                                >
                                                    <span className="md:mx-0 mx-1">{quotation.customerName}</span>
                                                </td>
                                                <td
                                                    data-label="Vehicle"
                                                    className="block md:table-cell border-b px-4 md:py-3 py-2 text-black dark:text-white before:font-semibold before:content-['Vehicle:'] md:before:content-none"
                                                >
                                                    <span className="md:mx-0 mx-1">{quotation.vehicleDetails.make} {quotation.vehicleDetails.model} ({quotation.vehicleDetails.year})</span>
                                                </td>
                                                <td
                                                    data-label="Quoted Amount"
                                                    className="block md:table-cell border-b px-4 md:py-3 py-2 text-black dark:text-white before:font-semibold before:content-['Quoted_Amount:'] md:before:content-none"
                                                >
                                                    <span className="md:mx-0 mx-1">{quotation.quotedPrice.currency} {quotation.quotedPrice.totalAmount.toFixed(2)}</span>
                                                </td>
                                                <td
                                                    data-label="Status"
                                                    className="block md:table-cell border-b px-4 md:py-3 py-2 text-black dark:text-white before:font-semibold before:content-['Status:'] md:before:content-none"
                                                >
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeColorClass(quotation.status)}`}>
                                                        {quotation.status}
                                                    </span>
                                                </td>
                                                <td
                                                    data-label="Expiry Date"
                                                    className="block md:table-cell border-b px-4 md:py-3 py-2 text-black dark:text-white before:font-semibold before:content-['Expiry_Date:'] md:before:content-none"
                                                >
                                                    <span className="md:mx-0 mx-1">{quotation.expiryDate}</span>
                                                </td>
                                                <td
                                                    data-label="Actions"
                                                    className="block md:table-cell border-b px-4 md:py-3 py-2 before:font-semibold before:content-['Actions:'] md:before:content-none"
                                                >
                                                    <div className="flex gap-2">
                                                        <Link to={`/quotation-details/${quotation.quotationId}`} className="text-white bg-blue-500 px-3 py-1 text-xs rounded">View</Link>
                                                        <button className="text-white bg-red-500 px-3 py-1 text-xs rounded">Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/*3. Pagination */}
                        <footer className="for-pagination border min-h-16 px-4 flex items-center justify-between">
                            <div className="total-records flex md:text-sm text-[12px] dark:text-white text-62 text-grey-700">
                                <span className="hidden md:block mr-1 dark:text-white text-62">Showing</span>
                                {/* Dynamically show number of items on current page */}
                                <span className="font-extrabold mr-1 "> {currentQuotations.length}</span>
                                of
                                {/* Dynamically show total entries */}
                                <span className="font-extrabold mx-1 dark:text-white text-62">{totalQuotations}</span> entries
                            </div>
                            <div className="page flex dark:text-white text-62">
                                <button
                                    className="bg-dc w-8 h-8 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1} // Disable if on the first page
                                >
                                    <i className="bi bi-caret-left-fill text-62" ></i>
                                </button>
                                {/* Dynamically show current page and total pages */}
                                <span className="text-[12px] border h-8 flex items-center justify-center px-2 md:text-sm"> page {currentPage} of {totalPages}</span>
                                <button
                                    className="bg-dc w-8 h-8 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages} // Disable if on the last page
                                >
                                    <i className="bi bi-caret-right-fill text-62" ></i>
                                </button>
                            </div>
                        </footer>
                    </div>
                </div>

                <Modal
                    title="Create New Insurance Quotation"
                    open={isAddModalOpen}
                    closeModal={() => setIsAddModalOpen(false)}
                    animated="animate-bounceInDown"
                    size="fixed"
                >
                    {/* Modal content */}
                    <form className="space-y-4 px-4 py-2 h-full w-full flex flex-col items-center" onSubmit={handleSubmit}>
                        <span className="step-of-total w-full text-62 dark:text-[#cfcfcf] text-center text-[14px] leading-3">Step {currentStep + 1} of {totalSteps}</span>
                        <div className="w-3/4 bg-gray-200 rounded-full min-h-1 flex dark:bg-gray-700 mb-1">
                            <div className="bg-green-600 h-full rounded-full transition-all" style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}></div>
                        </div>
                        <h3 className={sectionTitleClass}>{steps[currentStep].title}</h3>

                        {/* Render all steps, but hide the non-current ones using CSS */}
                        <div className="overflow-auto max-h-full w-full"> {/* This wrapper can be outside or inside, depending on your overall layout */}

                            {/* Step 0: Vehicle Details */}
                            <div style={{ display: currentStep === 0 ? 'block' : 'none' }}>
                                <div className={grid2Cols}>
                                    <div>
                                        <label className={labelClass}>Make (Brand)</label>
                                        <input type="text" placeholder="Enter vehicle make..." name="make" required className={inputClass} onChange={handleChange} value={formData.make || ''} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Model</label>
                                        <input type="text" placeholder="Enter vehicle Model..." name="model" required className={inputClass} onChange={handleChange} value={formData.model || ''} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Year</label>
                                        <input type="text" placeholder="Enter vehicle Year..." name="year" required className={inputClass} onChange={handleChange} value={formData.year || ''} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Registration Number</label>
                                        <input type="text" placeholder="Enter Registration Number..." name="registrationNumber" required className={inputClass} onChange={handleChange} value={formData.registrationNumber || ''} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>VIN (optional)</label>
                                        <input type="text" placeholder="Enter Vehicle Identification Number..." name="vin" className={inputClass} onChange={handleChange} value={formData.vin || ''} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Estimated Car Value/Sum Insured</label>
                                        <input type="number" placeholder="Enter Esimated Car Value or Sum Insured..." name="estimatedCarValue" required className={inputClass} onChange={handleChange} value={formData.estimatedCarValue || ''} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Modifications</label>
                                        <input type="text" name="modifications" placeholder="Enter Modifications Details..." required className={inputClass} onChange={handleChange} value={formData.modifications || ''} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Milege</label>
                                        <input type="number" name="milege" placeholder="Enter Vehicle current milege..." required className={inputClass} onChange={handleChange} value={formData.milege || ''} />
                                    </div>
                                </div>
                                <div className={grid2Cols}>
                                    <div>
                                        <label className={labelClass}>Fuel Type</label>
                                        <select name="fuelType" required className={inputClass} onChange={handleChange} value={formData.fuelType || ''}>
                                            <option className='text-sm dark:text-white' value="" disabled>Select Fuel Type</option>
                                            <option className='text-sm dark:text-white' value="Petrol">Petrol</option>
                                            <option className='text-sm dark:text-white' value="Diesel">Diesel</option>
                                            <option className='text-sm dark:text-white' value="Electric">Electric</option>
                                            <option className='text-sm dark:text-white' value="Hybrid">Hybrid</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Transmission</label>
                                        <select name="transmission" required className={inputClass} onChange={handleChange} value={formData.transmission || ''}>
                                            <option className='text-sm dark:text-white' value="" disabled>Select Transmission Type</option>
                                            <option className='text-sm dark:text-white' value="Automatic">Automatic</option>
                                            <option className='text-sm dark:text-white' value="Manual">Manual</option>
                                            <option className='text-sm dark:text-white' value="CVT">CVT</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Car Quality Status</label>
                                        <select name="carQualityStatus" required className={inputClass} onChange={handleChange} value={formData.carQualityStatus || ''}>
                                            <option className='text-sm dark:text-white' value="" disabled>Select a quality</option>
                                            <option className='text-sm dark:text-white' value="new">New</option>
                                            <option className='text-sm dark:text-white' value="cpo">Certified Pre-Owned (CPO)</option>
                                            <option className='text-sm dark:text-white' value="premium-used">Premium/Dealer-Inspected Used</option>
                                            <option className='text-sm dark:text-white' value="good-condition">Good Condition Used</option>
                                            <option className='text-sm dark:text-white' value="fair-condition">Fair Condition Used</option>
                                            <option className='text-sm dark:text-white' value="poor-condition">Poor Condition Used / "As-Is"</option>
                                            <option className='text-sm dark:text-white' value="salvage-written-off">Salvage Title / Written-Off</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Step 1: Buyer Details */}
                            {/* Note: Your currentStep === 1 section only has 'Engine Size'.
                                This might be intended for 'Vehicle Details' or perhaps you missed
                                adding actual buyer details fields here.
                                I'm assuming it should be part of buyer details for now, but verify. */}
                            <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
                                <div className={grid3Cols}>
                                    <div>
                                        <label className={labelClass}>Engine Size (L)</label>
                                        <input type="text" name="engineSize" required className={inputClass} onChange={handleChange} value={formData.engineSize || ''} />
                                    </div>
                                    {/* Add more buyer details fields here */}
                                </div>
                            </div>

                            {/* Step 2: Insurance Details */}
                            <div style={{ display: currentStep === 2 ? 'block' : 'none' }}>
                                <div className={grid2Cols}>
                                    <div>
                                        <label className={labelClass}>Owner Name</label>
                                        <input type="text" name="ownerName" required className={inputClass} onChange={handleChange} value={formData.ownerName || ''} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Registration Date</label>
                                        <input type="date" name="registrationDate" required className={inputClass} onChange={handleChange} value={formData.registrationDate || ''} />
                                    </div>
                                    {/* Add more insurance details fields here */}
                                </div>
                            </div>

                            {/* Step 3: Review & Submit */}
                            <div style={{ display: currentStep === 3 ? 'block' : 'none' }}>
                                <div className="p-2 border rounded w-full">
                                    <h4 className="font-semibold">Review</h4>
                                    <pre className="text-sm text-gray-700 dark:text-white">{JSON.stringify(formData, null, 2)}</pre>
                                </div>
                            </div>
                        </div> {/* End of wrapper div for steps */}

                        <div className="flex justify-between space-x-2">
                            <button
                                type="button"
                                onClick={prevStep}
                                disabled={currentStep === 0}
                                className="px-4 py-2 bg-gray-300 text-sm text-gray-700 rounded disabled:opacity-50"
                            >
                                Back
                            </button>

                            {currentStep < totalSteps - 1 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="px-4 py-2 bg-blue-500 text-sm text-white rounded hover:bg-blue-600"
                                >
                                    Next <i className="bi bi-arrow-right"></i>
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-sm text-white rounded hover:bg-green-700"
                                >
                                    Submit
                                </button>
                            )}
                        </div>
                    </form>
                </Modal>
            </div>
        </div>
    );
}