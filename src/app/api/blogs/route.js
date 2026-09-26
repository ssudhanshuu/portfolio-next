import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";
import { uploadFormFile } from "@/lib/cloudinary";

export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const formData = await req.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const category = formData.get("category");

    if (!name || !description || !category) {
      return NextResponse.json(
        { success: false, message: "Name, description and category are required." },
        { status: 400 }
      );
    }

    const mainImageUrl = await uploadFormFile(formData.get("image"), "portfolio/blogs");

    const blog = await Blog.create({
      name,
      description,
      category,
      image: mainImageUrl,
    });

    return NextResponse.json({ success: true, message: "Blog created successfully!", data: blog }, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
