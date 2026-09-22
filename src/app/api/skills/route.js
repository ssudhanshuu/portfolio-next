import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Skill from "@/models/Skill";

export async function GET() {
  try {
    await dbConnect();
    const allSkills = await Skill.find();
    if (!allSkills || allSkills.length === 0) {
      return NextResponse.json({ error: "No skills found" }, { status: 404 });
    }
    return NextResponse.json(allSkills);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const { category, name, proficiency, year } = await req.json();

    let categoryDoc = await Skill.findOne({ category });

    if (!categoryDoc) {
      categoryDoc = new Skill({
        category,
        skills: [{ name, proficiency, year }],
      });
    } else {
      const exists = categoryDoc.skills.find((skill) => skill.name === name);
      if (exists) {
        return NextResponse.json({ error: "Skill already exists in this category." }, { status: 409 });
      }
      categoryDoc.skills.push({ name, proficiency, year });
    }

    await categoryDoc.save();
    return NextResponse.json(categoryDoc.skills, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
