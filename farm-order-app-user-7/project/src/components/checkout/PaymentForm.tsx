import React, { useState } from 'react';
import { UPIPayment } from './UPIPayment';
import { PaymentMethod } from '../../types';

interface Props {
  totalAmount: number;
  paymentMethod: PaymentMethod['type'];
}

export function PaymentForm({ totalAmount, paymentMethod }: Props) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [upiId] = useState('farmequip@upi'); // In production, this would come from backend

  if (paymentMethod === 'upi') {
    return <UPIPayment amount={totalAmount} upiId={upiId} />;
  }

  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium">Card Number</label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="1234 5678 9012 3456"
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Expiry Date</label>
          <input
            type="text"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            placeholder="MM/YY"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">CVC</label>
          <input
            type="text"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            placeholder="123"
            className="w-full p-2 border rounded"
            required
          />
        </div>
      </div>
    </form>
  );
}