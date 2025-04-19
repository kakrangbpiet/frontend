import PersonalDetails from "../../components/Registration/PersonalDetails";
import {  SignUpData } from "../../Datatypes";
import ContactDetails from "../../components/Registration/ContactDetails";
import LocationDetails from "../../components/Registration/LocationDetails";

interface UserDetailsProps {
    userData?: SignUpData;
    isRegister: boolean;
    shouldShowRegister: boolean;
    handleRegister: (userData: SignUpData) => void;
    setUserData: any
}

const UserDetails = ({ userData, isRegister, handleRegister,setUserData,shouldShowRegister }: UserDetailsProps) => {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleRegister(userData);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <PersonalDetails 
                inquiryData={userData} 
                setInquiryData={setUserData} 
                isRegister={isRegister}
                shouldShowRegister={shouldShowRegister}
            />
            <ContactDetails 
                inquiryData={userData} 
                setInquiryData={setUserData} 
                isRegister={isRegister} 
                shouldShowRegister={shouldShowRegister}
            />
            <LocationDetails 
                inquiryData={userData} 
                setInquiryData={setUserData} 
                isRegister={isRegister} 
                shouldShowRegister={shouldShowRegister}
            />
            {isRegister && shouldShowRegister && (
                <div className="px-4 py-5 sm:px-6 flex justify-end">
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                    >
                        Register
                    </button>
                </div>
            )}
        </form>
    );
};

export default UserDetails;