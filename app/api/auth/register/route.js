import { createCustomerWithInviteAdmin } from "../../../lib/shopify";

/**
 * POST /api/auth/register
 * Body: { email, firstName?, lastName?, phone? }
 * Creates customer with email only via Shopify Admin API and sends account invite.
 * Customer sets password via the email link (verification).
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";
    if (!email) {
      return Response.json(
        { success: false, error: "Email is required." },
        { status: 400 }
      );
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return Response.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }
    const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
    const lastName = typeof body.lastName === "string" ? body.lastName.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";

    const result = await createCustomerWithInviteAdmin({
      email,
      firstName: firstName || null,
      lastName: lastName || null,
      phone: phone || null,
    });

    return Response.json({
      success: true,
      message: "Check your email to set your password and activate your account.",
      customer: result.customer,
    });
  } catch (error) {
    console.error("Register API error:", error);
    const message =
      error.message?.includes("already been taken") ||
      error.message?.toLowerCase().includes("already exists")
        ? "This email is already registered. Please sign in or use a different email."
        : error.message || "Registration failed. Please try again.";
    return Response.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
