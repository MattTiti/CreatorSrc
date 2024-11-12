import { NextResponse } from "next/server";
import Brand from "@/models/Brand";
import connectMongo from "@/libs/mongoose";

export async function GET(request, { params }) {
  try {
    await connectMongo();

    const { username } = params;

    // Find brand by username
    const brand = await Brand.findOne({
      username: username,
    }).lean();

    if (!brand) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      brand: brand,
    });
  } catch (error) {
    console.error("Failed to fetch brand:", error);
    return NextResponse.json(
      { error: "Failed to fetch brand" },
      { status: 500 }
    );
  }
}
