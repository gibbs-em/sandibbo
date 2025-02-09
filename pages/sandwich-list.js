import { useEffect, useState } from 'react';
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Layout from "../components/Layout";
import { neon } from '@neondatabase/serverless';

export async function getServerSideProps() {
  const sql = neon(process.env.DATABASE_URL);
  const response = await sql`SELECT version()`;
  return { props: { data: response[0].version } };
}

export default function SandwichSpots() {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSpots() {
      try {
        const response = await fetch('/api/sandwich-spots');
        const data = await response.json();
        setSpots(data);
      } catch (error) {
        console.error('Error fetching sandwich spots:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSpots();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Layout>
      <Head>
        <title>All Sandwich Spots</title>
      </Head>
      <h1>All Spots</h1>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spots.map((spot) => (
            <div key={spot.id} className="border rounded-lg p-4 shadow-md">
              <h2 className="text-xl font-semibold">{spot.name}</h2>
              <p className="text-gray-600">{spot.address}</p>
              {spot.description && (
                <p className="mt-2 text-gray-700">{spot.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      <Button variant="outline" asChild>
        <Link href="/add">Add a new sandwich spot</Link>
      </Button>
    </Layout>
  );
}
