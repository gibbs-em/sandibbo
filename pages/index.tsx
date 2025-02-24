import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import TopSpot from "../components/TopSpot";
import { Button } from "@/components/ui/button"

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
          <div className="space-x-4">
            <Button variant="outline" asChild>
              <Link href="/sandwich-list">See the full list</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/add">Add a new sandwich spot</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/wishlist/add">Add to Wishlist</Link>
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
} 