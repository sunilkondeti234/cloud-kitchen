import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Home() {
  const [pickles, setPickles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "pickles"));
        const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log("Fetched items:", items);
        setPickles(items);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🥒 Welcome to Cloud Kitchen</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pickles.map((item) => (
          <div key={item.id} className="bg-white shadow-md rounded-xl p-4">
            <img src={item.image || "/placeholder.jpg"} alt={item.name} className="w-full h-40 object-cover rounded-md mb-3" />
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-600">{item.description}</p>
            <p className="font-bold mt-2">₹{item.price || "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
