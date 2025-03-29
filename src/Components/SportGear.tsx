import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Importing Outfit Images (Replace with actual paths)
import MensOutfit from "../assets/images/male-outfit.jpg";
import WomensOutfit from "../assets/images/women-outfit.jpg";
import KidsOutfit from "../assets/images/kid-outfit.jpg";
import Sportswear from "../assets/images/kid-2-outfit.jpg";
import CasualWear from "../assets/images/casual-wear.jpg";
import FormalWear from "../assets/images/formal-wear.jpg";
import ActiveWear from "../assets/images/active.jpg";
import Accessories from "../assets/images/accessories.jpg";

// Combined Gear Data
const allGear = [
  // Men's Gear
  { id: 1, name: "Men's Casual Outfit", category: "Men", price: 129.99, image: MensOutfit, rating: 4 },
  { id: 2, name: "Men's Formal Wear", category: "Men", price: 159.99, image: FormalWear, rating: 5 },

  // Women's Gear
  { id: 3, name: "Women's Summer Outfit", category: "Women", price: 119.99, image: WomensOutfit, rating: 4 },
  { id: 4, name: "Women's Activewear", category: "Women", price: 99.99, image: ActiveWear, rating: 4 },

  // Children's Gear
  { id: 5, name: "Kid's Casual Wear", category: "Children", price: 89.99, image: KidsOutfit, rating: 4 },
  { id: 6, name: "Kid's Sportswear", category: "Children", price: 69.99, image: Sportswear, rating: 4 },

  // Accessories
  { id: 7, name: "Unisex Accessories Pack", category: "Accessories", price: 49.99, image: Accessories, rating: 4 },
  { id: 8, name: "Casual Wear Bundle", category: "Unisex", price: 109.99, image: CasualWear, rating: 5 },
];

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const AllGear: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filter, setFilter] = useState("All");

  // Load Cart from LocalStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("allGearCart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save Cart to LocalStorage
  useEffect(() => {
    localStorage.setItem("allGearCart", JSON.stringify(cart));
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
    localStorage.removeItem("allGearCart"); // Clear localStorage
  };

  // Filtered Gear
  const filteredGear = filter === "All" ? allGear : allGear.filter(gear => gear.category === filter);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">👕 All Gear</h2>

      {/* Filter Buttons */}
      <div className="mb-4 flex gap-4">
        {["All", "Men", "Women", "Children", "Accessories", "Unisex"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-md font-semibold transition-all ${
              filter === cat ? "bg-green-700 text-white" : "bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gear Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredGear.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg flex flex-col">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md mb-3" />
            <p className="font-semibold truncate">{product.name}</p>
            <div className="text-yellow-500 mb-2">
              {"★".repeat(product.rating)}{"☆".repeat(5 - product.rating)}
            </div>
            <p className="font-bold mb-3">${product.price.toFixed(2)}</p>
            <button
              className="mt-auto bg-green-950 hover:bg-green-800 text-white py-2 rounded-md"
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
                          cartItem.id === item.id ? { ...cartItem, quantity: parseInt(e.target.value) || 1 } : cartItem
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

export default AllGear;
