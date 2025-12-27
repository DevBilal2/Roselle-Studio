// app/lib/shopify.js
// Add this function to app/lib/shopify.js

// lib/shopify.js - SIMPLIFIED VERSION
// Only for Storefront API (safe for browser)
// Add to lib/shopify.js

// Function to login customer and get access token
// Add to lib/shopify.js
// lib/shopify.js
// const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
// const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN;
// lib/shopify.js
export async function fetchShopifyProducts(
  limit = 12,
  collectionHandle = null
) {
  const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_STOREFRONT_API_TOKEN;

  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN) {
    console.error("Missing Shopify environment variables");
    return [];
  }

  let query;
  let variables = { first: limit };

  if (collectionHandle) {
    query = `
      query GetCollectionProducts($handle: String!, $first: Int) {
        collectionByHandle(handle: $handle) {
          id
          title
          products(first: $first) {
            edges {
              node {
                id
                title
                handle
                description
                featuredImage {
                  url
                  altText
                }
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                tags
                totalInventory
              }
            }
          }
        }
      }
    `;
    variables.handle = collectionHandle;
  } else {
    query = `
      query GetProducts($first: Int) {
        products(first: $first) {
          edges {
            node {
              id
              title
              handle
              description
              featuredImage {
                url
                altText
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              tags
              totalInventory
            }
          }
        }
      }
    `;
  }

  try {
    const response = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
        },
        body: JSON.stringify({ query, variables }),
      }
    );

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`);
    }

    const result = await response.json();

    if (result.errors) {
      console.error("GraphQL Errors:", result.errors);
      return [];
    }

    // Handle both cases (collection products or all products)
    let productsData;
    if (collectionHandle) {
      productsData = result.data.collectionByHandle?.products?.edges || [];
    } else {
      productsData = result.data.products.edges;
    }

    // Transform the data to match your expected format
    return productsData.map((edge) => ({
      id: edge.node.id,
      Heading: edge.node.title, // Your app expects "Heading"
      description: edge.node.description,
      price: `$${edge.node.priceRange?.minVariantPrice?.amount || "0"}`,
      currency: edge.node.priceRange?.minVariantPrice?.currencyCode || "USD",
      tags: edge.node.tags || [],
      inStock: edge.node.totalInventory > 0,
      image: edge.node.featuredImage?.url || null,
      altText: edge.node.featuredImage?.altText || edge.node.title,
      handle: edge.node.handle,
    }));
  } catch (error) {
    console.error("Error fetching Shopify products:", error);
    return [];
  }
}
export async function createOrder(orderData) {
  const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN;

  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_ADMIN_TOKEN) {
    console.error("Missing Shopify credentials:", {
      domain: SHOPIFY_STORE_DOMAIN,
      hasToken: !!SHOPIFY_ADMIN_TOKEN,
    });
    throw new Error("Shopify API credentials not configured");
  }

  try {
    // Prepare line items (custom line items - no variant IDs needed)
    const lineItems = orderData.items.map((item) => ({
      title: item.name,
      price: item.price.toString(),
      quantity: item.quantity,
      properties: [
        { name: "product_id", value: item.id.toString() },
        { name: "product_name", value: item.name },
        ...(item.image ? [{ name: "image_url", value: item.image }] : []),
      ],
    }));

    // Prepare shipping address
    const shippingAddress = {
      first_name: orderData.contact.firstName,
      last_name: orderData.contact.lastName || "",
      address1: orderData.shipping.address,
      city: orderData.shipping.city,
      province: orderData.shipping.province,
      country: "Pakistan",
      phone: orderData.contact.phone,
      zip: orderData.shipping.zipCode || "",
    };

    // Create order payload
    const orderPayload = {
      order: {
        email:
          orderData.contact.email || `order-${Date.now()}@flowersheavenly.com`,
        phone: orderData.contact.phone,
        line_items: lineItems,
        shipping_address: shippingAddress,
        billing_address: shippingAddress,
        financial_status: "pending",
        note: orderData.notes || "",
        tags:
          orderData.payment.method === "cod"
            ? "Cash on Delivery"
            : "Bank Transfer",
        note_attributes: [
          {
            name: "payment_method",
            value: orderData.payment.method,
          },
          {
            name: "payment_reference",
            value: orderData.payment.reference || "COD",
          },
          {
            name: "delivery_notes",
            value: orderData.notes || "",
          },
        ],
        // customer: {
        //   first_name: orderData.contact.firstName,
        //   last_name: orderData.contact.lastName || "",
        //   email:
        //     orderData.contact.email ||
        //     `customer-${Date.now()}@flowersheavenly.com`,
        //   phone: orderData.contact.phone,
        //   verified_email: true,
        // },
      },
    };

    console.log("Calling Shopify API...", {
      domain: SHOPIFY_STORE_DOMAIN,
      url: `https://${SHOPIFY_STORE_DOMAIN}/admin/api/2024-01/orders.json`,
    });

    // Make API call to create order
    const response = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/admin/api/2024-01/orders.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
        },
        body: JSON.stringify(orderPayload),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Shopify API error response:", {
        status: response.status,
        statusText: response.statusText,
        result,
      });
      throw new Error(
        result.errors
          ? JSON.stringify(result.errors)
          : `Shopify API error: ${response.status}`
      );
    }

    if (result.errors) {
      console.error("Shopify order errors:", result.errors);
      throw new Error(JSON.stringify(result.errors));
    }

    console.log("Order created successfully:", result.order);
    return result.order;
  } catch (error) {
    console.error("Create order error:", error);
    throw error;
  }
}

