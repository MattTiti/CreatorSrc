import connectMongo from "@/libs/mongoose";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import Brand from "@/models/Brand";

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectMongo();

    const productId = params.id;

    // Find the product first to verify ownership
    const product = await Product.findById(productId);
    if (!product) {
      return Response.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    // Verify the product belongs to the current user's brand
    const brand = await Brand.findOne({ userId: session.user.id });
    if (!brand || product.brandId.toString() !== brand._id.toString()) {
      return Response.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }

    // Delete the product
    await Product.findByIdAndDelete(productId);

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return Response.json(
      { success: false, error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
