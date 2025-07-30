import { useNavigate } from "react-router-dom";


const fourZerofour: React.FC = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);;
    return (
        <div className="layout relative bg-white h-screen w-screen">
            <div className="overlay bg-sidebar-gradient absolute image-container w-full h-screen flex items-center justify-center"></div>
            <div className="bg-[#00000042] flex-col backdrop-blur-md absolute image-container w-full h-screen flex items-center justify-center">
                <h1 className="sm:text-[280px] text-[140px] text-white sm:leading-[250px] leading-[120px] animate-jelloEffect font-extrabold">404!</h1>
                <span className="page-not-found sm:text-[30px] text-30px]  text-white">Page Not Found</span>
                <button onClick={goBack} className="go-back text-white sm:text-[15px] text-16px] sm:mt-5 mt-3 bg-company-color-secondary p-3 rounded-[12px] hover:bg-[#626262]">Go to Homepage</button>
            </div>
        </div>
    )
};

export default fourZerofour;