/**
 * Simple version for testing
 */
export async function createSimpleOrder(
  items,
  customerInfo,
  shippingInfo,
  paymentInfo
) {
  const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN;

  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_ADMIN_TOKEN) {
    throw new Error("Missing Shopify credentials");
  }

  const orderData = {
    order: {
      line_items: items.map((item) => ({
        title: item.name,
        quantity: item.quantity,
        price: item.price.toString(),
        properties: [{ name: "custom_id", value: item.id }],
      })),
      customer: {
        first_name: customerInfo.firstName,
        last_name: customerInfo.lastName || "",
        email:
          customerInfo.email || `customer-${Date.now()}@flowersheavenly.com`,
        phone: customerInfo.phone,
      },
      shipping_address: {
        first_name: customerInfo.firstName,
        last_name: customerInfo.lastName || "",
        address1: shippingInfo.address,
        city: shippingInfo.city,
        province: shippingInfo.province,
        country: "Pakistan",
        phone: customerInfo.phone,
      },
      billing_address: {
        first_name: customerInfo.firstName,
        last_name: customerInfo.lastName || "",
        address1: shippingInfo.address,
        city: shippingInfo.city,
        province: shippingInfo.province,
        country: "Pakistan",
        phone: customerInfo.phone,
      },
      financial_status: "pending",
      note: `Payment Method: ${paymentInfo.method}. Reference: ${
        paymentInfo.reference || "COD"
      }`,
      tags: paymentInfo.method === "cod" ? "COD" : "Bank Transfer",
    },
  };

  const response = await fetch(
    `https://${SHOPIFY_STORE_DOMAIN}/admin/api/2024-01/orders.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
      },
      body: JSON.stringify(orderData),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.errors ? JSON.stringify(result.errors) : "API error"
    );
  }

  return result;
}
export async function getCustomerOrders(accessToken) {
  const query = `
    query getCustomerOrders($customerAccessToken: String!, $first: Int = 10) {
      customer(customerAccessToken: $customerAccessToken) {
        orders(first: $first, reverse: true) {
          edges {
            node {
              id
              orderNumber
              processedAt
              financialStatus
              fulfillmentStatus
              totalPrice {
                amount
                currencyCode
              }
              lineItems(first: 3) {
                edges {
                  node {
                    title
                    quantity
                    variant {
                      title
                      image {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    customerAccessToken: accessToken,
    first: 10,
  };

  try {
    const response = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
        },
        body: JSON.stringify({ query, variables }),
      }
    );

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    return result.data.customer?.orders?.edges || [];
  } catch (error) {
    console.error("Get customer orders error:", error);
    throw error;
  }
}
export async function loginCustomer(email, password) {
  const mutation = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: { email, password },
  };

  try {
    const response = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
        },
        body: JSON.stringify({ query: mutation, variables }),
      }
    );

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    if (result.data.customerAccessTokenCreate.customerUserErrors.length > 0) {
      const errors = result.data.customerAccessTokenCreate.customerUserErrors;
      throw new Error(errors.map((err) => err.message).join(", "));
    }

    return result.data.customerAccessTokenCreate.customerAccessToken;
  } catch (error) {
    console.error("Shopify login error:", error);
    throw error;
  }
}

// Function to get customer data using access token
export async function getCustomerData(accessToken) {
  const query = `
    query getCustomer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        firstName
        lastName
        email
        phone
        acceptsMarketing
        createdAt
      }
    }
  `;

  const variables = { customerAccessToken: accessToken };

  try {
    const response = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
        },
        body: JSON.stringify({ query, variables }),
      }
    );

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    return result.data.customer;
  } catch (error) {
    console.error("Get customer data error:", error);
    throw error;
  }
}
const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_STOREFRONT_API_TOKEN;
export async function createCustomerInShopify(customerData) {
  const mutation = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
          firstName
          lastName
          phone
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  // FIX: Format phone for Pakistan OR send null if empty
  let phoneValue = null;

  if (customerData.phone && customerData.phone.trim() !== "") {
    const phone = customerData.phone.trim();

    // Format for Pakistan: +92XXXXXXXXXX
    // Remove all non-digits
    let digits = phone.replace(/\D/g, "");

    // Remove leading 0 if present
    if (digits.startsWith("0")) {
      digits = digits.substring(1);
    }

    // Ensure it starts with Pakistan code (92)
    if (!digits.startsWith("92") && digits.length <= 10) {
      digits = "92" + digits;
    }

    // Add + prefix
    phoneValue = "+" + digits;

    // Basic validation: must be between 12-14 characters total
    // +92 (3 digits) = 12 chars minimum for Pakistan
    if (phoneValue.length < 12 || phoneValue.length > 14) {
      throw new Error(
        "Please enter a valid Pakistani phone number (e.g., 0300 1234567)"
      );
    }
  }

  const variables = {
    input: {
      email: customerData.email,
      password: customerData.password,
      firstName: customerData.firstName,
      lastName: customerData.lastName || null,
      phone: phoneValue, // Formatted phone or null
      acceptsMarketing: customerData.acceptsMarketing || false,
    },
  };

  try {
    const response = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
        },
        body: JSON.stringify({ query: mutation, variables }),
      }
    );

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    // Handle the "verification email sent" message
    if (result.data.customerCreate.customer) {
      const userErrors = result.data.customerCreate.customerUserErrors;

      // If it's just the email verification message, still return success
      const isVerificationMessage =
        userErrors.length > 0 &&
        userErrors.some((err) => err.message.includes("sent an email"));

      if (isVerificationMessage) {
        console.log("Note: Verification email was sent to customer");
        return result.data.customerCreate.customer;
      }

      // If there are real errors, throw them
      if (userErrors.length > 0) {
        throw new Error(userErrors.map((err) => err.message).join(", "));
      }

      return result.data.customerCreate.customer;
    }

    throw new Error("Customer creation failed");
  } catch (error) {
    console.error("Shopify customer creation error:", error);
    throw error;
  }
}

