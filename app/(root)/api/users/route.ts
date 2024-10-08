import { connectToDB } from "@/lib/db/MongoDB";
import { User } from "@/lib/models/User";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unautorized", { status: 401 });
    }
    await connectToDB();

    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      user = await User.create({ clerkId: userId });
      await user.save();
    }
    {

      return NextResponse.json(user, { status: 200 });
      
    }
  } catch (error) {
    console.log("[User_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
export const dynamic = "force-dynamic";