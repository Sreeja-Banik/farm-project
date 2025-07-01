import React from 'react';
import { Tractor } from 'lucide-react';
import { UserMenu } from './auth/UserMenu';
import { ActionBar } from './filters/ActionBar';

interface Props {
  onCartClick: () => void;
  onOrdersClick: () => void;
  setLoginModalOpen: (open: boolean) => void;
}

export function Header({ onCartClick, onOrdersClick,setLoginModalOpen }: Props) {
  return (
    <header className="sticky top-0 bg-white shadow-sm z-20">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Tractor className="w-8 h-8 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">Farm Equipment Rental</h1>
          </div>
          <div className="flex items-center gap-4">
            <UserMenu
                setLoginModalOpen={setLoginModalOpen}
            />
            <ActionBar
              onCartClick={onCartClick}
              onOrdersClick={onOrdersClick}
            />
          </div>
        </div>
      </div>
    </header>
  );
}