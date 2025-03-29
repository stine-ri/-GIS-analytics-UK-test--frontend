import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Importing images
import ReebokBlack from "../assets/images/air-jordan-34.jpg";
import NikeGrey from "../assets/images/niky.jfif";
import ReebokSlideBlack from "../assets/images/tick.jpg";
import AdidasWhite from "../assets/images/white.jpg";
import PumaRed from "../assets/images/dope.jpg";
import ConverseBlack from "../assets/images/lv-nike.jpg";
import VansBlue from "../assets/images/nike-tiffany.jpg";
import JordanGreen from "../assets/images/airmax.jpg";

// Men's Shoes Data
const mensShoes = [
  {
    id: 1,
    name: "Nike - Ex-O-Fit Hi - Black - Mens",
    price: 179.99,
    image: ReebokBlack,
    rating: 4,
  },
  {
    id: 2,
    name: "Nike - Free TR V3 - Grey - Mens",
    price: 100.99,
    image: NikeGrey,
    rating: 4,
  },
  {
    id: 3,
    name: "Nike - Classic Slide - Black - Mens",
    price: 200.99,
    image: ReebokSlideBlack,
    rating: 5,
  },
  {
    id: 4,
    name: "Nike - Ultraboost 22 - White - Mens",
    price: 150.0,
    image: AdidasWhite,
    rating: 5,
  },
  {
    id: 5,
    name: "Nike - RS-X3 - Red/Black - Mens",
    price: 130.0,
    image: PumaRed,
    rating: 4,
  },
  {
    id: 6,
    name: "Nike - Chuck Taylor - Black - Mens",
    price: 90.0,
    image: ConverseBlack,
    rating: 4,
  },
  {
    id: 7,
    name: "Nike - Old Skool - Blue - Mens",
    price: 85.0,
    image: VansBlue,
    rating: 3,
  },
  {
    id: 8,
    name: "Nike - Retro 5 - Green - Mens",
    price: 250.0,
    image: JordanGreen,
    rating: 5,
  },
];

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const MensShoes: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load Cart from LocalStorage on Mount
  useEffect(() => {
    const storedCart = localStorage.getItem("mensCart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save Cart to LocalStorage on Change
  useEffect(() => {
    localStorage.setItem("mensCart", JSON.stringify(cart));
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
      localStorage.removeItem("mensCart"); // Clear localStorage
    }, 1000);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">👟 MEN'S SHOES</h2>

      {/* Responsive Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mensShoes.map((product) => (
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

            <button
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md mt-4 w-full"
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

export default MensShoes;
