// RazorpayPaymentButton.tsx
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
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      setLoading(true);
      
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
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      if (onError) {
        onError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading || !inquiryId}
      className={`px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors ${
        loading ? 'opacity-70 cursor-not-allowed' : ''
      }`}
    >
      {loading ? 'Processing...' : buttonText}
    </button>
  );
};

export default RazorpayPaymentButton;