import React from 'react';
import { X } from 'lucide-react';
import { Order, PaymentMethod, UserDetails } from '../../types';
import { PaymentForm } from './PaymentForm';
import { PaymentMethodSelector } from './PaymentMethodSelector';
import { UserDetailsForm } from './UserDetailsForm';
import { useCheckout } from '../../hooks/useCheckout';

interface Props {
  onClose: () => void;
  onComplete: (order: Order) => void;
}

export function CheckoutModal({ onClose, onComplete }: Props) {
  const { step, setStep, calculateTotal, processCheckout } = useCheckout();
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>({ type: 'credit_card' });
  const [userDetails, setUserDetails] = React.useState<UserDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
  });
  
  const totalAmount = calculateTotal();

  const handleSubmitDetails = () => {
    setStep('payment');
  };

  const handlePayment = () => {
    const order = processCheckout(userDetails, paymentMethod);
    onComplete(order);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">
            {step === 'details' ? 'Enter Details' : 'Payment'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {step === 'details' ? (
            <>
              <UserDetailsForm
                userDetails={userDetails}
                onChange={setUserDetails}
              />
              <div className="mt-6">
                <button
                  onClick={handleSubmitDetails}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                  Continue to Payment
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <PaymentMethodSelector
                selected={paymentMethod.type}
                onSelect={(type) => setPaymentMethod({ type })}
              />
              <PaymentForm
                totalAmount={totalAmount}
                paymentMethod={paymentMethod.type}
              />
              <button
                onClick={handlePayment}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Pay ${totalAmount}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}