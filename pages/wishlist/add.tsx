import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import { Button } from "@/components/ui/button";

export default function AddToWishlist() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    suggester: ''
  });
  const [error, setError] = useState('');

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

      router.push('/sandwich-list');
    } catch (error) {
      setError('Failed to add to wishlist');
      console.error('Error:', error);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Add to Wishlist</title>
      </Head>
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Add to Sandwich Wishlist</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Address:</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Suggested by:</label>
            <input
              type="text"
              value={formData.suggester}
              onChange={(e) => setFormData({ ...formData, suggester: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <Button type="submit">Add to Wishlist</Button>
        </form>
      </div>
    </Layout>
  );
} 