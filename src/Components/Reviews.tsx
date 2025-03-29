import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define Review Type
type Review = {
  id: number;
  category: string;
  name: string;
  review: string;
  rating: number;
  date: string;
};

const categories = ["Men's Shoes", "Women's Shoes", "Kids' Shoes", "Sneakers"];

const Review: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [showForm, setShowForm] = useState(false);

  // Load from localStorage on component mount
  useEffect(() => {
    const storedReviews = localStorage.getItem("productReviews");
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, []);

  // Save to localStorage whenever reviews change
  useEffect(() => {
    localStorage.setItem("productReviews", JSON.stringify(reviews));
  }, [reviews]);

  // Handle Submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !reviewText || rating === 0) {
      toast.error("⚠️ Please fill out all fields!", { theme: "dark" });
      return;
    }

    const newReview: Review = {
      id: Date.now(),
      category: selectedCategory,
      name,
      review: reviewText,
      rating,
      date: new Date().toLocaleDateString(),
    };

    setReviews([...reviews, newReview]);
    toast.success(" Review submitted successfully!", { theme: "dark" });

    // Reset Form
    setName("");
    setReviewText("");
    setRating(0);
    setShowForm(false);
  };

  // Handle Delete Review
  const handleDelete = (id: number) => {
    const updatedReviews = reviews.filter((review) => review.id !== id);
    setReviews(updatedReviews);
    toast.info("🗑️ Review deleted!", { theme: "dark" });
  };

  // Filter reviews by selected category
  const filteredReviews = reviews.filter(
    (review) => review.category === selectedCategory
  );

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <ToastContainer />

      {/* Title */}
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Filter highlighted reviews for the product by:
      </h1>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-4 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-md font-semibold transition-all ${
              selectedCategory === category
                ? "bg-green-800 text-white"
                : "bg-white text-gray-800 border border-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Reviews Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredReviews.length === 0 ? (
          <p className="col-span-3 text-center text-gray-500">
            No reviews yet. Be the first to write one!
          </p>
        ) : (
          filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-4 rounded-md shadow-md relative"
            >
              <div className="flex items-center mb-3">
                <div className="h-10 w-10 bg-green-800 text-white font-bold rounded-full flex items-center justify-center">
                  {review.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold">{review.name}</h3>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              </div>
              <p className="text-yellow-500 text-lg">
                {"★".repeat(review.rating)}{" "}
                {"☆".repeat(5 - review.rating)}
              </p>
              <h4 className="font-semibold mt-2">{review.category}</h4>
              <p className="text-gray-600 mt-1 line-clamp-3">{review.review}</p>
              <button
                onClick={() => handleDelete(review.id)}
                className="absolute top-3 right-3 text-red-500 font-bold"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add Review Button */}
      <button
        onClick={() => setShowForm(true)}
        className="mt-6 bg-green-800 hover:bg-green-900 text-white px-6 py-2 rounded-md"
      >
        Add New Review
      </button>

      {/* Form (Modal-like) */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-4 p-4 bg-white shadow-md rounded-md w-full md:w-1/2 mx-auto"
        >
          <h2 className="font-semibold text-lg mb-3">Write a Review</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mb-2 border rounded-md"
            />
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full p-2 mb-2 border rounded-md"
            >
              <option value={0}>Select Rating</option>
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star} Stars
                </option>
              ))}
            </select>
          </div>

          <textarea
            placeholder="Write your review"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full p-2 mb-2 border rounded-md h-20"
          />

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-800 hover:bg-green-900 text-white px-4 py-2 rounded-md"
            >
              Submit Review
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Review;
