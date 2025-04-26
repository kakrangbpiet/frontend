import { DateAvailability } from '../../redux/slices/Travel/TravelSlice';
import { useState, useEffect } from 'react';
import { DateAvailabilityDisplay } from '../../page/SinglePackage/DateAvailability';
import CustomDateField from '../CustomDateField';

interface DateSelectionTabsProps {
  tripType: 'pre-planned' | 'custom';
  setTripType: (type: 'pre-planned' | 'custom') => void;
  dateAvailabilities: DateAvailability[];
  startDate?: number;
  endDate?: number;
  setStartDate: (date?: number) => void;
  setEndDate: (date?: number) => void;
  onValidationError?: (message: string) => void;
  isCustomForm?:boolean;
}

function DateSelectionTabs({
  tripType,
  setTripType,
  dateAvailabilities,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  onValidationError,
  isCustomForm
}: DateSelectionTabsProps) {
  const [activeTab, setActiveTab] = useState<'pre-planned' | 'custom'>(tripType);
  const [dateError, setDateError] = useState<string | null>(null);

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


  return (
    <div className="w-full mt-6">
      {/* Radio Button Tabs */}
<div 
  role="radiogroup" 
  aria-label="Trip date selection options"
  className="flex flex-row gap-2 mb-3"
>
  {!isCustomForm && (
    <label 
      className={`flex-1 flex items-center rounded-lg p-2 cursor-pointer transition-all duration-300 text-sm ${
        activeTab === 'pre-planned' 
          ? 'bg-blue-700/50 border border-blue-500/50 hover:bg-transparent' 
          : 'bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10'
      }`}
    >
      <div 
        className={`w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center ${
          activeTab === 'pre-planned' ? 'border-blue-500' : 'border-gray-400'
        }`}
      >
        {activeTab === 'pre-planned' && (
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
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
  )}

  <label 
    className={`flex-1 flex items-center rounded-lg p-2 cursor-pointer transition-all duration-300 text-sm ${
      activeTab === 'custom' 
        ? 'bg-blue-700/50 border border-blue-500/50 hover:bg-transparent' 
        : 'bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10'
    }`}
  >
    <div 
      className={`w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center ${
        activeTab === 'custom' ? 'border-blue-500' : 'border-gray-400'
      }`}
    >
      {activeTab === 'custom' && (
        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
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
    
    {dateAvailabilities.length === 0 ? (
      <div className="text-center py-12 text-gray-400 flex flex-col items-center">
        <span className="text-3xl mb-2">😢</span>
        <p>No dates currently available</p>
        <p className="text-sm mt-2">Try checking back later or choose custom dates</p>
      </div>
    ) : (
      <div className="max-h-64 overflow-auto pr-1 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent">
          <DateAvailabilityDisplay dateAvailabilities={dateAvailabilities} startDate={startDate} setStartDate={setStartDate} setEndDate={setEndDate} />
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