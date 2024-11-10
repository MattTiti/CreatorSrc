import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    avatar: {
      type: String,
    },
    marketingBudget: {
      min: String,
      max: String,
    },
    tags: [
      {
        type: String,
      },
    ],
    images: [
      {
        type: String,
        max: 3,
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    links: [
      {
        name: String,
        url: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
