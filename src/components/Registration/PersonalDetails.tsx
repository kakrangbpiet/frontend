import { Box } from '@mui/material';
import { TravelInquiry } from '../../redux/slices/Travel/Booking/BoookTravelSlice';

interface PersonalDetailsProps {
  inquiryData: any;
  setInquiryData: any;
  isRegister?: boolean;
  shouldShowRegister?: boolean;
}

/**
 * Component for collecting personal details and passenger count
 */
function PersonalDetails({ inquiryData, setInquiryData, isRegister, shouldShowRegister }: PersonalDetailsProps) {
  const handleChange = (field: keyof TravelInquiry, value: string | number) => {
    setInquiryData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Box sx={{ px: 2, mt: 2 }}>
      {/* Name input */}
      <div className="mb-1">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Your Name
        </label>
        {inquiryData.name && (
          <p className="text-xs text-gray-500 dark:text-gray-400">We'll use this name for your booking</p>
        )}
      </div>
      <input
        type="text"
        id="name"
        value={inquiryData.email}
        onChange={(e) => handleChange('name', e.target.value)}
        disabled={!shouldShowRegister && isRegister}
        className="w-full px-4 py-3 rounded-lg text-white border border-gray-300 
             text-gray-800 font-medium focus:border-blue-500 focus:ring-2 
             focus:ring-blue-200 transition-all duration-200 outline-none "
        placeholder="Enter your full name"
        required
      />

      {/* Passenger count input */}
      {!isRegister && (
        <>
          <div className="mb-1 mt-4">
            <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Number of Passengers
            </label>
            {inquiryData.passengerCount && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {inquiryData.passengerCount} {inquiryData.passengerCount === 1 ? 'person' : 'people'} will be traveling
              </p>
            )}
          </div>
          <input
            type="number"
            id="passengerCount"
            value={inquiryData.passengerCount}
            onChange={(e) => handleChange('passengerCount', e.target.value)}
            disabled={!shouldShowRegister && isRegister}
            className="w-full px-4 py-3 rounded-lg text-white border border-gray-300 
             text-gray-800 font-medium focus:border-blue-500 focus:ring-2 
             focus:ring-blue-200 transition-all duration-200 outline-none "
            placeholder="Enter number of passengers"
            required
          />
        </>
      )}

      {/* Special requests input */}
      {!isRegister && (
        <>
          <div className="mb-1 mt-4">
            <label htmlFor="requests" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Special Requests
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Let us know if you have any special requirements
            </p>
          </div>


          <textarea
            id="specialRequests"
            value={inquiryData.specialRequests}  // Changed from email to specialRequests
            onChange={(e) => handleChange('specialRequests', e.target.value)}
            disabled={!shouldShowRegister && isRegister}
            rows={4}  // Number of visible rows
            className="w-full px-4 py-3 rounded-lg border border-gray-300 
           text-white font-medium focus:border-blue-500 focus:ring-2 
           focus:ring-blue-200 transition-all duration-200 outline-none
           resize-y"  // Allows vertical resizing
            placeholder="E.g., dietary restrictions, accessibility needs, etc."
            required
          />
        </>
      )}
    </Box>
  );
}

export default PersonalDetails;