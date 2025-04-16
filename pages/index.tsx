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
          <p className="text-center">
            Dan and Gibbo's guide to the best sandwiches in the city.
            <span></span>
          </p>
          <p/>
          <p className="text-center">Our current favourite is...</p>
          <TopSpot />
          <div className="flex flex-col md:flex-row md:justify-between gap-4 mt-4">
            <Button className="bg-white font-chewy" variant="outline" asChild>
              <Link href="/sandwich-list">See the full list</Link>
            </Button>
            <Button className="bg-white font-chewy" variant="outline" asChild>
              <Link href="/add">Add a new sandwich spot</Link>
            </Button>
            <Button className="bg-white font-chewy" variant="outline" asChild>
              <Link href="/wishlist/add">Add to Wishlist</Link>
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
} 