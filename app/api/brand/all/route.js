import { NextResponse } from "next/server";
import Brand from "@/models/Brand";
import connectMongo from "@/libs/mongoose";

export async function GET() {
  try {
    await connectMongo();

    const brands = await Brand.find({ status: "active" })
      .select(
        "displayName username shortTitle avatar industry marketBudget tags about"
      )
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      brands,
    });
  } catch (error) {
    console.error("Failed to fetch brands:", error);
    return NextResponse.json(
      { error: "Failed to fetch brands" },
      { status: 500 }
    );
  }
}
