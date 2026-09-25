import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";

export async function GET(req, context) {
  try {
    const { params } = context;
    const resolvedParams = await params;
    await dbConnect();

    const blogId = String(resolvedParams?.id || req.nextUrl.searchParams.get("id") || "").trim();
    if (!blogId) {
      return NextResponse.json({ success: false, message: "Blog ID is required" }, { status: 400 });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}

export async function PUT(req, context) {
  try {
    const { params } = context;
    const resolvedParams = await params;
    await dbConnect();

    const blogId = String(resolvedParams?.id || req.nextUrl.searchParams.get("id") || "").trim();
    if (!blogId) {
      return NextResponse.json({ success: false, message: "Blog ID is required" }, { status: 400 });
    }

    const body = await req.json();

    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        name: body.name,
        tagline: body.tagline,
        description: body.description,
        technologies: Array.isArray(body.technologies)
          ? body.technologies
          : String(body.technologies || "")
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        category: body.category,
        role: body.role,
        duration: body.duration,
        status: body.status,
        liveDemo: body.liveDemo,
        github: body.github,
        image: body.image,
        screenshots: Array.isArray(body.screenshots) ? body.screenshots : [],
      },
      { new: true }
    );

    if (!blog) {
      return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  try {
    const { params } = context;
    const resolvedParams = await params;
    await dbConnect();

    const blogId = String(resolvedParams?.id || req.nextUrl.searchParams.get("id") || "").trim();
    if (!blogId) {
      return NextResponse.json({ success: false, message: "Blog ID is required" }, { status: 400 });
    }

    const blog = await Blog.findByIdAndDelete(blogId);

    if (!blog) {
      return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Blog deleted successfully." });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
