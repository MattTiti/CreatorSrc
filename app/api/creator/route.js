import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import Creator from "@/models/Creator";
import User from "@/models/User";
import connectMongo from "@/libs/mongoose";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectMongo();

    // Get user by ID
    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get creator profile
    const creator = await Creator.findOne({ userId: user._id });

    // Return combined user and creator data (if creator exists)
    return NextResponse.json({
      success: true,
      profile: {
        ...(creator
          ? creator.toObject()
          : {
              displayName: "",
              username: "",
              contactEmail: "",
              shortTitle: "",
              about: "",
              avatar: "",
              links: [],
              priceRange: { min: "", max: "" },
              platforms: [],
              tags: [],
            }),
      },
    });
  } catch (error) {
    console.error("Failed to fetch creator profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch creator profile" },
      { status: 500 }
    );
  }
}
