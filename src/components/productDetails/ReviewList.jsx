import React, { useContext } from "react";
import { AuthContext } from "@/context/AuthContext/AuthContext";
import RemoveReview from "@/components/Reviews/Buttons/RemoveReview";

export default function ReviewList({ reviews }) {
  const { user } = useContext(AuthContext);

  if (!reviews.length) return <p className="text-gray-500">No reviews yet.</p>;

  return (
    <div className=" bg-gray-50  rounded-lg">
      {reviews.map((review) => (
        <div
          key={review._id}
          className=" p-6 flex  justify-between items-center border-b-2 border-gray-200 rounded-lg">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              {review.createdBy?.profile ? (
                <img
                  src={review.createdBy?.profile.secure_url}
                  alt={review.createdBy?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-xl font-semibold text-gray-600">
                    {review.createdBy?.name[0].toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <h3 className="font-semibold">{review.createdBy?.name}</h3>
                <p className="text-gray-500 text-sm">
                  {review.createdBy?.email}
                </p>
              </div>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
          {review.createdBy?.email === user?.email && (
            <RemoveReview reviewId={review._id} />
          )}
        </div>
      ))}
    </div>
  );
}
