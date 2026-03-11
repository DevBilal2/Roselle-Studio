import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getCollectionByHandle,
  fetchShopifyProducts,
  fetchShopifyCollections,
} from "../../lib/shopify";
import ProductGrid from "../../Components/productGrid";

export async function generateStaticParams() {
  const collections = await fetchShopifyCollections(50);
  return collections.map((col) => ({ handle: col.handle }));
}

export async function generateMetadata({ params }) {
  const { handle } = await params;
  const collection = await getCollectionByHandle(handle);
  if (!collection) {
    return { title: "Collection | Roselle Studio Lahore" };
  }
  const description =
    collection.description?.trim() ||
    `Shop ${collection.title} – artificial flowers in Lahore, Pakistan. Roselle Studio.`;
  return {
    title: `${collection.title} | Artificial Flowers Lahore`,
    description,
    openGraph: {
      title: `${collection.title} | Roselle Studio Lahore`,
      description,
      images: collection.image
        ? [{ url: collection.image, width: 800, height: 800, alt: collection.title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${collection.title} | Roselle Studio`,
      description,
    },
    alternates: { canonical: `/collections/${handle}` },
  };
}

export default async function CollectionPage({ params }) {
  const { handle } = await params;
  const [collection, products] = await Promise.all([
    getCollectionByHandle(handle),
    fetchShopifyProducts(100, handle),
  ]);

  if (!collection) {
    notFound();
  }

  const seoDescription =
    collection.description?.trim() ||
    `Browse our ${collection.title} collection.`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      {/* Title on top */}
      <div className="bg-gradient-to-r from-stone-800 to-stone-900 text-white py-16 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-stone-300 hover:text-white transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            {collection.title}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-8">
        <div className="mb-6">
          <p className="text-stone-600">
            <span className="font-bold text-stone-800">{products.length}</span>{" "}
            {products.length === 1 ? "product" : "products"}
          </p>
        </div>

        {products.length > 0 ? (
          <ProductGrid data={products} />
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 text-stone-300">🌸</div>
            <h3 className="text-2xl font-bold text-stone-800 mb-2">
              No products in this collection yet
            </h3>
            <p className="text-stone-600 mb-6">
              Check back later or browse all products.
            </p>
            <Link
              href="/allproducts"
              className="inline-flex items-center gap-2 text-stone-800 font-medium hover:underline"
            >
              View all products →
            </Link>
          </div>
        )}

        {/* Description at the end (for SEO content) */}
        {(seoDescription || collection.descriptionHtml) && (
          <div className="mt-16 pt-10 border-t border-stone-200">
            {collection.descriptionHtml ? (
              <div
                className="prose prose-xl prose-stone max-w-3xl text-stone-600 text-lg md:text-xl [&_p]:text-lg [&_p]:md:text-xl [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl"
                dangerouslySetInnerHTML={{ __html: collection.descriptionHtml }}
              />
            ) : (
              <p className="text-stone-600 max-w-3xl text-lg md:text-xl leading-relaxed">
                {seoDescription}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
