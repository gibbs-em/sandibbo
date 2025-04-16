import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import { Button } from "@/components/ui/button";

interface WishlistItem {
  id: number;
  name: string;
  address: string;
  suggester: string;
}

export default function AddToWishlist() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    suggester: ''
  });
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const response = await fetch('/api/wishlist');
        const data = await response.json();
        setWishlistItems(data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    }

    fetchWishlist();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to add to wishlist');

      // Refresh the wishlist after adding
      const updatedList = await fetch('/api/wishlist').then(res => res.json());
      setWishlistItems(updatedList);
      
      // Reset form
      setFormData({ name: '', address: '', suggester: '' });
    } catch (error) {
      setError('Failed to add to wishlist');
      console.error('Error:', error);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Sandwich Wishlist</title>
      </Head>
      <div className="flex flex-col md:flex-row container w-4/5 mx-auto py-8 gap-6">
        <div className="md:w-1/2">
          <h1 className="text-2xl mb-6">Add to Wishlist</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2">Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border rounded bg-white"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Address:</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full p-2 border rounded bg-white"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Suggested by:</label>
              <input
                type="text"
                value={formData.suggester}
                onChange={(e) => setFormData({ ...formData, suggester: e.target.value })}
                className="w-full p-2 border rounded bg-white"
                required
              />
            </div>
            <Button type="submit" className="bg-white">Add to Wishlist</Button>
          </form>
        </div>
        
        <div className="md:w-1/2">
          <h2 className="text-2xl mb-6">Current Wishlist</h2>
          <div className="space-y-4">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-xl">{item.name}</h3>
                <p className="text-gray-600">{item.address}</p>
                <p className="text-sm text-gray-500 mt-2">Suggested by: {item.suggester}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
} 