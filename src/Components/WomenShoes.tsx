import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Importing images
import NikePink from "../assets/images/women-nike.jpg";
import AdidasBlack from "../assets/images/women-1.jpg";
import PumaWhite from "../assets/images/women-2.jpg";
import ReebokGrey from "../assets/images/women-3.jpg";
import ConverseRed from "../assets/images/women-4.jpg";
import VansPurple from "../assets/images/women-6.jpg";
import JordanBlue from "../assets/images/women-7.jpg";
import SkechersYellow from "../assets/images/women-8.jpg";

// Women's Shoes Data
const womensShoes = [
  { id: 1, name: "Nike - Air Max 270 - Pink", price: 150.99, image: NikePink, rating: 5 },
  { id: 2, name: "Nike - NMD R1 - Black", price: 120.0, image: AdidasBlack, rating: 4 },
  { id: 3, name: "Nike - Cali Star - White", price: 110.99, image: PumaWhite, rating: 4 },
  { id: 4, name: "Nike - Club C 85 - Grey", price: 90.5, image: ReebokGrey, rating: 3 },
  { id: 5, name: "Nike - All Star - Red", price: 85.0, image: ConverseRed, rating: 4 },
  { id: 6, name: "Nike - Old Skool - Purple", price: 80.0, image: VansPurple, rating: 3 },
  { id: 7, name: "Nike - Air 1 - Blue", price: 210.0, image: JordanBlue, rating: 5 },
  { id: 8, name: "Nike - Go Walk - Yellow", price: 75.0, image: SkechersYellow, rating: 4 },
];

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const WomenShoes: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load Cart from LocalStorage on Mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save Cart to LocalStorage on Change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add to Cart Function
  const handleAddToCart = (product: { id: number; name: string; price: number }) => {
    setCart((prevCart) => {
      const itemExists = prevCart.find((item) => item.id === product.id);
      if (itemExists) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    toast.success(`${product.name} added to cart! 🛒`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  // Remove from Cart Function
  const handleRemoveFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    toast.info(`Item removed from cart.`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  // Calculate Total Price
  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  // Handle Checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.warn("Your cart is empty! 🛒", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    // Simulate Payment Processing
    setTimeout(() => {
      toast.success(`Purchase successful! 🎉 Total: $${getTotalPrice()}`, {
        position: "top-right",
        autoClose: 3000,
      });
      setCart([]); // Clear the cart
      localStorage.removeItem("cart"); // Clear localStorage
    }, 1000);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">👟 WOMEN'S SHOES</h2>

      {/* Responsive Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {womensShoes.map((product) => (
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

            <p className="text-lg font-bold mb-3">${product.price}</p>

            {/* Add to Cart Button */}
            <button
              className="mt-auto bg-green-950 hover:bg-green-800 text-white font-semibold py-2 px-3 rounded-md transition-all text-sm"
              onClick={() => handleAddToCart(product)}
            >
              ➕ Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">🛒 Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-3 p-2 bg-white rounded-md shadow-sm"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      className="w-16 px-2 py-1 text-center border rounded-md text-sm"
                      onChange={(e) =>
                        setCart((prevCart) =>
                          prevCart.map((cartItem) =>
                            cartItem.id === item.id
                              ? { ...cartItem, quantity: parseInt(e.target.value) || 1 }
                              : cartItem
                          )
                        )
                      }
                    />
                    <p className="text-sm text-gray-600">
                      x ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  ❌
                </button>
              </div>
            ))}
            <p className="text-lg font-semibold mt-4">
              Total: ${getTotalPrice()}
            </p>

            {/* Checkout Button */}
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md mt-4 w-full"
              onClick={handleCheckout}
            >
              💳 Checkout
            </button>
          </div>
        )}
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default WomenShoes;
