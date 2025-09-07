import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

// Try hard to find & parse a price from different shapes / keys
function normalizePrice(docData) {
  const candidates = [
    docData.price,
    docData.Price,
    docData.cost,
    docData.amount,
    docData.priceINR,
    docData.price_inr,
    docData.pricing?.price,
    docData.pricing?.amount,
    docData.price?.amount,
    docData.price?.value,
  ];

  const tryParse = (val) => {
    if (val == null) return null;
    if (typeof val === "number" && !Number.isNaN(val)) return val;
    if (typeof val === "string") {
      // strip commas and grab first number pattern
      const m = val.replace(/,/g, "").match(/(\d+(\.\d+)?)/);
      if (m) return parseFloat(m[1]);
      return null;
    }
    if (typeof val === "object") {
      for (const k of ["amount", "value", "inr", "INR"]) {
        const v = val?.[k];
        const parsed = tryParse(v);
        if (parsed != null) return parsed;
      }
    }
    return null;
  };

  for (const c of candidates) {
    const parsed = tryParse(c);
    if (parsed != null) return parsed;
  }
  return null;
}

const formatINR = (n) => {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n);
  } catch {
    return `₹${Number(n).toFixed(2)}`;
  }
};

function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDocs(collection(db, "pickles"));
        const rows = snap.docs.map((d) => {
          const data = d.data() || {};
          const priceNumber = normalizePrice(data);
          return {
            id: d.id,
            name: data.name || data.title || "Unnamed Item",
            description: data.description || data.desc || "",
            image:
              data.image ||
              data.imageUrl ||
              "https://via.placeholder.com/600x400?text=No+Image",
            priceNumber, // numeric or null
          };
        });
        setItems(rows);
      } catch (e) {
        console.error("Error fetching pickles:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <p className="text-gray-600">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        🥒 Welcome to Cloud Kitchen
      </h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-500">No items found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map(({ id, name, description, image, priceNumber }) => (
            <div
              key={id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={image}
                alt={name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-1">{name}</h2>
                {description && (
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {description}
                  </p>
                )}
                <p className="text-lg font-bold">
                  {priceNumber != null ? (
                    <span className="text-green-600">
                      {formatINR(priceNumber)}
                    </span>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
