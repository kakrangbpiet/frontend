import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// Redux imports
import { AppDispatch } from '../../redux/store';
import { registerUserDispatcher } from '../../redux/slices/login/authApiSlice';
import { createTravelInquiry } from '../../redux/slices/Travel/Booking/BookTravelApiSlice';
import { isAuthenticated, JwtPayload, selectToken } from '../../redux/slices/login/authSlice';
import { DateAvailability, selectTitles, useSelectedTravelPackage } from '../../redux/slices/Travel/TravelSlice';
import { TravelInquiry } from '../../redux/slices/Travel/Booking/BoookTravelSlice';
import { accountStatus, UserCategory } from '../../Datatypes/Enums/UserEnums';
import { formatDate } from '../../page/SinglePackage/DateAvailability';

// Import components
import LocationDetails from './LocationDetails';
import PersonalDetails from './PersonalDetails';
import ContactDetails from './ContactDetails';
import RazorpayPaymentButton from '../Payment/RazorpayPaymentButton';

const inquirySteps = [
  'Destination',
  'Personal Info',
  'Contact'
];

// Update the getStepContent function
function getStepContent(
  step: number,
  inquiryData: TravelInquiry,
  setInquiryData: React.Dispatch<React.SetStateAction<TravelInquiry>>,
  dateAvailabilities: DateAvailability[],
  titles: { id: string, title: string }[],
  isCustomForm?: boolean,
) {
  switch (step) {
    case 0:
      return (
        <LocationDetails
          isCustomForm={isCustomForm}
          inquiryData={inquiryData}
          setInquiryData={setInquiryData}
          dateAvailabilities={dateAvailabilities}
          titles={titles}
        />
      );
    case 1:
      return <PersonalDetails inquiryData={inquiryData} setInquiryData={setInquiryData} />;
    case 2:
      return <ContactDetails inquiryData={inquiryData} setInquiryData={setInquiryData} />;
    default:
      return 'Unknown step';
  }
}

