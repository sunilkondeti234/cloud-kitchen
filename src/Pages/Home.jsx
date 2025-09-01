// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Home() {
  const [pickles, setPickles] = useState([]);

  useEffect(() => {
    const fetchPickles = async () => {
      const querySnapshot = await getDocs(collection(db, "pickles"));
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPickles(items);
    };
    fetchPickles();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Pickles</h1>
      <div className="grid grid-cols-2 gap-4 mt-6">
        {pickles.map((pickle) => (
          <div key={pickle.id} className="p-4 border rounded shadow">
            <img
              src={pickle.image}
              alt={pickle.name}
              className="w-full h-32 object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-2">{pickle.name}</h2>
            <p className="text-gray-600">₹{pickle.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
