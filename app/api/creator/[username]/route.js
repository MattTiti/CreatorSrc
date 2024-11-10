import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Creator from "@/models/Creator";

export async function GET(request, { params }) {
  try {
    await connectMongo();

    const creator = await Creator.findOne({ username: params.username });

    if (!creator) {
      return NextResponse.json({ error: "Creator not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      creator: {
        displayName: creator.displayName,
        username: creator.username,
        shortTitle: creator.shortTitle,
        contactEmail: creator.contactEmail,
        avatar: creator.avatar,
        about: creator.about,
        priceRange: creator.priceRange,
        platforms: creator.platforms,
        tags: creator.tags,
        links: creator.links,
        status: creator.status,
      },
    });
  } catch (error) {
    console.error("Failed to fetch creator:", error);
    return NextResponse.json(
      { error: "Failed to fetch creator" },
      { status: 500 }
    );
  }
}
