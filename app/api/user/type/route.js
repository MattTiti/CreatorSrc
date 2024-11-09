import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import User from "@/models/User";
import connectMongo from "@/libs/mongoose";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectMongo();

    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      accountType: user?.accountType || "creator",
    });
  } catch (error) {
    console.error("Failed to fetch user type:", error);
    return NextResponse.json(
      { error: "Failed to fetch user type" },
      { status: 500 }
    );
  }
}
