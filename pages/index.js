import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import TopSpot from "../components/TopSpot";

export default function Home() {
  const router = useRouter();
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="max-w-4xl mx-auto p-4">
        <section className={utilStyles.headingMd}>
          <p>
            Dan and Gibbo's guide to the best sandwiches in the city
          </p>
          <p>Our current top spot is...</p>
            <TopSpot />
          <button onClick={() => router.push('/sandwich-list')}>
            See the full list
          </button>
          <button onClick={() => router.push('/add')}>
            Add a new sandwich spot
          </button>
        </section>
      </div>
    </Layout>
  );
}