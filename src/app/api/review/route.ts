import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, role, company, review, rating } = body;

    // Server-side validation
    if (!name?.trim() || !review?.trim()) {
      return NextResponse.json(
        { error: "Name and review text are required." },
        { status: 400 }
      );
    }

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5." },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("reviews").insert([
      {
        name: name.trim(),
        role: role?.trim() || null,
        company: company?.trim() || null,
        review: review.trim(),
        rating,
      },
    ]);

    if (error) {
      console.error("Supabase insert error (review):", error);
      return NextResponse.json(
        { error: "Failed to submit review. Please try again." },
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