// Add other Storefront API functions as needed
export async function getCustomerAccessToken(email, password) {
  const mutation = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: { email, password },
  };

  const response = await fetch(
    `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query: mutation, variables }),
    }
  );

  const result = await response.json();
  return result.data.customerAccessTokenCreate;
}

export async function fetchProductByHandle(handle) {
  const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_STOREFRONT_API_TOKEN;

  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN) {
    console.error("Missing Shopify environment variables");
    return null;
  }

  const query = `
    query GetProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        description
        descriptionHtml
        vendor
        tags
        featuredImage {
          url
          altText
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        compareAtPriceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        options {
          name
          values
        }
        variants(first: 10) {
          edges {
            node {
              availableForSale
              price {
                amount
              }
              compareAtPrice {
                amount
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
        },
        body: JSON.stringify({ query, variables: { handle } }),
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`);
    }

    const result = await response.json();

    if (result.errors) {
      console.error("GraphQL Errors:", result.errors);
      return null;
    }

    return result.data.productByHandle;
  } catch (error) {
    console.error(`Error fetching product ${handle}:`, error);
    return null;
  }
}
// In app/lib/shopify.js - REPLACE THE EXISTING FUNCTION
// SIMPLE WORKING VERSION - Use this instead
export async function fetchShopifyCollections(first = 10) {
  const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_STOREFRONT_API_TOKEN;

  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN) {
    console.error("Missing Shopify environment variables");
    return [];
  }

  // Simple query without product count
  const query = `
    query GetCollections($first: Int!) {
      collections(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            image {
              url
              altText
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
        },
        body: JSON.stringify({ query, variables: { first } }),
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`);
    }

    const result = await response.json();

    if (result.errors) {
      console.error("GraphQL Errors:", result.errors);
      return [];
    }

    return result.data.collections.edges.map((edge) => ({
      id: edge.node.id,
      title: edge.node.title,
      handle: edge.node.handle,
      description: edge.node.description,
      image: edge.node.image?.url || null,
      altText: edge.node.image?.altText || edge.node.title,
      // Don't include count - we'll calculate it differently
    }));
  } catch (error) {
    console.error("Error fetching Shopify collections:", error);
    return [];
  }
}
// export async function fetchShopifyProducts() {
//   const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
//   const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_STOREFRONT_API_TOKEN;

//   if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN) {
//     console.error("Missing Shopify environment variables");
//     return [];
//   }

//   const query = `
//     query GetProducts($first: Int = 20) {
//       products(first: $first) {
//         edges {
//           node {
//             id
//             title
//             handle
//             description
//             descriptionHtml
//             featuredImage {
//               url
//               altText
//               width
//               height
//             }
//             priceRange {
//               minVariantPrice {
//                 amount
//                 currencyCode
//               }
//               maxVariantPrice {
//                 amount
//                 currencyCode
//               }
//             }
//             tags
//             totalInventory
//           }
//         }
//       }
//     }
//   `;

//   try {
//     const response = await fetch(
//       `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
//         },
//         body: JSON.stringify({ query, variables: { first: 12 } }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`Shopify API error: ${response.statusText}`);
//     }

//     const result = await response.json();

//     if (result.errors) {
//       console.error("GraphQL Errors:", result.errors);
//       return [];
//     }

//     // Transform the data to a simpler format
//     return result.data.products.edges.map((edge) => ({
//       id: edge.node.id,
//       title: edge.node.title,
//       handle: edge.node.handle,
//       description: edge.node.description,
//       image: edge.node.featuredImage?.url || null,
//       altText: edge.node.featuredImage?.altText || edge.node.title,
//       price: edge.node.priceRange?.minVariantPrice?.amount || "0",
//       currency: edge.node.priceRange?.minVariantPrice?.currencyCode || "USD",
//       tags: edge.node.tags || [],
//       inStock: edge.node.totalInventory > 0,
//     }));
//   } catch (error) {
//     console.error("Error fetching Shopify products:", error);
//     return [];
//   }
// }

// Fetch blogs from Shopify
export async function fetchShopifyBlogs(first = 10) {
  const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_STOREFRONT_API_TOKEN;

  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN) {
    console.error("Missing Shopify environment variables");
    return [];
  }

  const query = `
    query GetBlogs($first: Int!) {
      blogs(first: $first) {
        edges {
          node {
            id
            title
            handle
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
        },
        body: JSON.stringify({ query, variables: { first } }),
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`);
    }

    const result = await response.json();

    if (result.errors) {
      console.error("GraphQL Errors:", result.errors);
      return [];
    }

    return result.data.blogs.edges.map((edge) => ({
      id: edge.node.id,
      title: edge.node.title,
      handle: edge.node.handle,
    }));
  } catch (error) {
    console.error("Error fetching Shopify blogs:", error);
    return [];
  }
}

// Fetch articles from a specific blog
export async function fetchShopifyBlogArticles(blogHandle = "news", first = 50) {
  const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_STOREFRONT_API_TOKEN;

  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN) {
    console.error("Missing Shopify environment variables");
    return [];
  }

  const query = `
    query GetBlogArticles($handle: String!, $first: Int!) {
      blogByHandle(handle: $handle) {
        id
        title
        handle
        articles(first: $first) {
          edges {
            node {
              id
              title
              handle
              excerpt
              excerptHtml
              content
              contentHtml
              author {
                name
              }
              publishedAt
              tags
              image {
                url
                altText
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
        },
        body: JSON.stringify({ query, variables: { handle: blogHandle, first } }),
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Shopify API error: ${response.statusText}`, errorText);
      throw new Error(`Shopify API error: ${response.statusText}`);
    }

    const result = await response.json();

    if (result.errors) {
      console.error("GraphQL Errors:", result.errors);
      // If blog not found, try to list available blogs
      if (result.errors.some(e => e.message?.includes("Could not find") || e.message?.includes("not found"))) {
        console.warn(`Blog with handle "${blogHandle}" not found. Fetching available blogs...`);
        const availableBlogs = await fetchShopifyBlogs(10);
        console.log("Available blogs:", availableBlogs);
        if (availableBlogs.length > 0) {
          console.log(`Try using blog handle: "${availableBlogs[0].handle}"`);
        }
      }
      return [];
    }

    if (!result.data.blogByHandle) {
      console.warn(`Blog with handle "${blogHandle}" not found.`);
      // Try to fetch available blogs
      const availableBlogs = await fetchShopifyBlogs(10);
      if (availableBlogs.length > 0) {
        console.log("Available blogs:", availableBlogs);
        console.log(`Try using blog handle: "${availableBlogs[0].handle}"`);
      }
      return [];
    }

    const articles = result.data.blogByHandle.articles.edges;
    console.log(`Found ${articles.length} articles in blog "${result.data.blogByHandle.title}" (handle: "${result.data.blogByHandle.handle}")`);
    
    if (articles.length === 0) {
      console.warn(`Blog "${result.data.blogByHandle.title}" exists but has no published articles.`);
    }

    // Transform Shopify articles to match the expected blog post format
    return result.data.blogByHandle.articles.edges.map((edge) => {
      const article = edge.node;
      const publishedDate = new Date(article.publishedAt);
      const formattedDate = publishedDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      // Calculate read time (rough estimate: 200 words per minute)
      const wordCount = article.contentHtml
        ? article.contentHtml.replace(/<[^>]*>/g, "").split(/\s+/).length
        : 0;
      const readTime = Math.max(1, Math.ceil(wordCount / 200));

      // Extract category from tags or use first tag
      const category = article.tags && article.tags.length > 0 
        ? article.tags[0].charAt(0).toUpperCase() + article.tags[0].slice(1)
        : "General";

      return {
        id: article.id,
        slug: article.handle,
        title: article.title,
        excerpt: article.excerpt || article.excerptHtml?.replace(/<[^>]*>/g, "") || "",
        content: article.contentHtml || article.content || "",
        author: article.author?.name || "Roselle Studio",
        authorRole: "Editor",
        date: formattedDate,
        readTime: `${readTime} min read`,
        category: category,
        tags: article.tags || [],
        image: article.image?.url || "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=600",
        featured: article.tags?.some(tag => tag.toLowerCase().includes("featured")) || false,
      };
    });
  } catch (error) {
    console.error("Error fetching Shopify blog articles:", error);
    return [];
  }
}

