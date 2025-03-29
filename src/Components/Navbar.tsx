import { useState, useEffect } from "react";
import { Search, ShoppingCart, User, X, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  interface CartItem {
    id: number;
    name: string;
    category: string;
    price: number;
    quantity: number;
  }

  const [cart, setCart] = useState<CartItem[]>([]);

  const navigate = useNavigate();

  // Sample Product Data for Search
  const products = [
    { id: 1, name: "Running Shoes", category: "Men's", price: 120 },
    { id: 2, name: "Basketball Sneakers", category: "Men's", price: 140 },
    { id: 3, name: "Tennis Shoes", category: "Women's", price: 100 },
    { id: 4, name: "Kids' Sports Shoes", category: "Kids", price: 80 },
  ];

  // Load Cart from Local Storage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  // Save Cart to Local Storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Toggle Mobile Menu
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Handle Search Function
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim() !== "") {
      const filteredResults = products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  // Handle Search Submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/search-results", { state: { results: searchResults } });
  };

  return (
    <nav className="bg-black text-white px-4 py-2 flex justify-between items-center shadow-lg relative w-full">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold flex items-center space-x-2">
        <span>Stirling</span>
        <span className="text-green-500">Sports</span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 font-medium">
        {["Men's", "Women's", "Kids", "Sport", "Reviews", "New", "Sale", "Brands"].map((item) => (
          <Link
            to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
            key={item}
            className="hover:text-gray-400 transition duration-300"
          >
            {item}
          </Link>
        ))}
      </div>

      {/* Search and Icons */}
      <div className="flex items-center space-x-4">
        <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search the store here"
            className="bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 w-64"
          />
          <Search
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </form>

        <User className="hover:text-gray-400 transition duration-300" size={26} />

        <button
          onClick={() => navigate("/cart")}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 transition duration-300"
        >
          <ShoppingCart size={20} />
          <span>Cart ({cart.length})</span>
        </button>

        {/* Hamburger Menu / Close Button for Mobile */}
        <button className="md:hidden ml-2 z-30" onClick={toggleMenu}>
          {isMenuOpen ? (
            <X size={36} className="text-white" />
          ) : (
            <Menu size={36} className="text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 text-white p-4 md:hidden z-20 overflow-y-auto">
          <ul className="space-y-6 mt-16">
            {["Men's", "Women's", "Kids", "Sport", "Reviews", "New", "Sale", "Brands"].map((item) => (
              <li key={item} className="border-b border-gray-700 last:border-b-0">
                <Link
                  to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block py-3 px-4 rounded-lg hover:bg-gray-800 transition duration-300"
                >
                  {item}
                </Link>
              </li>
            ))}
            <div className="mt-6">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search the store here"
                className="bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
              />
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
}
