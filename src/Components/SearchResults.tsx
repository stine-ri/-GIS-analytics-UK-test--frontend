import { useLocation } from "react-router-dom";

export default function SearchResults() {
  const location = useLocation();
  const results = location.state?.results || [];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Search Results</h2>
      {results.length > 0 ? (
        <ul>
          {results.map((item: { id: string; name: string; price: number }) => (
            <li key={item.id} className="border p-2 mb-2 rounded-md">
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}
