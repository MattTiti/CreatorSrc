import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

// USER SCHEMA
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      private: true,
    },
    accountType: {
      type: String,
      enum: ["creator", "brand"],
      required: true,
    },
    // Stripe fields
    customerId: {
      type: String,
      validate(value) {
        return value.includes("cus_");
      },
    },
    priceId: {
      type: String,
      validate(value) {
        return value.includes("price_");
      },
    },
    hasAccess: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// Virtual populate fields
userSchema.virtual("creator", {
  ref: "Creator",
  localField: "_id",
  foreignField: "userId",
  justOne: true,
});

userSchema.virtual("brand", {
  ref: "Brand",
  localField: "_id",
  foreignField: "userId",
  justOne: true,
});

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);

export default mongoose.models.User || mongoose.model("User", userSchema);
