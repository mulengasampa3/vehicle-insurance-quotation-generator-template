import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
{/*1. Admin (Internal) Side Portal */}
//a. Partial
import AdminPortalLayout from "./components/partials/adminPortalPartials/adminPortalLayout";
//b. Page Outlets
// import VehicleInventoryPage from "./pages/adminPages/vehicleInventoryPage";
import DashboardPage from "./pages/adminPages/dashboardPage";
import VehicleDetailsPage from "./pages/adminPages/vehicleDetailsPage";
import QuotationsListPage from "./pages/adminPages/quotationListPage";
import AdminProfilePage from "./pages/adminPages/profileSettingsPage";

{/*2. Client (External) Side Portal */}
//a. Partial
import ClientPortalLayout from "./components/partials/userPortalPartials/userPortalLayout";
//b. Page Outlets
import TemperalLandingPage from "./pages/temperalPage";
import ClientDashboardPage from "./pages/userPages/clientDashboardPage";
import InsurancePackages from "./pages/userPages/insurancePackagesPage";
import RequestQuotationPage from "./pages/userPages/requestQuotation";
import ClientProfilePage from "./pages/userPages/clientProfilePage";
import MyVehicles from "./pages/userPages/myVehiclesPage";

{/*3. Auth Side  */}
//a. Partial
//b. Page Outlets
import LoginPage from "./pages/Auth/loginPage";
import RegisterPage from "./pages/Auth/registerPage";

//4. Error Page
import FourZeroFourPage from "./pages/wildcardPages/404";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* ======Can be discarded after proper authentication has been defined====== */}
                <Route path="/" element={<TemperalLandingPage />} />
                
                {/*1. Admin (Internal) Portal */}
                <Route path="dashboard-app/" element={<AdminPortalLayout />}>
                    <Route index element={<DashboardPage pageName="Dashboard" />} />
                    {/* <Route path="vehicle-inventory" element={<VehicleInventoryPage pageName= "Vehicle Inventory" />} /> */}
                    <Route path="vehicle-details" element={<VehicleDetailsPage pageName= "Vehicle Details" />} />
                    <Route path="quotations" element={<QuotationsListPage pageName="Quotations"/>}/>
                    <Route path="profile-settings" element={<AdminProfilePage pageName="Profile Settings"/>}/>
                </Route>

                {/*2. Client (External) Portal*/}
                <Route path="client-app/" element={<ClientPortalLayout/>}>
                    <Route index element={<ClientDashboardPage pageName="Dashboard"/>}/>
                    <Route path="insurance-packages" element={<InsurancePackages pageName= "Insurance Packages" />} />
                    <Route path="create-quotation" element={<RequestQuotationPage pageName="Request Quotation"/>}/>
                    <Route path="my-account" element={<ClientProfilePage pageName="My Account"/>}/>
                    <Route path="my-vehicles" element={<MyVehicles pageName="My Vehicles"/>}/>
                </Route>

                {/*3. Authentication pages */}
                <Route path="auth/">
                    <Route path="login" element={<LoginPage />}/>
                    <Route path="register" element={<RegisterPage />}/>
                </Route>

                {/* === Fallback for undefined routes === */}
                <Route path="*" element={<FourZeroFourPage />} />
            </Routes>
        </Router>
    );
};

export default App;