function TravelInquiryForm({ packageId, packageTitle, isCustomForm }: { packageId?: string, packageTitle?: string, isCustomForm?: boolean }) {
  const dispatch = useDispatch<AppDispatch>();
  const [activeStep, setActiveStep] = useState(0);
  const auth = useSelector(isAuthenticated);
  const token = useSelector(selectToken);
  const selectedPackage = useSelector(useSelectedTravelPackage(packageId));
  const navigate = useNavigate();
  const titles = useSelector(selectTitles);
  
  const getUserDetailsFromToken = (token: string | null): { name?: string, email?: string, phoneNumber?: string } => {
    if (!token) return {};
    try {
      const decoded = jwtDecode(token) as JwtPayload;
      return {
        name: decoded.name,
        email: decoded.email,
        phoneNumber: decoded.phoneNumber
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      return {};
    }
  };

  const userDetails = getUserDetailsFromToken(token);

  const [inquiryData, setInquiryData] = useState<TravelInquiry>({
    packageId: packageId,
    packageTitle: packageTitle,
    destination: packageTitle,
    address: "",
    tripType: selectedPackage?.travelType || 'pre-planned',
    startDate: null,
    endDate: null,
    passengerCount: 1,
    name: userDetails?.name || '',
    email: userDetails?.email || '',
    phoneNumber: userDetails?.phoneNumber || '',
    specialRequests: '',
    price: '',
  });

  const handleNext = () => {
    if (validateCurrentStep()) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const navigateToProfile = () => {
    navigate("/profile");
  };

  const validateCurrentStep = (): boolean => {
    switch (activeStep) {
      case 0:
        if (!inquiryData.address) {
          alert('Please select your current location');
          return false;
        }
        if (!inquiryData.destination) {
          alert('Please select your destination');
          return false;
        }
        if (inquiryData.tripType === 'pre-planned' && (!inquiryData.startDate || !inquiryData.endDate)) {
          alert('Please select a travel date from the available options');
          return false;
        }
        if (inquiryData.tripType === 'custom' && (!inquiryData.startDate || !inquiryData.endDate)) {
          alert('Please select your custom travel dates');
          return false;
        }
        if (inquiryData.startDate && inquiryData.endDate && inquiryData.startDate > inquiryData.endDate) {
          alert('End date must be after start date');
          return false;
        }
        return true;
      case 1:
        if (!inquiryData.name || inquiryData.passengerCount < 1) {
          alert('Please provide your name and at least 1 passenger');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const submitTravelInquiry = async () => {
    try {
      if (!inquiryData.phoneNumber) {
        alert('Please provide your phone number');
        return false;
      }
      if (!inquiryData.email && !auth) {
        alert('Please provide your email');
        return false;
      }

      const inquiryToSend = {
        ...inquiryData,
        category: UserCategory.User,
        accountStatus: accountStatus.pending,
        formattedStartDate: inquiryData.startDate ? formatDate(inquiryData.startDate) : undefined,
        formattedEndDate: inquiryData.endDate ? formatDate(inquiryData.endDate) : undefined
      };

      if (!auth) {
        const registrationResult = await dispatch(registerUserDispatcher({ userData: inquiryToSend })).unwrap();

        if (registrationResult) {
          await dispatch(createTravelInquiry({ inquiryToSend, handleNext }));
        }
      } else {
        await dispatch(createTravelInquiry({ inquiryToSend, handleNext }));
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
    }
  };

  return (
    <div>
      <div className="bg-transparent-900/90 backdrop-blur-md rounded-lg overflow-hidden border border-white/20 shadow-lg">
        <div className="bg-transparent-800/80 p-3 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white text-center mb-2">Travel Inquiry</h2>
          <div className="flex items-center justify-between mb-1">
            {inquirySteps.map((step, index) => (
              <div key={index} className={`text-xs font-medium ${activeStep === index ? 'text-blue-400' : 'text-gray-400'}`}>
                {step}
              </div>
            ))}
          </div>
          <div className="h-1 w-full bg-gray-700 rounded-full">
            <div
              className="h-1 bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${((activeStep + 1) / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {activeStep === inquirySteps.length ? (
          <div className="text-center py-2 bg-gray-800/80 backdrop-blur-md p-4">
            <h3 className="text-base font-semibold mb-4 text-white">Thank you for your inquiry!</h3>
            <button
              onClick={navigateToProfile}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow transition transform hover:-translate-y-0.5"
            >
              View Updates
            </button>
          </div>
        ) : (
          <>
            <div className="p-3 bg-transparent-100/10 backdrop-blur-md min-h-[250px]">
              {getStepContent(
                activeStep,
                inquiryData,
                setInquiryData,
                selectedPackage?.dateAvailabilities || [],
                titles,
                isCustomForm
              )}
            </div>

            <div className="px-2 gap-2 py-3 flex justify-between items-center bg-gray-800/80 backdrop-blur-md border-t border-gray-700">
              {activeStep > 0 && (
                <button
                  onClick={handleBack}
                  
                  className="w-full py-3 bg-gradient-to-r  hover:from-emerald-700  text-white font-medium rounded-lg text-center shadow-lg transition-all flex justify-center items-center transform hover:translate-y-0.5 duration-300 border border-emerald-500 text-base"
                >
                  Back
                </button>
              )}

              {inquiryData.tripType === "pre-planned" && activeStep === inquirySteps.length - 1 &&
                <RazorpayPaymentButton
                  inquiryId={inquiryData.packageId || ''}
                  amount={inquiryData.price ? parseFloat(inquiryData.price) * 100 : 0}
                  onSuccess={(paymentId) => {
                    // Handle successful payment
                    console.log('Payment successful:', paymentId);
                    submitTravelInquiry(); // Submit the inquiry after payment
                  }}
                  onError={(error) => {
                    console.error('Payment failed:', error);
                    alert('Payment failed. Please try again.');
                  }}
                />
              }

              <button
                onClick={activeStep === inquirySteps.length - 1 ? submitTravelInquiry : handleNext}
                className={`w-full py-3 bg-gradient-to-r  text-white font-medium rounded-lg text-center shadow-lg transition-all flex justify-center items-center transform hover:translate-y-0.5 duration-300 border border-emerald-500 text-base ${activeStep === 0 ? 'w-full ml-auto' : ''}`}
              >
                {activeStep === inquirySteps.length - 1 ? 'Submit Inquiry' : 'Continue'}
              </button>
              
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TravelInquiryForm;