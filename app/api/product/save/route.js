import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import Brand from "@/models/Brand";
import Product from "@/models/Product";
import connectMongo from "@/libs/mongoose";

export async function POST(request) {
  try {
    // Get user session
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectMongo();

    const productData = await request.json();

    // Find the brand profile for the current user
    const brand = await Brand.findOne({ userId: session.user.id });
    if (!brand) {
      return NextResponse.json(
        { success: false, error: "Brand profile not found" },
        { status: 404 }
      );
    }

    // If product has an id, update it, otherwise create new
    let product;
    if (productData._id) {
      product = await Product.findByIdAndUpdate(
        productData._id,
        {
          name: productData.name,
          description: productData.description,
          category: productData.category,
          marketingBudget: productData.marketingBudget,
          tags: productData.tags,
          avatar: productData.avatar,
          images: productData.images,
          brandId: brand._id,
        },
        { new: true }
      );
    } else {
      product = await Product.create({
        name: productData.name,
        description: productData.description,
        category: productData.category,
        marketingBudget: productData.marketingBudget,
        tags: productData.tags,
        avatar: productData.avatar,
        images: productData.images,
        brandId: brand._id,
      });
    }

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error saving product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save product" },
      { status: 500 }
    );
  }
}
