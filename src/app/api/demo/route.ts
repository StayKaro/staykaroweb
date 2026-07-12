import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, company, message } = body;

    // Server-side validation
    if (!name?.trim() || !phone?.trim() || !email?.trim() || !company?.trim()) {
      return NextResponse.json(
        { error: "Name, phone, email, and company are required." },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("demo_requests").insert([
      {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        company: company.trim(),
        message: message?.trim() || null,
      },
    ]);

    if (error) {
      console.error("Supabase insert error (demo):", error);
      return NextResponse.json(
        { error: "Failed to submit. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}
