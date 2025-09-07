import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function Home() {
  const [pickles, setPickles] = useState([]);

  useEffect(() => {
    const fetchPickles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "pickles"));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPickles(items);
      } catch (error) {
        console.error("Error fetching pickles:", error);
      }
    };

    fetchPickles();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
        Welcome to Cloud Kitchen 🥒
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Your online food & pickle store is live!
      </p>

      {/* Pickle Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pickles.map((pickle) => (
          <div
            key={pickle.id}
            className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition"
          >
            <img
              src={pickle.image}
              alt={pickle.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
              onError={(e) => (e.target.style.display = "none")}
            />
            <h2 className="text-xl font-semibold text-gray-800">
              {pickle.name}
            </h2>
            <p className="text-gray-600 text-sm mb-2">{pickle.description}</p>
            <p className="text-lg font-bold text-green-700">
              ₹ {typeof pickle.price === "number" ? pickle.price : "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
