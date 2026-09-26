import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Testimonial from "@/models/Testimonial";
import { uploadFormFile } from "@/lib/cloudinary";

export async function GET() {
    try {
        await dbConnect();
        const testimonials = await Testimonial.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: testimonials });
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        return NextResponse.json(
            { success: false, message: "Unable to fetch testimonials." },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const formData = await request.formData();
        const name = String(formData.get("name") || "").trim();
        const role = String(formData.get("role") || "").trim();
        const company = String(formData.get("company") || "").trim();
        const testimonial = String(formData.get("testimonial") || "").trim();
        const rating = Number(formData.get("rating"));
        const projectName = String(formData.get("projectName") || "").trim();
        const photoFile = formData.get("photo");

        if (!name || !role || !company || !testimonial) {
            return NextResponse.json(
                { success: false, message: "Name, role, company, and testimonial are required." },
                { status: 400 }
            );
        }

        if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
            return NextResponse.json(
                { success: false, message: "Rating must be a whole number from 1 to 5." },
                { status: 400 }
            );
        }

        if (!photoFile || typeof photoFile === "string" || !photoFile.type.startsWith("image/")) {
            return NextResponse.json(
                { success: false, message: "A client photo is required." },
                { status: 400 }
            );
        }

        if (photoFile.size > 5 * 1024 * 1024) {
            return NextResponse.json(
                { success: false, message: "Photo must be 5 MB or smaller." },
                { status: 400 }
            );
        }

        const photo = await uploadFormFile(photoFile, "portfolio/testimonials");

        const created = await Testimonial.create({
            name,
            role,
            company,
            testimonial,
            photo,
            rating,
            projectName,
        });

        return NextResponse.json(
            { success: true, message: "Testimonial added successfully.", data: created },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating testimonial:", error);
        return NextResponse.json(
            { success: false, message: "Unable to add testimonial." },
            { status: 500 }
        );
    }
}