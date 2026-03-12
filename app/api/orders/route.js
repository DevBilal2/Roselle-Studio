// app/api/orders/route.js
import { createOrder } from "../../lib/shopify";

export async function POST(request) {
  try {
    // Optional: require x-api-key only if API_SECRET_KEY is set and request is from server/server-to-server
    // Same-origin checkout from your site does not need a key so orders can go through.
    const orderData = await request.json();

    // Validate required data
    if (!orderData.contact?.phone) {
      return Response.json(
        { success: false, error: "Phone number is required" },
        { status: 400 }
      );
    }

    if (!orderData.shipping?.address) {
      return Response.json(
        { success: false, error: "Address is required" },
        { status: 400 }
      );
    }

    if (!orderData.items || orderData.items.length === 0) {
      return Response.json(
        { success: false, error: "No items in order" },
        { status: 400 }
      );
    }

    // Create order in Shopify
    const shopifyOrder = await createOrder(orderData);

    // Return success response
    return Response.json({
      success: true,
      order: shopifyOrder,
      message: "Order created successfully in Shopify",
    });
  } catch (error) {
    console.error("API order creation error:", error);

    // Return user-friendly error
    let errorMessage = "Failed to create order";
    if (error.message.includes("401")) {
      errorMessage = "Shopify authentication failed. Check API token.";
    } else if (error.message.includes("variant")) {
      errorMessage = "Product variant issue. Please contact support.";
    }

    return Response.json(
      {
        success: false,
        error: errorMessage,
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

// GET endpoint to verify API is working
export async function GET() {
  return Response.json({
    status: "ok",
    message: "Orders API is running",
  });
}
