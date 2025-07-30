import React, { useState } from "react";
import { resetUserPassword } from "../../features/auth/authSlice";
import OtpRequestForm from "../../components/organisms/auth/otpRequestComponent";
import { AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";

const PasswordReset: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleOtpSubmit = ({ method, value }: { method: string; value: string }) => {
        setLoading(true);
        // Call API or dispatch action here based on method and value
        dispatch(resetUserPassword({ method, value }));
    };

    return (
        <div className="screen-container min-h-screen flex items-start sm:items-center justify-center bg-custom-gradient">
            <OtpRequestForm
                onSubmit={handleOtpSubmit}
                loading={loading}
                title="REQUEST A PASSWORD RESET"
                otpMethods={["phone", "email"]}
            />
        </div>
    );
};
    
export default PasswordReset;
