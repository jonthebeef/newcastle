import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { markUserAsPaid } from "@/lib/clerk-helpers";

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await markUserAsPaid(userId);

    return NextResponse.json({
      success: true,
      message: "User marked as paid",
    });
  } catch (error) {
    console.error("Activation error:", error);
    return NextResponse.json(
      { error: "Failed to activate user" },
      { status: 500 }
    );
  }
}
