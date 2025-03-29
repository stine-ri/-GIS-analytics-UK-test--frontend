import { useState } from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import nikeLogo from '../assets/images/logo-nike.jpg';
import productImage from '../assets/images/pair.jpg';

export default function ProductShowcase() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (selectedSize) {
      toast.success(`🛒 Size ${selectedSize} added to cart!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setSelectedSize(null); // Reset selection
    } else {
      toast.error("⚠️ Please select a size first!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <section className="bg-black text-white w-full h-screen flex justify-center items-center relative overflow-hidden px-4 sm:px-6">
      <ToastContainer />
      
      {/* Background Nike Logo */}
      <img
        src={nikeLogo}
        alt="Nike Logo"
        className="absolute inset-0 w-full h-full opacity-10 object-cover sm:object-contain sm:h-full"
      />

      <div className="w-full max-w-7xl flex flex-col lg:flex-row justify-between items-center px-6 md:px-16 lg:px-20 space-y-16 lg:space-y-0 relative text-center lg:text-left">
        
        {/* Left Side Content - Title, Stars & Price */}
        <div className="w-full lg:w-1/3 space-y-4 z-10 lg:-ml-8">
          <div className="flex justify-center lg:justify-start space-x-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-xl">★</span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold">NIKE JORDAN ECLIPSE</h1>
          <span className="text-green-400 text-3xl">$299.99</span>
        </div>

        {/* Centered Shoe Image */}
        <div className="w-full lg:w-1/3 flex justify-center items-center relative z-10 lg:-ml-8">
          <img
            src={productImage}
            alt="Nike Jordan Eclipse"
            className="w-[80%] sm:w-[60%] md:w-[50%] lg:w-[220%] object-contain -mb-10 lg:-mb-120 transition-all duration-300 ease-in-out"
          />
        </div>

        {/* Right Side - Size Selection */}
        <div className="w-full lg:w-1/4 bg-transparent relative z-10 flex flex-col justify-center items-center lg:items-end space-y-8 sm:space-y-12">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-sm relative z-10">
            <h3 className="text-lg font-semibold mb-2">SELECT SIZE</h3>
            <div className="grid grid-cols-4 gap-2">
              {["6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border border-gray-600 px-3 py-2 rounded-md transition ${
                    selectedSize === size ? "bg-green-500 text-white" : "hover:bg-green-500 hover:text-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <a href="#" className="text-green-400 text-sm hover:underline mt-2 block">
              View Size Chart
            </a>

            {/* Add to Cart Button */}
            <button 
              onClick={handleAddToCart}
              className="bg-green-950 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-full mt-4 flex items-center justify-center space-x-2 transition w-full"
            >
              <ShoppingCart size={20} />
              <span>Add to Cart</span>
              <Eye size={20} className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Ensure the menu is always on top */}
      <style>{`
        @media (max-width: 1024px) {
          .mobile-menu {
            z-index: 50;
            position: absolute;
          }
        }
      `}</style>
    </section>
  );
}
