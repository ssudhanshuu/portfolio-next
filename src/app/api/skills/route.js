import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Skill from "@/models/Skill";

export async function GET() {
  try {
    await dbConnect();
    const allSkills = await Skill.find();
    if (!allSkills || allSkills.length === 0) {
      return NextResponse.json([]);
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

export async function PUT(req) {
  try {
    await dbConnect();
    const { category, oldName, name, proficiency, year } = await req.json();

    const safeCategory = String(category || "").trim();
    const safeOldName = String(oldName || "").trim();
    const safeName = String(name || "").trim();

    if (!safeCategory || !safeOldName || !safeName) {
      return NextResponse.json({ success: false, message: "Category, old name and new name are required." }, { status: 400 });
    }

    const categoryDoc = await Skill.findOne({ category: safeCategory });
    if (!categoryDoc) {
      return NextResponse.json({ success: false, message: "Category not found." }, { status: 404 });
    }

    const skillIndex = categoryDoc.skills.findIndex((skill) => skill.name?.trim() === safeOldName);
    if (skillIndex === -1) {
      return NextResponse.json({ success: false, message: "Skill not found." }, { status: 404 });
    }

    const normalizedOldName = safeOldName.toLowerCase();
    const normalizedNewName = safeName.toLowerCase();

    if (normalizedOldName !== normalizedNewName) {
      const duplicate = categoryDoc.skills.find(
        (skill, index) =>
          index !== skillIndex &&
          String(skill.name || "").trim().toLowerCase() === normalizedNewName
      );

      if (duplicate) {
        return NextResponse.json({ success: false, message: "Skill already exists in this category." }, { status: 409 });
      }
    }

    categoryDoc.skills[skillIndex] = {
      ...categoryDoc.skills[skillIndex],
      name: safeName,
      proficiency: Number(proficiency) || categoryDoc.skills[skillIndex].proficiency,
      year: Number(year) || categoryDoc.skills[skillIndex].year,
    };

    await categoryDoc.save();

    return NextResponse.json({ success: true, data: categoryDoc.skills });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Unable to update skill." }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();
    const { category, name } = await req.json();

    if (!category || !name) {
      return NextResponse.json({ success: false, message: "Category and skill name are required." }, { status: 400 });
    }

    const categoryDoc = await Skill.findOne({ category });
    if (!categoryDoc) {
      return NextResponse.json({ success: false, message: "Category not found." }, { status: 404 });
    }

    const originalLength = categoryDoc.skills.length;
    categoryDoc.skills = categoryDoc.skills.filter((skill) => skill.name !== name);

    if (categoryDoc.skills.length === originalLength) {
      return NextResponse.json({ success: false, message: "Skill not found." }, { status: 404 });
    }

    if (categoryDoc.skills.length === 0) {
      await Skill.deleteOne({ _id: categoryDoc._id });
    } else {
      await categoryDoc.save();
    }

    return NextResponse.json({ success: true, message: "Skill deleted successfully." });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Unable to delete skill." }, { status: 500 });
  }
}
