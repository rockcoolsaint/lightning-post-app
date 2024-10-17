import connectMongoDB from "@/lib/connectMongo";
import User from "@/models/Users";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();

    const users = await User.find();

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      {error},
      {status: 500}
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectMongoDB();

    const body = await request.json()

    const user = await User.create(body);

    return NextResponse.json(user, {status: 201});
  } catch (error) {
    return NextResponse.json(
      {error: "Server Error"},
      {status: 500}
    )
  }
}