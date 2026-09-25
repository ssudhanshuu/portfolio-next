import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Project from "@/models/Project";

export async function GET(req, context) {
  try {
    const { params } = context;
    const resolvedParams = await params;
    await dbConnect();
    const projectId = String(resolvedParams?.id || req.nextUrl.searchParams.get("id") || "").trim();

    if (!projectId) {
      return NextResponse.json({ success: false, message: "Project ID is required" }, { status: 400 });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}

export async function PUT(req, context) {
  try {
    const { params } = context;
    const resolvedParams = await params;
    await dbConnect();
    const projectId = String(resolvedParams?.id || req.nextUrl.searchParams.get("id") || "").trim();
    if (!projectId) {
      return NextResponse.json({ success: false, message: "Project ID is required" }, { status: 400 });
    }

    const body = await req.json();

    const project = await Project.findByIdAndUpdate(
      projectId,
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

    if (!project) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  try {
    const { params } = context;
    const resolvedParams = await params;
    await dbConnect();
    const projectId = String(resolvedParams?.id || req.nextUrl.searchParams.get("id") || "").trim();
    if (!projectId) {
      return NextResponse.json({ success: false, message: "Project ID is required" }, { status: 400 });
    }

    const project = await Project.findByIdAndDelete(projectId);

    if (!project) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Project deleted successfully." });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
