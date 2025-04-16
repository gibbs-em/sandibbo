import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from "../components/Layout";
import Head from "next/head";

export default function AddSpot() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
    rating: 5
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/add-sandwich-spot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add sandwich spot');
      }

      router.push('/sandwich-list');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add sandwich spot');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Layout>
      <Head>
        <title>Add New Sandwich Spot</title>
      </Head>
      <h1 className="text-2xl font-chewy mb-6">Add New Sandwich Spot</h1>
      
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="address" className="block mb-1">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-1">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            rows="3"
          />
        </div>

        <div>
          <label htmlFor="rating" className="block mb-1">Rating (1-10):</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="1"
            max="10"
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {submitting ? 'Adding...' : 'Add Sandwich Spot'}
        </button>
      </form>
    </Layout>
  );
}