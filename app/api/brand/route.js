import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import Brand from "@/models/Brand";
import Product from "@/models/Product";
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

    // Get brand profile
    const brand = await Brand.findOne({ userId: user._id });

    // Get brand's products if brand exists
    const products = brand ? await Product.find({ brandId: brand._id }) : [];

    // Return combined user and brand data (if brand exists)
    return NextResponse.json({
      success: true,
      profile: {
        ...(brand
          ? brand.toObject()
          : {
              displayName: "",
              username: "",
              contactEmail: "",
              shortTitle: "",
              about: "",
              avatar: "",
              links: [],
              industry: "",
              marketBudget: { min: "", max: "" },
              tags: [],
            }),
        products: products,
      },
    });
  } catch (error) {
    console.error("Failed to fetch brand profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch brand profile" },
      { status: 500 }
    );
  }
}
