import { fetchShopifyCollections } from "../../lib/shopify";

export async function GET() {
  try {
    const collections = await fetchShopifyCollections(50);
    return Response.json(collections);
  } catch (error) {
    console.error("API collections error:", error);
    return Response.json([], { status: 200 });
  }
}
