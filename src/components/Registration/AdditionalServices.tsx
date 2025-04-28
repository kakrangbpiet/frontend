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
    const basePrice = inquiryData.price * inquiryData.passengerCount;
    const additionalCost = inquiryData.additionalServicesCost || 0;
    const totalPrice = basePrice + additionalCost;

    setInquiryData(prev => ({
      ...prev,
      totalPrice: totalPrice
    }));
  }, [inquiryData.price, inquiryData.passengerCount, inquiryData.additionalServicesCost]);

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
    <div className="mt-2 bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700 shadow-lg">
    <h3 className="text-xl text-white font-bold mb-2 pb-2 border-b border-gray-600">Booking Summary</h3>
    
    {/* Services List */}
    <div className="space-y-3 py-2">
      {/* Medical Service */}
      <div className="flex items-center justify-between px-2 py-1 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
        <div className="flex items-center">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              id="medical-service"
              checked={true}
              disabled={true}
              className="h-5 w-5 text-emerald-500 rounded border-gray-400 focus:ring-emerald-400 bg-gray-600"
            />
            <label htmlFor="medical-service" className="ml-3 text-sm font-semibold text-white">
              Medical Services
            </label>
          </div>
          <div
            className="ml-2 cursor-pointer group"
            onMouseEnter={() => setShowTooltip({ ...showTooltip, medical: true })}
            onMouseLeave={() => setShowTooltip({ ...showTooltip, medical: false })}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
            </svg>
            {showTooltip.medical && (
              <div className="absolute z-10 w-64 p-3 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 text-sm text-gray-700">
                We provide free medical services including first aid and emergency support
              </div>
            )}
          </div>
        </div>
        <span className="px-3 py-1 bg-emerald-900/30 text-emerald-400 font-bold rounded-full text-sm">Included</span>
      </div>
  
      {/* Translator Service */}
      <div className="flex items-center justify-between px-2 py-1 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
        <div className="flex items-center">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              id="translator-service"
              checked={inquiryData.additionalServices?.translator || false}
              onChange={(e) => handleServiceChange('translator', e.target.checked)}
              className="h-5 w-5 text-blue-500 rounded border-gray-400 focus:ring-blue-400 bg-gray-600"
            />
            <label htmlFor="translator-service" className="ml-3 text-sm font-semibold text-white">
              Professional Translator
            </label>
          </div>
          <div
            className="ml-2 cursor-pointer group"
            onMouseEnter={() => setShowTooltip({ ...showTooltip, translator: true })}
            onMouseLeave={() => setShowTooltip({ ...showTooltip, translator: false })}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
            </svg>
            {showTooltip.translator && (
              <div className="absolute z-10 w-72 p-3 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 text-sm text-gray-700">
                Certified multilingual guides available in English, Spanish, French, and local dialects
              </div>
            )}
          </div>
        </div>
        <span className="text-lg font-bold text-amber-400">₹10,000</span>
      </div>
  
      {/* Photography Service */}
      <div className="flex items-center justify-between px-2 py-1 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
        <div className="flex items-center">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              id="photography-service"
              checked={inquiryData.additionalServices?.photography || false}
              onChange={(e) => handleServiceChange('photography', e.target.checked)}
              className="h-5 w-5 text-blue-500 rounded border-gray-400 focus:ring-blue-400 bg-gray-600"
            />
            <label htmlFor="photography-service" className="ml-3 text-sm font-semibold text-white">
              Photography & Videography
            </label>
          </div>
          <div
            className="ml-2 cursor-pointer group"
            onMouseEnter={() => setShowTooltip({ ...showTooltip, photography: true })}
            onMouseLeave={() => setShowTooltip({ ...showTooltip, photography: false })}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
            </svg>
            {showTooltip.photography && (
              <div className="absolute z-10 w-72 p-3 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 text-sm text-gray-700">
                Professional 4K video and high-resolution photos, delivered digitally
              </div>
            )}
          </div>
        </div>
        <span className="text-lg font-bold text-amber-400">₹10,000</span>
      </div>
    </div>
  
    {/* Additional Services Total */}
    {(inquiryData.additionalServices?.translator || inquiryData.additionalServices?.photography) && (
      <div className="mt-2 pt-2 border-t border-gray-600">
        <div className="flex justify-between items-center px-2">
          <span className="font-bold text-gray-300 text-sm">Additional Services:</span>
          <span className="font-bold text-blue-400 text-lg">{formatCurrency(inquiryData.additionalServicesCost)}</span>
        </div>
      </div>
    )}
  
    {/* Total Price Section */}
    <div className="mt-2 pt-2 border-t border-gray-600 relative">
      <div className="mb-2">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <span className="font-bold text-white text-lg">Trip Total</span>
            <div
              className="ml-2 cursor-pointer group"
              onMouseEnter={() => setShowTooltip({ ...showTooltip, total: true })}
              onMouseLeave={() => setShowTooltip({ ...showTooltip, total: false })}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
              </svg>
              {showTooltip.total && (
                <div className="absolute z-10 w-80 p-3 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 text-sm text-gray-700">
                  <p className="font-semibold mb-1">Price Breakdown:</p>
                  <p>Base trip: {formatCurrency(inquiryData.price)} × {inquiryData.passengerCount}</p>
                  <p>Additional services: {formatCurrency(inquiryData.additionalServicesCost || 0)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
  
        <div className="bg-gray-700/40 rounded-lg p-4">
          <div className="flex justify-between text-gray-300 mb-1">
            <span>Base Price:</span>
            <span>{formatCurrency(inquiryData.price)} × {inquiryData.passengerCount}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Additional Services:</span>
            <span>{formatCurrency(inquiryData.additionalServicesCost || 0)}</span>
          </div>
        </div>
      </div>
  
      {/* Grand Total */}
      <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg border border-gray-600">
        <span className="font-bold text-white text-xl">Total Amount</span>
        <span className="font-extrabold text-2xl text-blue-400">
          {formatCurrency(inquiryData.totalPrice || 0)}
        </span>
      </div>
    </div>
  </div>
  );
}

export default AdditionalServices;