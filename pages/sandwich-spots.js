import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import { neon } from '@neondatabase/serverless';

export async function getServerSideProps() {
  const sql = neon(process.env.DATABASE_URL);
  const response = await sql`SELECT version()`;
  return { props: { data: response[0].version } };
}

export default function SandwichSpots({ props }) {
  return (
    <Layout>
      <Head>
        <title>All Sandwich Spots</title>
      </Head>
      <h1>All Spots</h1>
      <ul>
        { props }
      </ul>
      <Link href="/add">Add a new sandwich spot</Link>
    </Layout>
  );
}