// Fetch a single article by handle
export async function fetchShopifyArticleByHandle(blogHandle, articleHandle) {
  const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_STOREFRONT_API_TOKEN;

  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN) {
    console.error("Missing Shopify environment variables");
    return null;
  }

  const query = `
    query GetArticle($blogHandle: String!, $articleHandle: String!) {
      blogByHandle(handle: $blogHandle) {
        id
        title
        articleByHandle(handle: $articleHandle) {
          id
          title
          handle
          excerpt
          excerptHtml
          content
          contentHtml
          author {
            name
          }
          publishedAt
          tags
          image {
            url
            altText
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
        },
        body: JSON.stringify({ 
          query, 
          variables: { blogHandle, articleHandle } 
        }),
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`);
    }

    const result = await response.json();

    if (result.errors) {
      console.error("GraphQL Errors:", result.errors);
      return null;
    }

    if (!result.data.blogByHandle?.articleByHandle) {
      return null;
    }

    const article = result.data.blogByHandle.articleByHandle;
    const publishedDate = new Date(article.publishedAt);
    const formattedDate = publishedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const wordCount = article.contentHtml
      ? article.contentHtml.replace(/<[^>]*>/g, "").split(/\s+/).length
      : 0;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    const category = article.tags && article.tags.length > 0 
      ? article.tags[0].charAt(0).toUpperCase() + article.tags[0].slice(1)
      : "General";

    return {
      id: article.id,
      slug: article.handle,
      title: article.title,
      excerpt: article.excerpt || article.excerptHtml?.replace(/<[^>]*>/g, "") || "",
      content: article.contentHtml || article.content || "",
      author: article.author?.name || "Roselle Studio",
      authorRole: "Editor",
      date: formattedDate,
      readTime: `${readTime} min read`,
      category: category,
      tags: article.tags || [],
      image: article.image?.url || "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=600",
      featured: article.tags?.some(tag => tag.toLowerCase().includes("featured")) || false,
    };
  } catch (error) {
    console.error("Error fetching Shopify article:", error);
    return null;
  }
}
