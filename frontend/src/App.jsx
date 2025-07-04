import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [data, setData]=useState(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBusinessData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3001/business-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, location }),
      });

      if (!response.ok) throw new Error("Failed to fetch data");

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
      setData(null);
    }
    setLoading(false);
  };

  const handleRegenerate = async () => {
  try {
    const res = await fetch("http://localhost:3001/regenerate-headline");
    const result = await res.json();
    setData((prevData) => ({
      ...prevData,
      headline: result.headline,
    }));
  } catch (err) {
    console.error("Failed to fetch:", err);
    console.error("Failed to fetch. Is the backend running?");
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Local SEO Headline Generator</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <input
          type="text"
          placeholder="Business Name"
          className="border p-2 w-full mb-4 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          className="border p-2 w-full mb-4 rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button
          onClick={fetchBusinessData}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        >
          Generate SEO Headline
        </button>
      </div>

      {loading && (
  <div className="text-blue-500 mt-4 animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>)}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {data && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">Generated Headline:</h2>
          <p className="mb-2">{data.headline}</p>
          <p className="text-sm text-gray-500 mb-2">
            {data.rating}★ rating from {data.reviews} reviews
          </p>
          <button
            onClick={handleRegenerate}
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Regenerate SEO Headline
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
