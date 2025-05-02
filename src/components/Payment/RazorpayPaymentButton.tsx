import { useState } from 'react';
// import { loadScript } from '@razorpay/checkout';
import { useNavigate } from 'react-router-dom';

interface RazorpayPaymentButtonProps {
  inquiryId: string;
  amount: number; // amount in paise (e.g., 1000 = ₹10)
  currency?: string;
  buttonText?: string;
  onSuccess?: (paymentId: string) => void;
  onError?: (error: any) => void;
}

const RazorpayPaymentButton = ({
  inquiryId,
  amount,
  currency = 'INR',
  buttonText = 'Pay Now',
  onSuccess,
  onError
}: RazorpayPaymentButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      setLoading(true);
      
      setShowPopup(true);
      
      setTimeout(() => {
        setLoading(false);
      }, 500);
      
      // Load Razorpay script
    //   await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      
      // In a real app, you would fetch these details from your backend
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'YOUR_RAZORPAY_KEY_ID',
        amount: amount.toString(),
        currency,
        name: 'Travel Package Booking',
        description: `Payment for travel inquiry #${inquiryId}`,
        order_id: '', // This should come from your backend
        handler: function (response: any) {
          // Handle successful payment
          if (onSuccess) {
            onSuccess(response.razorpay_payment_id);
          }
          // You might want to verify the payment signature here
          navigate('/payment-success', { state: { inquiryId, paymentId: response.razorpay_payment_id } });
        },
        prefill: {
          name: '', // You can prefill customer details
          email: '',
          contact: ''
        },
        theme: {
          color: '#3399cc'
        }
      };

      // @ts-ignore
      // const razorpay = new window.Razorpay(options);
      // razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      if (onError) {
        onError(error);
      }
    } finally {
      //setLoading(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <button
        onClick={handlePayment}
        disabled={loading || !inquiryId}
        className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-medium rounded-lg text-center shadow-lg transition-all flex justify-center items-center transform hover:translate-y-0.5 duration-300 border border-emerald-500 text-base"
      >
        {loading ? 'Processing...' : buttonText}
      </button>

      {showPopup && (
        <div className="fixed inset-0 bg-black/90 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl transform transition-all">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Not Available</h3>
              <p className="text-gray-500 mb-4">
                This feature is coming soon! Thank you for your patience.
              </p>
              <button
                onClick={closePopup}
                className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RazorpayPaymentButton;