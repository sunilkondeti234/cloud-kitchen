import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
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
    fetchItems();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to Cloud Kitchen</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {items.map((item) => (
          <div key={item.id} style={{ border: "1px solid #ccc", padding: "10px" }}>
            <h2>{item.name || "No Name"}</h2>
            <p>Price: ₹{item.price || "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
