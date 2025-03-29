import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Importing Images (Replace with actual paths)
import ReebokBlack from "../assets/images/lv-nike.jpg";
import NikeGrey from "../assets/images/tick.jpg";
import AdidasWhite from "../assets/images/pink.webp";
import ConverseBlack from "../assets/images/nike-tiffany.jpg";
import JordanGreen from "../assets/images/striking-shoes-with-light-effects-isolated-white-background_787273-8069.avif";
import VansKids from "../assets/images/dope.jpg";
import PumaRed from "../assets/images/airmax.jpg";
import SkechersKids from "../assets/images/pair.jpg";

// Combined Shoe Data
const allShoes = [
  // Men's Shoes
  { id: 1, name: "Nike - Ex-O-Fit Hi", category: "Men", price: 179.99, image: ReebokBlack, rating: 4 },
  { id: 2, name: "Nike - Free TR V3", category: "Men", price: 100.99, image: NikeGrey, rating: 4 },
  { id: 3, name: "Nike - RS-X3", category: "Men", price: 130.00, image: PumaRed, rating: 4 },
  { id: 4, name: "Nike - Chuck Taylor", category: "Men", price: 90.00, image: ConverseBlack, rating: 4 },

  // Women's Shoes
  { id: 5, name: "Nike - Ultraboost 22", category: "Women", price: 150.00, image: AdidasWhite, rating: 5 },
  { id: 6, name: "Nike - Air Zoom Pegasus", category: "Women", price: 120.99, image: AdidasWhite, rating: 4 },
  
  // Children's Shoes
  { id: 7, name: "Nike - Retro 5", category: "Children", price: 250.00, image: JordanGreen, rating: 5 },
  { id: 8, name: "Nike - Light-Up Sneakers", category: "Children", price: 55.00, image: SkechersKids, rating: 5 },
  { id: 9, name: "Nike - Classic Slip-On", category: "Children", price: 40.00, image: VansKids, rating: 4 },
];

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const AllShoes: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filter, setFilter] = useState("All");

  // Load Cart from LocalStorage on Mount
  useEffect(() => {
    const storedCart = localStorage.getItem("allShoesCart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save Cart to LocalStorage on Change
  useEffect(() => {
    localStorage.setItem("allShoesCart", JSON.stringify(cart));
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
    toast.success(`${product.name} added to cart! 🛒`, { autoClose: 2000 });
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
    localStorage.removeItem("allShoesCart"); // Clear localStorage
  };

  // Filtered Shoes
  const filteredShoes = filter === "All" ? allShoes : allShoes.filter(shoe => shoe.category === filter);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🛍️ All Shoes</h2>

      {/* Filter Buttons */}
      <div className="mb-4 flex gap-4">
        {["All", "Men", "Women", "Children"].map((cat) => (
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

      {/* Shoes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredShoes.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg flex flex-col">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md mb-3" />
            <p className="font-semibold truncate">{product.name}</p>
            <div className="text-yellow-500 mb-2">{"★".repeat(product.rating)}{"☆".repeat(5 - product.rating)}</div>
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

export default AllShoes;
