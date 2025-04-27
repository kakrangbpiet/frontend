import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TravelInquiry } from '../../redux/slices/Travel/Booking/BoookTravelSlice';
import { SelectConactVerified, SelectContact, selectTrxId, setContactVerified } from '../../redux/slices/login/authSlice';
import { registerNumberDispatcher, registerNumberOtpDispatcher } from '../../redux/slices/login/authApiSlice';
import { AppDispatch } from '../../redux/store';

interface ContactDetailsProps {
  inquiryData: any;
  setInquiryData: any;
  isRegister?: boolean;
  shouldShowRegister?: boolean;
}

function ContactDetails({ inquiryData, setInquiryData, isRegister, shouldShowRegister }: ContactDetailsProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [phoneInput, setPhoneInput] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const isContactVerified = useSelector(SelectConactVerified);
  const verifiedPhoneNumber = useSelector(SelectContact);
  const trxId = useSelector(selectTrxId);

  useEffect(() => {
    if (isContactVerified) {
      setInquiryData(prev => ({
        ...prev,
        phoneNumber: verifiedPhoneNumber
      }));
    }
  }, [isContactVerified, verifiedPhoneNumber]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneInput(e.target.value);
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtpInput(e.target.value);
  };

  const handleSendOtp = async () => {
    try {
      await dispatch(registerNumberDispatcher(phoneInput));
      setShowOtpField(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const deviceId = "550e8400-e29b-41d4-a716-446655440000";
      await dispatch(registerNumberOtpDispatcher({
        otp: otpInput,
        trxId,
        deviceId,
        phoneNumber: phoneInput
      }));
      
      setInquiryData(prev => ({
        ...prev,
        phoneNumber: phoneInput
      }));
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  const handleEditNumber = () => {
    if (shouldShowRegister) {
      setShowOtpField(false);
      setOtpInput('');
      dispatch(setContactVerified({ isContactVerified: false }));
    }
  };

  const handleChange = (field: keyof TravelInquiry, value: string) => {
    setInquiryData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Email Input */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Email Address
        </label>
        <div className="relative">
          <input
            type="email"
            id="email"
            value={inquiryData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            disabled={!shouldShowRegister && isRegister}
            className="w-full px-4 py-3 rounded-lg bg-white/40 border border-gray-300 
             text-gray-800 font-medium focus:border-blue-500 focus:ring-2 
             focus:ring-blue-200 transition-all duration-200 outline-none"
            placeholder="your.email@example.com"
            required
          />
          {inquiryData.email && (
            <p className="mt-1 text-xs text-gray-500">We'll send booking confirmation to this email</p>
          )}
        </div>
      </div>
      
      {/* Phone Verification Flow */}
      {!isContactVerified ? (
        <>
          <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Phone Number
        </label>
     
            <div className="relative">
              <input
                type="tel"
                id="phone"
                value={phoneInput}
                onChange={handlePhoneChange}
                disabled={showOtpField || (!shouldShowRegister && isRegister)}
                className="w-full px-4 py-3 rounded-lg bg-white/40 border border-gray-300 
                text-gray-800 font-medium focus:border-blue-500 focus:ring-2 
                focus:ring-blue-200 transition-all duration-200 outline-none"
                placeholder="1234567890"
                required
              />
              {showOtpField && (
                <button 
                  type="button"
                  onClick={handleSendOtp}
                  disabled={!phoneInput || (!shouldShowRegister && isRegister)}
                  className="absolute right-2 top-2.5 text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Resend
                </button>
              )}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {showOtpField ? 
                "We've sent a verification code to your phone" : 
                "We'll verify this number for booking updates"}
            </p>
            
          </div>
          
          {!showOtpField ? (
            <div className="flex justify-center mt-2">
              <button 
                type="button"
                onClick={handleSendOtp}
                disabled={!phoneInput || (!shouldShowRegister && isRegister)}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 
                text-white font-medium shadow-md hover:shadow-lg disabled:opacity-50 
                disabled:cursor-not-allowed transition-all duration-200 w-full max-w-xs"
              >
                Send Verification Code
              </button>
            </div>
          ) : (
            <>
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                  Verification Code
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="otp"
                    value={otpInput}
                    onChange={handleOtpChange}
                    disabled={!shouldShowRegister && isRegister}
                    className="w-full px-4 py-3 rounded-lg bg-white/40 border border-gray-300 
                    text-gray-800 font-medium focus:border-blue-500 focus:ring-2 
                    focus:ring-blue-200 transition-all duration-200 outline-none"
                    placeholder="Enter 6-digit code"
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Check your SMS messages for the code</p>
              </div>
              
              <div className="flex flex-col gap-3">
                <button 
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={!otpInput || isContactVerified || (!shouldShowRegister && isRegister)}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 
                  text-white font-medium shadow-md hover:shadow-lg disabled:opacity-50 
                  disabled:cursor-not-allowed transition-all duration-200"
                >
                  Verify Phone Number
                </button>
                
                {!isRegister && (
                  <button 
                    type="button"
                    onClick={handleEditNumber}
                    disabled={!shouldShowRegister && isRegister}
                    className="px-6 py-2.5 rounded-lg bg-gray-100 border border-gray-300 
                    text-gray-700 font-medium hover:bg-gray-200 focus:outline-none 
                    focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  >
                    Edit Number
                  </button>
                )}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="rounded-lg bg-blue-50/50 border border-blue-200 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Verified Phone Number
              </h3>
              <p className="text-sm text-gray-700 mt-1">
                {verifiedPhoneNumber}
              </p>
              {shouldShowRegister && (
                <button 
                  type="button"
                  onClick={handleEditNumber}
                  className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800 focus:outline-none"
                >
                  Change Phone Number
                </button>
              )}
            </div>
          </div>
          <input type="hidden" name="phoneNumber" value={verifiedPhoneNumber || ''} />
        </div>
      )}
    </div>
  );
}

export default ContactDetails;