import { DateAvailability } from "../../redux/slices/Travel/TravelSlice";

// Add this utility function at the top of your file (or in a separate utils file)
export const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Add this component inside your SingleTravelPackageDetails file
export const DateAvailabilityDisplay = ({ dateAvailabilities }: { dateAvailabilities: DateAvailability[] }) => {
    return (
      <div className="bg-transparent backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-8 mb-8 border border-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-green-400">Available Dates</h2>
        
        {dateAvailabilities.length === 0 ? (
          <p className="text-white">No available dates currently scheduled.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dateAvailabilities.map((availability, index) => (
              <div key={index} className=" bg-opacity-10 rounded-lg p-4 border border-gray-600 hover:bg-opacity-20 transition">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-lg font-medium text-white">
                      {formatDate(availability.startDate)} - {formatDate(availability.endDate)}
                    </p>
                    <p className="text-sm text-gray-300">
                      {availability.availableSpots} of {availability.maxTravelers} spots available
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    availability.availableSpots > 0 
                      ? 'bg-green-900 text-green-300' 
                      : 'bg-red-900 text-red-300'
                  }`}>
                    {availability.availableSpots > 0 ? 'Available' : 'Sold Out'}
                  </span>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Duration:</span>
                    <span className="text-white">
                      {Math.ceil((availability.endDate - availability.startDate) / (60 * 60 * 24))} days
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };