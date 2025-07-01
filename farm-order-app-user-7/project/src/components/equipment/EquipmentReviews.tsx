import React from 'react';
import { Star } from 'lucide-react';

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface Props {
  reviews: Review[];
}

export function EquipmentReviews({ reviews }: Props) {
  return (
    <div className="border-t p-6">
      <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">{review.user}</span>
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}