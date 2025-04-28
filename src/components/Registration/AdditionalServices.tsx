import { useState, useEffect } from 'react';

interface AdditionalServicesProps {
  inquiryData: any;
  setInquiryData: any;
  tripPrice?: number; 
  passengerCount?: number; 
}

function AdditionalServices({ 
  inquiryData, 
  setInquiryData, 
  tripPrice = 0, 
  passengerCount = 1 
}: AdditionalServicesProps) {
  const [showTooltip, setShowTooltip] = useState({
    medical: false,
    translator: false,
    photography: false,
    total: false,
  });

  // Initialize additional services
  useEffect(() => {
    setInquiryData(prev => ({
      ...prev,
      additionalServices: {
        ...prev.additionalServices,
        medical: true,
        translator: prev.additionalServices?.translator || false,
        photography: prev.additionalServices?.photography || false
      }
    }));
  }, []);

  // Calculate additional services cost
  useEffect(() => {
    const translatorCost = inquiryData.additionalServices?.translator ? 10000 : 0;
    const photographyCost = inquiryData.additionalServices?.photography ? 10000 : 0;
    const totalAdditionalCost = translatorCost + photographyCost;
    
    setInquiryData(prev => ({
      ...prev,
      additionalServicesCost: totalAdditionalCost
    }));
  }, [inquiryData.additionalServices?.translator, inquiryData.additionalServices?.photography]);
  
  // Calculate total price
  useEffect(() => {
    const basePrice = tripPrice * passengerCount;
    const additionalCost = inquiryData.additionalServicesCost || 0;
    const totalPrice = basePrice + additionalCost;
    
    setInquiryData(prev => ({
      ...prev,
      totalPrice: totalPrice
    }));
  }, [tripPrice, passengerCount, inquiryData.additionalServicesCost]);

  const handleServiceChange = (service: string, checked: boolean) => {
    setInquiryData(prev => ({
      ...prev,
      additionalServices: {
        ...prev.additionalServices,
        [service]: checked
      }
    }));
  };

  // Format currency to INR
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg text-white font-medium mb-4">Additional Services</h3>
      <div className="space-y-4">
        <div className="flex items-center relative">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="medical-service"
              checked={true}
              disabled={true}
              className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="medical-service" className="ml-3 text-md font-bold text-white">
              Medical Services
            </label>
          </div>
          <div 
            className="ml-2 cursor-pointer relative"
            onMouseEnter={() => setShowTooltip({...showTooltip, medical: true})}
            onMouseLeave={() => setShowTooltip({...showTooltip, medical: false})}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
            </svg>
            {showTooltip.medical && (
              <div className="absolute z-10 w-64 p-2 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 text-sm text-gray-700">
                We provide free medical services
              </div>
            )}
          </div>
          <span className="ml-auto text-md font-medium text-green-600">Free</span>
        </div>
        
        <div className="flex items-center relative">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="translator-service"
              checked={inquiryData.additionalServices?.translator || false}
              onChange={(e) => handleServiceChange('translator', e.target.checked)}
              className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="translator-service" className="ml-3 text-md font-bold text-white">
              Translator
            </label>
          </div>
          <div 
            className="ml-2 cursor-pointer relative"
            onMouseEnter={() => setShowTooltip({...showTooltip, translator: true})}
            onMouseLeave={() => setShowTooltip({...showTooltip, translator: false})}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
            </svg>
            {showTooltip.translator && (
              <div className="absolute z-10 w-64 p-2 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 text-sm text-gray-700">
                We have the best translators and guides
              </div>
            )}
          </div>
          <span className="ml-auto text-md font-extrabold text-green-700">₹10,000</span>
        </div>
        
        <div className="flex items-center relative">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="photography-service"
              checked={inquiryData.additionalServices?.photography || false}
              onChange={(e) => handleServiceChange('photography', e.target.checked)}
              className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="photography-service" className="ml-3 text-md font-bold text-white">
              Videography/Photography
            </label>
          </div>
          <div 
            className="ml-2 cursor-pointer relative"
            onMouseEnter={() => setShowTooltip({...showTooltip, photography: true})}
            onMouseLeave={() => setShowTooltip({...showTooltip, photography: false})}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
            </svg>
            {showTooltip.photography && (
              <div className="absolute z-10 w-64 p-2 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 text-sm text-gray-700">
                We have the best photographers and videographers
              </div>
            )}
          </div>
          <span className="ml-auto text-md font-extrabold text-green-700">₹10,000</span>
        </div>
        
        {(inquiryData.additionalServices?.translator || inquiryData.additionalServices?.photography) && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between">
              <span className="font-bold text-white">Additional Services Total:</span>
              <span className="font-extrabold text-blue-600">₹{inquiryData.additionalServicesCost}</span>
            </div>
          </div>
        )}

        {/* Total Price Section */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="font-bold text-white text-lg">Total Price:</span>
              <div 
                className="ml-2 cursor-pointer relative"
                onMouseEnter={() => setShowTooltip({...showTooltip, total: true})}
                onMouseLeave={() => setShowTooltip({...showTooltip, total: false})}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                </svg>
                {showTooltip.total && (
                  <div className="absolute z-10 w-72 p-2 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 text-sm text-gray-700">
                    Trip price (₹{tripPrice} × {passengerCount}) + Additional services (₹{inquiryData.additionalServicesCost || 0})
                  </div>
                )}
              </div>
            </div>
            <span className="font-extrabold text-xl text-blue-600">
              {formatCurrency(inquiryData.totalPrice || 0)}
            </span>
          </div>
          <div className="mt-2 text-sm text-white/70">
            <p>Base trip: {formatCurrency(tripPrice)} × {passengerCount} {passengerCount > 1 ? 'passengers' : 'passenger'}</p>
            <p>Additional services: {formatCurrency(inquiryData.additionalServicesCost || 0)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdditionalServices;