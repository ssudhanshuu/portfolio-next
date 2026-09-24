import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";

// Public API - fetch all blogs for the frontend
export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return NextResponse.json(blogs);
  } catch (err) {
    console.error("Error fetching blogs:", err);
    return NextResponse.json([], { status: 500 });
  }
}
