import productShirt from '../assets/images/tshirt.webp';

export default function ProductDetails() {
  return (
    <section className="bg-white text-black w-full py-10 px-6 sm:px-8 lg:px-20">
      <div className="flex flex-col sm:flex-row justify-between items-start space-y-10 sm:space-y-0 sm:space-x-8 lg:space-x-12">

        {/* Description Section */}
        <div className="w-full sm:w-1/3 space-y-4 ">
          <h3 className="text-lg sm:text-2xl font-bold">DESCRIPTION</h3>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            Men's Jordan Eclipse Shoe is a new style that commands the spotlight.
            A low-profile midsole and a streamlined upper give it a minimalist look,
            while subtle details build on the rich Jordan legacy.
          </p>
        </div>

        {/* Details Section */}
        <div className="w-full sm:w-1/3 space-y-4 pr-30">
          <h3 className="text-lg sm:text-2xl font-bold">DETAILS</h3>
          <ul className="space-y-4">
            {["FIT", "SIZE", "DURABILITY", "COMFORT"].map((detail) => (
              <li key={detail} className="flex justify-between items-center gap-x-4">
                <span className="font-semibold text-base sm:text-lg">{detail}</span>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
                        i < 4 ? "bg-green-400" : "bg-gray-300"
                      }`}
                    ></span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Perfectly Pairs With Section */}
        <div className="w-full sm:w-1/3 space-y-4">
          <h3 className="text-lg sm:text-2xl font-bold">PERFECTLY PAIRS WITH</h3>
          <div className="flex items-center space-x-4">
            <img
              src={productShirt}
              alt="Nike Dry Academy Football Top"
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg shadow-lg"
            />
            <div>
              <h4 className="text-sm sm:text-lg font-medium">Nike - Dry Academy Football Top</h4>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <span className="text-green-500 font-semibold text-sm sm:text-base">$40.99</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
