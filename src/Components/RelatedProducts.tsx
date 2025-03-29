import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Importing images
import ReebokBlack from "../assets/images/4f51d7196acde3f087792c03069de0a2.jpg";
import ReebokWhitePink from "../assets/images/pink.webp";
import NikeGrey from "../assets/images/AIR+MAX+DN8+(GS).png";
import ReebokSlideBlack from "../assets/images/Q7275nike_basketball_3056-mini.jpg";

// Sample Data
const relatedProducts = [
  {
    id: 1,
    name: "Nike - Ex-O-Fit Hi - Black - Mens",
    price: "$179.99",
    image: ReebokBlack,
    rating: 4,
  },
  {
    id: 2,
    name: "Nike - Classic Nylon - White/Pink - Womens",
    price: "$120.99",
    image: ReebokWhitePink,
    rating: 5,
  },
  {
    id: 3,
    name: "Nike - Free TR V3 - Grey - Mens",
    price: "$100.99",
    image: NikeGrey,
    rating: 4,
  },
  {
    id: 4,
    name: "Nike - Classic Slide - Black - Mens",
    price: "$200.99",
    image: ReebokSlideBlack,
    rating: 5,
  },
];

const RelatedProducts: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Handle Add to Cart
  interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
    rating: number;
  }

  const handleAddToCart = (product: Product) => {
    // Check if item is already in cart
    const isAlreadyInCart = cart.some((item) => item.id === product.id);

    if (isAlreadyInCart) {
      toast.warning(`⚠️ ${product.name} is already in the cart!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    // Add item to cart
    const updatedCart = [...cart, product];
    setCart(updatedCart);

    toast.success(`🛒 ${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <h2 className="text-xl font-bold mb-4">YOU MIGHT ALSO LIKE</h2>

      {/* Responsive Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow-md transition-all hover:shadow-lg flex flex-col"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <p className="text-sm font-semibold truncate">{product.name}</p>

            {/* Star Rating */}
            <div className="text-yellow-500 mb-1">
              {"★".repeat(product.rating)}{"☆".repeat(5 - product.rating)}
            </div>

            <p className="text-lg font-bold mb-3">{product.price}</p>

            {/* Add to Cart Button */}
            <button
              className="mt-auto bg-green-950 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-md transition-all"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
