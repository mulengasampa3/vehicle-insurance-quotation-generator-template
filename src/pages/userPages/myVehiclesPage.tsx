// insurancePackagesPage.tsx
//==========React Specific Imports===========
import { Link, useNavigate } from "react-router-dom";

//==============My Imports==================
//1. Reusable Components
import Breadcrumb from "../../components/molecules/breadcrumb";

//4. Stores and Api's
import vehicleInventory from '../../data/dummyData/vehicleInventory.json';

//5. Media and Assets
import FillerCar from '../../media/staticImages/temp-image.jpg';

interface PageDetailsProps {
    pageName: string;
}

export default function MyVehicles({ pageName }: PageDetailsProps) {
    const breadcrumbItems = [
        { label: "Home", path: "/" },
        { label: pageName },
    ];

    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <div className="h-full w-full">
            {/* Page Header (Breadcrumbs) */}
            <div className="w-full h-[60px] flex items-center sm:px-4 px-4">
                <div className="flex items-center gap-2 w-full">
                    <div className="flex">
                        <Breadcrumb items={breadcrumbItems} pageTitle={pageName} goBack={goBack} />
                    </div>
                </div>
            </div>

            {/* Page Content */}
            <div className="wrapper overflow-y-auto w-full h-[calc(100%_-_60px)] gap-x-2 flex flex-col md:flex-row items-center md:items-start p-1">
                <div className="vehicle-collection sm:px-4 px-0 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-2">
                    {vehicleInventory.map((vehicle) => (
                        <Link
                            key={vehicle.id}
                            to={`vehicleDetails/${vehicle.id}`}
                            className="vehicle-card shadow-md h-auto cursor-pointer w-full border-2 my-2 rounded-xl py-2 px-2"
                        >
                            {/* Card body 1: Image */}
                            <div className="card-body">
                                <img
                                    src={FillerCar}
                                    alt={`${vehicle.make} ${vehicle.model}`}
                                    className="w-full h-[200px] object-cover rounded-md"
                                />
                            </div>

                            {/* Card body 2: Title */}
                            <div className="card-body">
                                <div className="name text-3xl font-semibold text-blue-400">
                                    {vehicle.make} {vehicle.model}
                                </div>
                            </div>

                            {/* Card body 3: Details */}
                            <div className="card-body grid grid-cols-2 gap-0 mt-2">
                                <Detail icon="bi-calendar-check" label="Year" value={vehicle.year} />
                                <Detail icon="bi-credit-card-2-front" label="Plate" value={vehicle.plateNumber} />
                                <Detail icon="bi-shield-check" label="Color" value={vehicle.color} />
                                <Detail icon="bi-clock" label="Status" value={<span className="bg-green-200 text-[12px] dark:bg-green-700 rounded-full px-3 dark:text-green-200 text-green-700">Insured</span>} />
                                <Detail icon="bi-people" label="Owner" value={vehicle.ownerName} />
                                <Detail icon="bi-geo-alt" label="Mileage" value={`${vehicle.mileage.toLocaleString()} km`} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Reusable detail renderer
function Detail({ icon, label, value }: { icon: string; label: string; value: React.ReactNode }) {
    return (
        <div className="icon-label-value flex items-center">
            <div className="icon flex items-center justify-center mr-2 text-green-500">
                <i className={`bi ${icon} text-base`} />
            </div>
            <span className="label-value text-[14px] dark:text-white text-gray-600">
                <strong>{label}:</strong> {value}
            </span>
        </div>
    );
}
