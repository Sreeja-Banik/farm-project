import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

interface Props {
  onSubmit: (rating: number, comment: string) => void;
  onRequestLogin: () => void;
}

export function AddReview({ onSubmit, onRequestLogin }: Props) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-600 mb-2">Please log in to add a review</p>
        <button
          onClick={onRequestLogin}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Login to Review
        </button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(rating, comment);
    setComment('');
    setRating(5);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              className="focus:outline-none"
            >
              <Star
                className={`w-6 h-6 ${
                  value <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border rounded-md"
          rows={3}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        Submit Review
      </button>
    </form>
  );
}