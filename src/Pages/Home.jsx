import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDk3S7ZyMWF_NMsJQQsS2WO56T8KdTYhe8",
  authDomain: "cloud-kitchen-1e39e.firebaseapp.com",
  projectId: "cloud-kitchen-1e39e",
  storageBucket: "cloud-kitchen-1e39e.firebasestorage.app",
  messagingSenderId: "662546331171",
  appId: "1:662546331171:web:7c6e25d20a3517462d6396",
  measurementId: "G-G4ST38JWJC"
};

// ✅ Initialize Firebase & Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Home() {
  const [items, setItems] = useState([]);

  // Fetch pickle items from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "pickles"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
        🥒 Cloud Kitchen Pickles
      </h1>

      {items.length === 0 ? (
        <p className="text-gray-600 text-center">Loading items...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="border rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h2 className="text-xl font-semibold mt-3">{item.name}</h2>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-green-700 font-bold mt-2">₹{item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
