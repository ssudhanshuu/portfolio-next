import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Skill from "@/models/Skill";

// Public API - fetch all skills for the frontend
export async function GET() {
  try {
    await dbConnect();
    const skills = await Skill.find();
    return NextResponse.json(skills);
  } catch (err) {
    console.error("Error fetching skills:", err);
    return NextResponse.json([], { status: 500 });
  }
}
