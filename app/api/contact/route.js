import { NextResponse } from "next/server";

// Contact form submits via Web3Forms from the client (app/contact/page.js).

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      error: "Contact form uses Web3Forms. Submit from the contact page.",
    },
    { status: 410 }
  );
}
