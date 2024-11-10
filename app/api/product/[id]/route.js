import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Product from "@/models/Product";

export async function GET(request, { params }) {
  try {
    await connectMongo();

    const product = await Product.findById(params.id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      product: {
        id: product._id,
        brandId: product.brandId,
        name: product.name,
        description: product.description,
        category: product.category,
        marketingBudget: product.marketingBudget,
        tags: product.tags,
        avatar: product.avatar,
        images: product.images,
        status: product.status,
      },
    });
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
