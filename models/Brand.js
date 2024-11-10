import mongoose from "mongoose";

const brandSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      trim: true,
      required: true,
    },
    username: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    avatar: {
      type: String,
    },
    industry: {
      type: String,
    },
    marketBudget: {
      min: String,
      max: String,
    },
    tags: [
      {
        type: String,
      },
    ],
    links: [
      {
        name: String,
        url: String,
      },
    ],
    about: {
      type: String,
      trim: true,
    },
    shortTitle: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Brand || mongoose.model("Brand", brandSchema);
