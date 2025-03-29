import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import ProductShowcase from './Components/ProductShowCase';
import ProductDetails from './Components/ProductDetails';
import CustomerReviews from './Components/CustomersReviews';
import RelatedProducts from './Components/RelatedProducts';
import MensShoes from './Components/MenShoes';
import WomensShoes from './Components/WomenShoes';
import KidsShoes from './Components/KidShoes';
import SportGear from './Components/SportGear';
import Reviews from './Components/Reviews';
import NewArrivals from './Components/NewArrivals';
import Sale from './Components/OnSalesShoes';
import Brands from './Components/Brands';
import SearchResults from './Components/SearchResults';
import Cart from './Components/Cart';
import Footer from './Components/Footer';
const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          {/* Landing Page */}
          <Route
            path="/"
            element={
              <div className="flex flex-col space-y-6">
                <ProductShowcase />
                <ProductDetails />
                <CustomerReviews />
                <RelatedProducts />
              </div>
            }
          />

          {/* Individual Routes for Navbar Items */}
          <Route path="/men's" element={<MensShoes />} />
          <Route path="/women's" element={<WomensShoes />} />
          <Route path="/kids" element={<KidsShoes />} />
          <Route path="/sport" element={<SportGear />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/new" element={<NewArrivals />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/cart" element={<Cart />} />
    
            
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
