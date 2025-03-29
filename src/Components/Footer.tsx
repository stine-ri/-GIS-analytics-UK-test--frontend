import { Facebook, Instagram, Rss } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
        
        {/* Shop Section */}
        <div>
          <h3 className="text-green-500 font-semibold mb-4">SHOP</h3>
          <ul className="space-y-2">
            <li className="hover:text-green-500 cursor-pointer">Men's</li>
            <li className="hover:text-green-500 cursor-pointer">Women's</li>
            <li className="hover:text-green-500 cursor-pointer">Kids</li>
            <li className="hover:text-green-500 cursor-pointer">Sport</li>
            <li className="hover:text-green-500 cursor-pointer">Gear</li>
          </ul>
        </div>

        {/* About Section */}
        <div>
          <h3 className="text-green-500 font-semibold mb-4">ABOUT</h3>
          <ul className="space-y-2">
            <li className="hover:text-green-500 cursor-pointer">About Us</li>
            <li className="hover:text-green-500 cursor-pointer">Contact Us</li>
            <li className="hover:text-green-500 cursor-pointer">Store Location</li>
            <li className="hover:text-green-500 cursor-pointer">Terms & Conditions</li>
            <li className="hover:text-green-500 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Help Section */}
        <div>
          <h3 className="text-green-500 font-semibold mb-4">HELP</h3>
          <ul className="space-y-2">
            <li className="hover:text-green-500 cursor-pointer">FAQs</li>
            <li className="hover:text-green-500 cursor-pointer">Shipping</li>
            <li className="hover:text-green-500 cursor-pointer">Returns & Exchanges</li>
            <li className="hover:text-green-500 cursor-pointer">Gift Cards</li>
            <li className="hover:text-green-500 cursor-pointer">Size Guides</li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div>
          <h3 className="text-green-500 font-semibold mb-4">FOLLOW US</h3>
          <div className="flex justify-center md:justify-start space-x-4 mt-4">
            <Facebook 
              size={28} 
              className="hover:text-green-500 cursor-pointer transition duration-300" 
            />
            <Instagram 
              size={28} 
              className="hover:text-green-500 cursor-pointer transition duration-300" 
            />
            <Rss 
              size={28} 
              className="hover:text-green-500 cursor-pointer transition duration-300" 
            />
          </div>
        </div>
      </div>

      {/* Footer Bottom Text */}
      <div className="mt-8 text-center text-sm text-gray-500">
        © 2025 Stirling Sports. All Rights Reserved
      </div>
    </footer>
  );
}
