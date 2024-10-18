import connectMongoDB from "@/app/lib/connectMongo";
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

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connectMongoDB();

    const body = await req.json()

    const name = body.username.replace(/\s+/g, "");

    const newUserObject = {
      username: name,
    };

    const userExists = await User.findOne({username: name});

    if (userExists) {
      return NextResponse.json(userExists, {status: 200});
    }

    const user = await User.create(newUserObject);

    return NextResponse.json(user, {status: 201});
  } catch (error) {
    return NextResponse.json(
      {error: "Server Error"},
      {status: 500}
    )
  }
}