import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "pickles"));
        const itemsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(itemsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((item) => (
        <div key={item.id} className="bg-white shadow-md rounded-lg p-4">
          {item.image && (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
          )}
          <h2 className="text-lg font-semibold">{item.name}</h2>
          <p className="text-gray-700">₹{item.price ?? "N/A"}</p>
        </div>
      ))}
    </div>
  );
}
