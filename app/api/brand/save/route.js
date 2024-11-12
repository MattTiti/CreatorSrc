import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import Brand from "@/models/Brand";
import User from "@/models/User";
import connectMongo from "@/libs/mongoose";
import { validateUsername } from "@/lib/utils";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectMongo();
    const data = await request.json();

    // Validate username
    const error = validateUsername(data.username);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    // Check if username is already taken (by another user)
    const existingUser = await Brand.findOne({
      username: data.username,
      userId: { $ne: session.user.id },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Username is already taken" },
        { status: 400 }
      );
    }

    // Get user by ID
    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update or create brand profile
    const brand = await Brand.findOneAndUpdate(
      { userId: user._id },
      {
        _id: data._id,
        userId: user._id,
        displayName: data.displayName,
        username: data.username,
        contactEmail: data.contactEmail,
        shortTitle: data.shortTitle,
        avatar: data.avatar,
        about: data.about,
        industry: data.industry,
        marketBudget: data.marketBudget,
        tags: data.tags,
        links: data.links,
        status: data.status,
      },
      { upsert: true, new: true }
    );

    // Update user's basic info
    await User.findByIdAndUpdate(user._id, {
      name: data.name,
      username: data.username,
      accountType: "brand",
    });

    return NextResponse.json({
      success: true,
      brand,
    });
  } catch (error) {
    console.error("Failed to save brand profile:", error);
    return NextResponse.json(
      { error: "Failed to save brand profile" },
      { status: 500 }
    );
  }
}
