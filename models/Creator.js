import mongoose from "mongoose";

const creatorSchema = mongoose.Schema(
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
    priceRange: {
      min: {
        type: Number,
        min: 0,
      },
      max: {
        type: Number,
        min: 0,
      },
    },
    platforms: [
      {
        type: String,
      },
    ],
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
    shortTitle: {
      type: String,
      trim: true,
      required: true,
    },
    about: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

// Add a pre-save validation to ensure min is less than max
creatorSchema.pre("save", function (next) {
  if (this.priceRange.min && this.priceRange.max) {
    if (this.priceRange.min > this.priceRange.max) {
      next(new Error("Minimum price cannot be greater than maximum price"));
    }
  }
  next();
});

export default mongoose.models.Creator ||
  mongoose.model("Creator", creatorSchema);
