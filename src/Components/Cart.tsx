import { useEffect, useState } from "react";

export default function Cart() {
  interface CartItem {
    id: number;
    name: string;
    price: number;
  }

  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="border p-2 mb-2 rounded-md">
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      )}
      <h3 className="font-semibold mt-4">Total: ${totalPrice.toFixed(2)}</h3>
    </div>
  );
}
