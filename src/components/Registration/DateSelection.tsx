import { DateAvailability } from '../../redux/slices/Travel/TravelSlice';
import { useState, useEffect } from 'react';
import { formatDate } from '../../page/SinglePackage/DateAvailability';
import CustomDateField from '../CustomDateField';
import { Info } from 'lucide-react';

interface DateSelectionTabsProps {
  tripType: 'pre-planned' | 'custom';
  setTripType: (type: 'pre-planned' | 'custom') => void;
  dateAvailabilities: DateAvailability[];
  startDate?: number;
  endDate?: number;
  setStartDate: (date?: number) => void;
  setEndDate: (date?: number) => void;
  onValidationError?: (message: string) => void;
}

function DateSelectionTabs({
  tripType,
  setTripType,
  dateAvailabilities,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  onValidationError
}: DateSelectionTabsProps) {
  const [activeTab, setActiveTab] = useState<'pre-planned' | 'custom'>(tripType);
  const [dateError, setDateError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  // Validate date selections
  useEffect(() => {
    if (startDate && endDate && startDate > endDate) {
      const errorMsg = "End date cannot be before start date";
      setDateError(errorMsg);
      onValidationError?.(errorMsg);
    } else {
      setDateError(null);
    }
  }, [startDate, endDate, onValidationError]);

  const handleTabChange = (newTabValue: 'pre-planned' | 'custom') => {
    setActiveTab(newTabValue);
    setTripType(newTabValue);
    setDateError(null);
  };

  const getAvailabilityStatus = (spots: number) => {
    if (spots > 5) {
      return {
        color: 'bg-green-500',
        text: `${spots} spots available`,
        textColor: 'text-black-300'
      };
    } else if (spots > 0) {
      return {
        color: 'bg-yellow-500',
        text: `Only ${spots} spots left!`,
        textColor: 'text-yellow-300'
      };
    } else {
      return {
        color: 'bg-red-500',
        text: 'Fully booked',
        textColor: 'text-red-300'
      };
    }
  };

  return (
    <div className="w-full mt-6">
      {/* Radio Button Tabs */}
      <div 
        role="radiogroup" 
        aria-label="Trip date selection options"
        className="flex flex-col gap-3 mb-4"
      >
        <label 
          className={`flex items-center rounded-xl p-4 cursor-pointer transition-all duration-300 ${
            activeTab === 'pre-planned' 
              ? 'bg-gray-800 border border-blue-500/50' 
              : 'bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10'
          }`}
        >
          <div 
            className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
              activeTab === 'pre-planned' ? 'border-blue-500' : 'border-gray-400'
            }`}
          >
            {activeTab === 'pre-planned' && (
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            )}
          </div>
          <input
            type="radio"
            id="pre-planned-radio"
            name="trip-type"
            value="pre-planned"
            checked={activeTab === 'pre-planned'}
            onChange={() => handleTabChange('pre-planned')}
            className="sr-only"
            aria-labelledby="pre-planned-label"
          />
          <span 
            id="pre-planned-label"
            className={`font-medium ${activeTab === 'pre-planned' ? 'text-blue-500' : 'text-gray-200'}`}
          >
            Pre-Planned Dates
          </span>
        </label>
        
        <label 
          className={`flex items-center rounded-xl p-4 cursor-pointer transition-all duration-300 ${
            activeTab === 'custom' 
              ? 'bg-gray-800 border border-blue-500/50' 
              : 'bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10'
          }`}
        >
          <div 
            className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
              activeTab === 'custom' ? 'border-blue-500' : 'border-gray-400'
            }`}
          >
            {activeTab === 'custom' && (
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            )}
          </div>
          <input
            type="radio"
            id="custom-radio"
            name="trip-type"
            value="custom"
            checked={activeTab === 'custom'}
            onChange={() => handleTabChange('custom')}
            className="sr-only"
            aria-labelledby="custom-label"
          />
          <span 
            id="custom-label"
            className={`font-medium ${activeTab === 'custom' ? 'text-blue-500' : 'text-gray-200'}`}
          >
            Custom Dates
          </span>
        </label>
      </div>

      {/* Pre-planned dates panel */}
      <div 
        role="tabpanel"
        id="panel-pre-planned"
        aria-labelledby="pre-planned-label"
        className={`transition-all duration-500 ${
          activeTab === 'pre-planned' 
            ? 'opacity-100 max-h-[30rem] transform translate-y-0' 
            : 'opacity-0 max-h-0 overflow-hidden transform -translate-y-4'
        }`}
      >
        <div className="mt-2 rounded-xl bg-white/20 backdrop-blur-md shadow-lg border border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div className="font-medium text-blue-400 ml-1 mb-3 flex items-center">
              <span>Available Dates</span>
              <div className="relative ml-2">
                <Info 
                  size={16} 
                  className="text-blue-400 cursor-help"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  aria-label="Information about availability"
                />
                {showTooltip && (
                  <div className="absolute top-full left-0 mt-2 p-2 bg-gray-800 text-xs text-white rounded shadow-lg z-10 w-48">
                    Green indicates plenty of spots available, yellow means limited spots, and red means fully booked.
                  </div>
                )}
              </div>
            </div>
            {dateAvailabilities.length > 0 && (
              <span className="text-xs text-gray-400">
                {dateAvailabilities.length} options available
              </span>
            )}
          </div>
          
          {dateAvailabilities.length === 0 ? (
            <div className="text-center py-12 text-gray-400 flex flex-col items-center">
              <span className="text-3xl mb-2">😢</span>
              <p>No dates currently available</p>
              <p className="text-sm mt-2">Try checking back later or choose custom dates</p>
            </div>
          ) : (
            <div className="max-h-64 overflow-auto pr-1 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent">
              {dateAvailabilities.map((availability, index) => {
                const status = getAvailabilityStatus(availability.availableSpots);
                return (
                  <div
                    key={index}
                    className={`p-4 my-3 rounded-lg cursor-pointer transition-all duration-300 ${
                      startDate === availability.startDate 
                        ? 'bg-blue-500/15 border border-blue-500 shadow-md shadow-blue-500/10' 
                        : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:shadow-md hover:-translate-y-0.5'
                    }`}
                    onClick={() => {
                      setStartDate(availability.startDate);
                      setEndDate(availability.endDate);
                    }}
                    aria-selected={startDate === availability.startDate}
                    role="option"
                  >
                    <p className="font-medium flex justify-between">
                      <span>{formatDate(availability.startDate)} - {formatDate(availability.endDate)}</span>
                      <span className="text-sm text-gray-400">
                        {Math.ceil((availability.endDate - availability.startDate) / (1000 * 60 * 60 * 24))} days
                      </span>
                    </p>
                    <div className="flex items-center mt-2">
                      <div className={`w-2 h-2 rounded-full mr-2 ${status.color}`}></div>
                      <p className={`text-sm ${status.textColor}`}>
                        {status.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Custom dates panel */}
      <div 
        role="tabpanel"
        id="panel-custom"
        aria-labelledby="custom-label"
        className={`transition-all duration-500 ${
          activeTab === 'custom' 
            ? 'opacity-100 max-h-[30rem] transform translate-y-0' 
            : 'opacity-0 max-h-0 overflow-hidden transform -translate-y-4'
        }`}
      >
        <div className="mt-2 rounded-xl bg-white/5 backdrop-blur-md shadow-lg border border-white/10 p-4">
          <div className="mb-4">
            <CustomDateField
              placeholder="Start Date"
              value={startDate || null}
              onChange={(date) => setStartDate(date || undefined)}
              fullWidth
              minDate={Date.now()} // Cannot select dates in the past
              aria-label="Select start date"
            />
          </div>

          <div className="mb-2">
            <CustomDateField
              placeholder="End Date"
              value={endDate || null}
              onChange={(date) => setEndDate(date || undefined)}
              fullWidth
              minDate={startDate || Date.now()} // Cannot select end date before start date
              aria-label="Select end date"
            />
          </div>

          {dateError && (
            <div className="mt-2 text-red-400 text-sm bg-red-400/10 p-2 rounded border border-red-400/20">
              {dateError}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default DateSelectionTabs;