import React from 'react';
import { QrCode } from 'lucide-react';

interface Props {
  amount: number;
  upiId: string;
}

export function UPIPayment({ amount, upiId }: Props) {
  // Mock QR code URL - in production, this would be generated server-side
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${upiId}%26am=${amount}%26pn=FarmEquipment`;

  return (
    <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg">
      <QrCode className="w-8 h-8 text-blue-600" />
      <img
        src={qrCodeUrl}
        alt="UPI QR Code"
        className="w-48 h-48"
      />
      <div className="text-center">
        <p className="font-medium">Scan QR code to pay ₹{amount}</p>
        <p className="text-sm text-gray-600">UPI ID: {upiId}</p>
      </div>
    </div>
  );
}