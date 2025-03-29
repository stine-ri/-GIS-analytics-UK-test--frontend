import React, { useState, useRef, useEffect } from 'react';

const reviewsData = [
  { 
    name: 'Jordan Michaels', 
    review: 'The Nike Air Jordans are the best sneakers I’ve ever owned! Super comfortable and stylish.', 
    rating: 5, 
    date: '2025-03-20', 
    location: 'New York, USA' 
  },
  { 
    name: 'Emily Johnson', 
    review: 'I love the Nike Pegasus! Great support for running, and the design is sleek.', 
    rating: 5, 
    date: '2025-03-18', 
    location: 'Los Angeles, USA' 
  },
  { 
    name: 'Chris Anderson', 
    review: 'Affordable and durable. My Nike Air Max 270s have lasted me over a year with daily use.', 
    rating: 4, 
    date: '2025-03-15', 
    location: 'Chicago, USA' 
  },
  { 
    name: 'Sophia Carter', 
    review: 'The Nike Dunks are amazing! They fit perfectly and go well with any outfit.', 
    rating: 5, 
    date: '2025-03-12', 
    location: 'Houston, USA' 
  },
  { 
    name: 'Daniel Evans', 
    review: 'Fast shipping and great quality! The Nike Metcons are perfect for my workouts.', 
    rating: 4, 
    date: '2025-03-10', 
    location: 'Miami, USA' 
  },
];

const ReviewComponent: React.FC = () => {
  const [reviews, setReviews] = useState(reviewsData);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newName, setNewName] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [focusedCard, setFocusedCard] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Handle New Review Addition
  const handleAddReview = () => {
    if (!newName || !newReview || !newLocation) {
      setToastMessage('Please fill in all fields.');
      setShowToast(true);
      return;
    }
    const newReviewData = { 
      name: newName, 
      review: newReview, 
      rating: newRating,
      date: new Date().toISOString().slice(0, 10),
      location: newLocation,
    };
    setReviews([...reviews, newReviewData]);
    setNewReview('');
    setNewRating(5);
    setNewName('');
    setNewLocation('');
    setShowForm(false);
    setToastMessage('✅ Review submitted successfully!');
    setShowToast(true);
  };

  // Toggle Card Focus
  const toggleFocus = (index: number) => {
    setFocusedCard(focusedCard === index ? null : index);
  };

  // Scroll Progress Indicator
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(progress);
    }
  };

  // Auto-hide Toast after 3 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="p-4 bg-gray-100 text-black relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Customer Reviews</h2>
        <button
          className="border-2 border-black rounded-full px-4 py-1 hover:bg-black hover:text-white transition"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Close' : 'Write a Review'}
        </button>
      </div>

      {showForm && (
        <div className="mb-4 flex flex-col items-center space-y-2">
          <input
            type="text"
            placeholder="Your Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full max-w-xs p-2 mb-2 border border-black rounded-lg"
          />
          <textarea
            placeholder="Your Review"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            className="w-full max-w-xs p-2 mb-2 border border-black rounded-lg"
          />
          <input
            type="text"
            placeholder="Location"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            className="w-full max-w-xs p-2 mb-2 border border-black rounded-lg"
          />
          <input
            type="number"
            min="1"
            max="5"
            value={newRating}
            onChange={(e) => setNewRating(parseInt(e.target.value))}
            className="w-20 p-2 mb-2 border border-black rounded-lg"
          />
          <button
            onClick={handleAddReview}
            className="bg-green-500 text-white px-4 py-1 rounded-full hover:bg-green-600 transition"
          >
            Submit Review
          </button>
        </div>
      )}

      {/* Scrollable Review Cards */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
      >
        {reviews.map((review, index) => (
          <div
            key={index}
            onClick={() => toggleFocus(index)}
            className={`w-72 md:w-64 bg-white p-4 rounded-lg shadow-md flex-shrink-0 snap-center cursor-pointer 
              transition-all duration-300 ease-in-out ${
                focusedCard === index ? 'scale-105 shadow-xl' : ''
              }`}
          >
            <div className="flex items-center mb-2 text-yellow-500">
              {'★'.repeat(review.rating)}
              {'☆'.repeat(5 - review.rating)}
            </div>
            <p className="text-sm mb-2">{review.review}</p>
            <p className="text-gray-600 font-semibold">{review.name}</p>
            <p className="text-gray-500 text-xs">{review.location}</p>
            <p className="text-gray-400 text-xs">{review.date}</p>
          </div>
        ))}
      </div>

      {/* Scroll Progress Bar */}
      <div className="h-1 bg-gray-300 relative mt-2">
        <div
          className="h-full bg-green-500 transition-all duration-300 ease-in-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default ReviewComponent;
