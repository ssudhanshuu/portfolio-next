import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Project from "@/models/Project";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const formData = await req.formData();
    
    const name = formData.get("name");
    const tagline = formData.get("tagline");
    const description = formData.get("description");
    const technologies = formData.get("technologies");
    const category = formData.get("category");
    const role = formData.get("role");
    const duration = formData.get("duration");
    const status = formData.get("status");
    const liveDemo = formData.get("liveDemo");
    const github = formData.get("github");

    if (!name || !description || !category) {
      return NextResponse.json(
        { success: false, message: "Name, description and category are required." },
        { status: 400 }
      );
    }

    const techArray = typeof technologies === "string" 
      ? technologies.split(",").map((t) => t.trim()) 
      : [];

    // Upload main image to Cloudinary
    let mainImageUrl = null;
    const imageFile = formData.get("image");
    
    if (imageFile && imageFile.name) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const result = await uploadToCloudinary(buffer, "portfolio/projects");
      mainImageUrl = result.secure_url;
    }

    // Upload screenshots to Cloudinary
    let screenshotUrls = [];
    const screenshotFiles = formData.getAll("screenshots");
    if (screenshotFiles && screenshotFiles.length > 0) {
      for (const file of screenshotFiles) {
        if (file && file.name) {
          const buffer = Buffer.from(await file.arrayBuffer());
          const result = await uploadToCloudinary(buffer, "portfolio/projects/screenshots");
          screenshotUrls.push(result.secure_url);
        }
      }
    }

    const project = await Project.create({
      name,
      tagline,
      description,
      technologies: techArray,
      category,
      role,
      duration,
      status,
      liveDemo,
      github,
      image: mainImageUrl,
      screenshots: screenshotUrls,
    });

    return NextResponse.json({ success: true, message: "Project created successfully!", data: project }, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
