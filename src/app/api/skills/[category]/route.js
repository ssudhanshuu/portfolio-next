import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Skill from "@/models/Skill";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const categoryDoc = await Skill.findOne({ category: params.category });
    if (!categoryDoc) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }
    return NextResponse.json(categoryDoc.skills);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
