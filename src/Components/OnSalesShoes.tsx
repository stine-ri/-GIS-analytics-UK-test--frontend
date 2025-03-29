import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Importing Shoes Images (Replace with actual paths)
import NikeAirMax from "../assets/images/airmax.jpg";
import AdidasUltraboost from "../assets/images/Q7275nike_basketball_3056-mini.jpg";
import PumaSuede from "../assets/images/milky.jfif";
import VansOldSkool from "../assets/images/striking-shoes-with-light-effects-isolated-white-background_787273-8069.avif";
import ConverseChuck from "../assets/images/dope.jpg";
import JordanRetro from "../assets/images/AIR+MAX+DN8+(GS).png";

// Shoes on Sale Data
const saleShoes = [
  {
    id: 1,
    name: "Nike Air Max 270",
    originalPrice: 200.0,
    discount: 20, // 20% off
    image: NikeAirMax,
    rating: 4,
  },
  {
    id: 2,
    name: "Nike Ultraboost 22",
    originalPrice: 180.0,
    discount: 30, // 30% off
    image: AdidasUltraboost,
    rating: 5,
  },
  {
    id: 3,
    name: "Nike Suede Classic",
    originalPrice: 150.0,
    discount: 25, // 25% off
    image: PumaSuede,
    rating: 4,
  },
  {
    id: 4,
    name: "Nike Old Skool",
    originalPrice: 120.0,
    discount: 15, // 15% off
    image: VansOldSkool,
    rating: 4,
  },
  {
    id: 5,
    name: "Nike Chuck Taylor",
    originalPrice: 110.0,
    discount: 20, // 20% off
    image: ConverseChuck,
    rating: 4,
  },
  {
    id: 6,
    name: "Nike Jordan Retro 5",
    originalPrice: 250.0,
    discount: 35, // 35% off
    image: JordanRetro,
    rating: 5,
  },
];

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

// Function to Calculate Discounted Price
const getDiscountedPrice = (originalPrice: number, discount: number) => {
  return (originalPrice - (originalPrice * discount) / 100).toFixed(2);
};

const OnSaleShoes: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load Cart from LocalStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("onSaleCart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save Cart to LocalStorage
  useEffect(() => {
    localStorage.setItem("onSaleCart", JSON.stringify(cart));
  }, [cart]);

  // Handle Add to Cart
  const handleAddToCart = (product: { id: number; name: string; price: number }) => {
    setCart((prevCart) => {
      const itemExists = prevCart.find((item) => item.id === product.id);
      if (itemExists) {
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
    toast.info(`Item removed from cart.`, { autoClose: 2000 });
  };

  // Get Total Price
  const getTotalPrice = () => cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  // Handle Checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.warn("Your cart is empty!", { autoClose: 2000 });
      return;
    }
    toast.success(`Purchase successful! 🎉 Total: $${getTotalPrice()}`, { autoClose: 3000 });
    setCart([]); // Clear cart
    localStorage.removeItem("onSaleCart"); // Clear localStorage
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🔥 Shoes on Sale</h2>

      {/* Sale Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {saleShoes.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg flex flex-col relative">
            {/* Discount Badge */}
            <span className="absolute top-2 left-2 bg-red-500 text-white text-sm px-2 py-1 rounded-md">
              {product.discount}% OFF
            </span>

            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md mb-3" />
            <p className="font-semibold truncate">{product.name}</p>

            {/* Star Rating */}
            <div className="text-yellow-500 mb-1">
              {"★".repeat(product.rating)}{"☆".repeat(5 - product.rating)}
            </div>

            {/* Price Section */}
            <div className="mb-3">
              <p className="line-through text-gray-500">${product.originalPrice.toFixed(2)}</p>
              <p className="text-lg font-bold text-green-500">
                ${getDiscountedPrice(product.originalPrice, product.discount)}
              </p>
            </div>

            {/* Add to Cart Button */}
            <button
              className="mt-auto bg-green-950 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-md transition-all"
              onClick={() =>
                handleAddToCart({
                  id: product.id,
                  name: product.name,
                  price: parseFloat(getDiscountedPrice(product.originalPrice, product.discount)),
                })
              }
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
                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleRemoveFromCart(item.id)}>
                  ❌
                </button>
              </div>
            ))}
            <p className="font-semibold mt-4">Total: ${getTotalPrice()}</p>
            <button className="bg-green-500 text-white w-full py-2 mt-4 rounded" onClick={handleCheckout}>
              💳 Checkout
            </button>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default OnSaleShoes;
