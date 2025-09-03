export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
      <h1 className="text-4xl font-bold text-green-700 mb-4">
        Welcome to Cloud Kitchen 🍴
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Delicious homemade pickles and foods, delivered fresh to your doorstep!
      </p>
      <button className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700">
        Explore Menu
      </button>
    </main>
  );
}
