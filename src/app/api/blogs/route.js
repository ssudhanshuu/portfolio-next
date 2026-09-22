import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";
import fs from "fs/promises";
import path from "path";

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

    let mainImagePath = null;
    const imageFile = formData.get("image");
    
    // Process image file if present
    if (imageFile && imageFile.name) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const filename = `${Date.now()}-${imageFile.name}`;
      const uploadDir = path.join(process.cwd(), "public/uploads");
      
      // Ensure upload dir exists
      await fs.mkdir(uploadDir, { recursive: true });
      await fs.writeFile(path.join(uploadDir, filename), buffer);
      mainImagePath = `/uploads/${filename}`;
    }

    let screenshotPaths = [];
    const screenshotFiles = formData.getAll("screenshots");
    if (screenshotFiles && screenshotFiles.length > 0) {
      const uploadDir = path.join(process.cwd(), "public/uploads");
      await fs.mkdir(uploadDir, { recursive: true });

      for (const file of screenshotFiles) {
        if (file && file.name) {
          const buffer = Buffer.from(await file.arrayBuffer());
          const filename = `${Date.now()}-${file.name}`;
          await fs.writeFile(path.join(uploadDir, filename), buffer);
          screenshotPaths.push(`/uploads/${filename}`);
        }
      }
    }

    const blog = await Blog.create({
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
      image: mainImagePath,
      screenshots: screenshotPaths,
    });

    return NextResponse.json({ success: true, message: "Blog created successfully!", data: blog }, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
