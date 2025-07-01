import React from 'react';
import { CreditCard, Building2, Wallet, QrCode } from 'lucide-react';
import { PaymentMethod } from '../../types';

interface Props {
  selected: PaymentMethod['type'];
  onSelect: (type: PaymentMethod['type']) => void;
}

export function PaymentMethodSelector({ selected, onSelect }: Props) {
  const methods = [
    {
      type: 'credit_card' as const,
      label: 'Credit Card',
      icon: CreditCard,
    },
    {
      type: 'debit_card' as const,
      label: 'Debit Card',
      icon: Wallet,
    },
    {
      type: 'bank_transfer' as const,
      label: 'Bank Transfer',
      icon: Building2,
    },
    {
      type: 'upi' as const,
      label: 'UPI',
      icon: QrCode,
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Payment Method</h3>
      <div className="grid grid-cols-4 gap-4">
        {methods.map(({ type, label, icon: Icon }) => (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
              selected === type
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}