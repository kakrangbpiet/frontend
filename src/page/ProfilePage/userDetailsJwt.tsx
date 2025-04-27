import PersonalDetails from "../../components/Registration/PersonalDetails";
import { SignUpData } from "../../Datatypes";
import ContactDetails from "../../components/Registration/ContactDetails";
import LocationDetails from "../../components/Registration/LocationDetails";

interface UserDetailsProps {
  userData?: SignUpData;
  isRegister: boolean;
  shouldShowRegister: boolean;
  handleRegister: (userData: SignUpData) => void;
  setUserData: any
}

const UserDetails = ({ userData, isRegister, handleRegister, setUserData, shouldShowRegister }: UserDetailsProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRegister(userData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative z-10">
        <div className="mb-8 flex flex-col items-center">
          <h2
            className="text-3xl font-extrabold text-transparent bg-clip-text  bg-gradient-to-r from-white/80 via-white/60 to-white/80 mb-2"
          >
            Personal Information
          </h2>
          <div className="w-24 h-1 rounded-full bg-white/30 backdrop-blur-sm"></div>
        </div>

        <div className="space-y-6">
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
        </div>

        {isRegister && shouldShowRegister && (
          <div className="mt-8 w-full flex justify-center">
            <button
              type="submit"
              className="w-full max-w-lg px-8 py-4 rounded-2xl px-6 py-2.5 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow-lg "
            >
              Complete Registration
            </button>
          </div>

        )}
      </div>
    </form>
  );
};

export default UserDetails;