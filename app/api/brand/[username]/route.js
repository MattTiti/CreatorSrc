import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Brand from "@/models/Brand";

export async function GET(request, { params }) {
  try {
    await connectMongo();

    const brand = await Brand.findOne({ username: params.username });

    if (!brand) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      brand: {
        displayName: brand.displayName,
        username: brand.username,
        shortTitle: brand.shortTitle,
        contactEmail: brand.contactEmail,
        avatar: brand.avatar,
        about: brand.about,
        marketingBudget: brand.marketBudget, // Note: matches schema field name
        industry: brand.industry,
        tags: brand.tags,
        links: brand.links,
      },
    });
  } catch (error) {
    console.error("Failed to fetch brand:", error);
    return NextResponse.json(
      { error: "Failed to fetch brand" },
      { status: 500 }
    );
  }
}
