import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Importing Shoe Images (Replace with actual paths)
import NikeZoom from "../assets/images/4f51d7196acde3f087792c03069de0a2.jpg";
import AdidasNMD from "../assets/images/kid-1.jpg";
import PumaRider from "../assets/images/women-4.jpg";
import VansEra from "../assets/images/women-nike.jpg";
import ConverseRunStar from "../assets/images/lv-nike.jpg";
import JordanFlight from "../assets/images/air-jordan-34.jpg";

// New Stock Data
const newStock = [
  {
    id: 1,
    name: "Nike ZoomX Vaporfly",
    price: 250.0,
    image: NikeZoom,
    rating: 5,
  },
  {
    id: 2,
    name: "Nike NMD R1 V3",
    price: 180.0,
    image: AdidasNMD,
    rating: 4,
  },
  {
    id: 3,
    name: "Nike Future Rider",
    price: 150.0,
    image: PumaRider,
    rating: 4,
  },
  {
    id: 4,
    name: "Nike Era 59",
    price: 120.0,
    image: VansEra,
    rating: 4,
  },
  {
    id: 5,
    name: "Nike Run Star Motion",
    price: 110.0,
    image: ConverseRunStar,
    rating: 4,
  },
  {
    id: 6,
    name: "Nike Jordan Flight Club 91",
    price: 260.0,
    image: JordanFlight,
    rating: 5,
  },
];

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

// Function to persist cart in localStorage
const saveToLocalStorage = (cart: CartItem[]) => {
  localStorage.setItem("newStockCart", JSON.stringify(cart));
};

const NewArrivals: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("newStockCart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage on update
  useEffect(() => {
    saveToLocalStorage(cart);
  }, [cart]);

  // Handle Add to Cart
  const handleAddToCart = (product: { id: number; name: string; price: number }) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    toast.success(`${product.name} added to cart! 🛍️`, { autoClose: 2000 });
  };

  // Handle Remove from Cart
  const handleRemoveFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    toast.info("Item removed from cart.", { autoClose: 2000 });
  };

  // Get Total Price
  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  // Handle Checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.warn("Your cart is empty!", { autoClose: 2000 });
      return;
    }
    toast.success(`🎉 Checkout successful! Total: $${getTotalPrice()}`, { autoClose: 3000 });
    setCart([]); // Clear cart
    localStorage.removeItem("newStockCart"); // Clear localStorage
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🆕 New Arrivals</h2>

      {/* New Stock Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {newStock.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg flex flex-col relative"
          >
            {/* New Badge */}
            <span className="absolute top-2 left-2 bg-green-500 text-white text-sm px-2 py-1 rounded-md">
              New Arrival
            </span>

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <p className="font-semibold truncate">{product.name}</p>

            {/* Star Rating */}
            <div className="text-yellow-500 mb-1">
              {"★".repeat(product.rating)}{"☆".repeat(5 - product.rating)}
            </div>

            <p className="text-lg font-bold text-blue-500 mb-3">${product.price.toFixed(2)}</p>

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

      {/* Cart Section */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">🛒 Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-3">
                <div>
                  <p>{item.name}</p>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    className="w-16 p-1 text-center border rounded-md"
                    onChange={(e) =>
                      setCart((prev) =>
                        prev.map((cartItem) =>
                          cartItem.id === item.id
                            ? { ...cartItem, quantity: parseInt(e.target.value) || 1 }
                            : cartItem
                        )
                      )
                    }
                  />
                </div>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  ❌
                </button>
              </div>
            ))}
            <p className="font-semibold mt-4">Total: ${getTotalPrice()}</p>
            <button
              className="bg-green-500 text-white w-full py-2 mt-4 rounded"
              onClick={handleCheckout}
            >
              💳 Checkout
            </button>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default NewArrivals;
