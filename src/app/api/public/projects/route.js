import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Project from "@/models/Project";

// Public API - fetch all projects for the frontend
export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find().sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    return NextResponse.json([], { status: 500 });
  }
}
