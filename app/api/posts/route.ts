import connectMongoDB from "@/lib/connectMongo";
import Post from "@/models/Posts";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();

    const posts = await Post.find();

    return NextResponse.json(posts);
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

    const post = await Post.create(body);

    return NextResponse.json(post, {status: 201});
  } catch (error) {
    return NextResponse.json(
      {error: "Server Error"},
      {status: 500}
    )
  }
}