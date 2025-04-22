import React, { useState } from "react";
import useAddReviews from "../../Hooks/Reviews/useAddReviews";
import { FaStar } from "react-icons/fa";

export default function ReviewForm({ productId }) {
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);

  const { mutate, isLoading, isError, isSuccess } = useAddReviews();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!rate) {
      setError("Please choose a rating");
      return;
    }

    if (comment.length < 3) {
      setError("Comment must be at least 3 characters");
      return;
    }

    try {
      mutate({
        productId,
        rate,
        comment,
      });
      setRate(0);
      setComment("");
    } catch (err) {
      setError(err.message || "An error occurred while submitting the review");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Add Your Review
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col items-center mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <div className="flex gap-1">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <FaStar
                  key={index}
                  className="cursor-pointer text-2xl transition-colors duration-200"
                  color={
                    (hoveredRating || rate) >= ratingValue
                      ? "#ffc107"
                      : "#e4e5e9"
                  }
                  onMouseEnter={() => setHoveredRating(ratingValue)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRate(ratingValue)}
                />
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Comment
          </label>
          <textarea
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            required
            className="w-full text-gray-700 px-4 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder:text-gray-400"
            placeholder="Share your thoughts with others..."
            rows="4"
            minLength={3}></textarea>
        </div>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 rounded-md text-white font-semibold transition ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
          }`}>
          {isLoading ? "Submitting..." : "Submit Review"}
        </button>

        {isError && (
          <p className="text-red-600 text-sm text-center mt-2">
            An error occurred while submitting your review.
          </p>
        )}

        {isSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4 mt-2">
            <p className="text-green-600 text-sm text-center">
              🎉 Review submitted successfully!
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
