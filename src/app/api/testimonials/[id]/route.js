import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Testimonial from "@/models/Testimonial";
import { uploadFormFile } from "@/lib/cloudinary";

export async function PATCH(request, context) {
    try {
        const { id } = await context.params;
        const formData = await request.formData();
        const photoFile = formData.get("photo");

        if (!photoFile || typeof photoFile === "string" || !photoFile.type.startsWith("image/")) {
            return NextResponse.json(
                { success: false, message: "Choose a valid image file." },
                { status: 400 }
            );
        }

        if (photoFile.size > 5 * 1024 * 1024) {
            return NextResponse.json(
                { success: false, message: "Photo must be 5 MB or smaller." },
                { status: 400 }
            );
        }

        await dbConnect();
        const photo = await uploadFormFile(photoFile, "portfolio/testimonials");
        const updated = await Testimonial.findByIdAndUpdate(id, { photo }, { new: true });

        if (!updated) {
            return NextResponse.json(
                { success: false, message: "Testimonial not found." },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, message: "Client photo updated.", data: updated });
    } catch (error) {
        console.error("Error updating testimonial photo:", error);
        return NextResponse.json(
            { success: false, message: "Unable to update client photo." },
            { status: 500 }
        );
    }
}

export async function DELETE(request, context) {
    try {
        const { id } = await context.params;
        await dbConnect();
        const deleted = await Testimonial.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json(
                { success: false, message: "Testimonial not found." },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, message: "Testimonial deleted." });
    } catch (error) {
        console.error("Error deleting testimonial:", error);
        return NextResponse.json(
            { success: false, message: "Unable to delete testimonial." },
            { status: 500 }
        );
    }
}