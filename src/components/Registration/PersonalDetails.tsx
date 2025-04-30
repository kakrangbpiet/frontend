import { Box } from '@mui/material';
import { TravelInquiry } from '../../redux/slices/Travel/Booking/BoookTravelSlice';

interface PersonalDetailsProps {
  inquiryData: any;
  setInquiryData: any;
  isRegister?: boolean;
  shouldShowRegister?: boolean;
}

function PersonalDetails({ inquiryData, setInquiryData, isRegister, shouldShowRegister }: PersonalDetailsProps) {
  const handleChange = (field: keyof TravelInquiry, value: string | number) => {
    setInquiryData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Box sx={{ mt: 1 }} className="space-y-3">
      {/* Name input */}
      <div>
        <label htmlFor="name" className="block text-xs font-medium text-gray-200 mb-1">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          value={inquiryData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          disabled={!shouldShowRegister && isRegister}
          className="w-full px-3 py-2 text-sm rounded-md text-gray-800 border border-gray-300 
             font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-200 
             transition-all duration-200 outline-none"
          placeholder="Enter your full name"
          required
        />
        {inquiryData.name && (
          <p className="text-xs text-gray-400">Booking name</p>
        )}
      </div>

      {/* Passenger count input */}
      {!isRegister && (
        <div>
          <label htmlFor="passengers" className="block text-xs font-medium text-gray-200 mb-1">
            Number of Passengers
          </label>
          <input
            type="number"
            id="passengerCount"
            value={inquiryData.passengerCount}
            onChange={(e) => handleChange('passengerCount', parseInt(e.target.value) || 1)}
            disabled={!shouldShowRegister && isRegister}
            className="w-full px-3 py-2 text-sm rounded-md text-gray-800 border border-gray-300 
               font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-200 
               transition-all duration-200 outline-none"
            placeholder="Enter number of passengers"
            min="1"
            required
          />
          {inquiryData.passengerCount && (
            <p className="text-xs text-gray-400">
              {inquiryData.passengerCount} {inquiryData.passengerCount === 1 ? 'person' : 'people'} traveling
            </p>
          )}
        </div>
      )}

      {/* Special requests input */}
      {!isRegister && (
        <div>
          <label htmlFor="requests" className="block text-xs font-medium text-gray-200 mb-1">
            Special Requests
          </label>
          <textarea
            id="specialRequests"
            value={inquiryData.specialRequests}
            onChange={(e) => handleChange('specialRequests', e.target.value)}
            disabled={!shouldShowRegister && isRegister}
            rows={3}
            className="w-full px-3 py-2 text-sm rounded-md text-gray-800 border border-gray-300 
               font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-200 
               transition-all duration-200 outline-none resize-y"
            placeholder="E.g., dietary restrictions, accessibility needs, etc."
          />
          <p className="text-xs text-gray-400">Optional: Let us know if you have any special requirements</p>
        </div>
      )}
    </Box>
  );
}

export default PersonalDetails;