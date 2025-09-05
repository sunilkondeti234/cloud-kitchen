import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="font-bold text-xl">Cloud Kitchen</h1>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/checkout">Checkout</Link>
      </div>
    </nav>
  );
}
