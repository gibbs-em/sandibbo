import { useState, useEffect } from 'react';

export default function TopSpot() {
  const [topSpot, setTopSpot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTopSpot() {
      try {
        const response = await fetch('/api/top-sandwich-spot');
        if (!response.ok) {
          throw new Error('Failed to fetch top spot');
        }
        const data = await response.json();
        setTopSpot(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTopSpot();
  }, []);

  if (loading) return <div>Loading top spot...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!topSpot) return <div>No sandwich spots found</div>;

  return (
    <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2">🏆 Top Rated Spot</h2>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{topSpot.name}</h3>
        <p className="text-gray-600">{topSpot.address}</p>
        {topSpot.description && (
          <p className="text-gray-700">{topSpot.description}</p>
        )}
        <p className="text-lg font-bold">Rating: {topSpot.rating}/10</p>
      </div>
    </div>
  );
} 