import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Contact from "@/models/Contact";

export async function GET() {
    try {
        await dbConnect();
        const contacts = await Contact.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: contacts });
    } catch (error) {
        console.error("Error fetching contacts:", error);
        return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();

        const name = String(body?.name || "").trim();
        const email = String(body?.email || "").trim();
        const subject = String(body?.subject || "").trim();
        const message = String(body?.message || "").trim();

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { success: false, message: "Name, email, subject and message are required." },
                { status: 400 }
            );
        }

        const contact = await Contact.create({
            name,
            email,
            phone: String(body?.phone || "").trim(),
            company: String(body?.company || "").trim(),
            subject,
            message,
            projectType: String(body?.projectType || "").trim(),
            budget: String(body?.budget || "").trim(),
            timeline: String(body?.timeline || "").trim(),
        });

        return NextResponse.json(
            { success: true, message: "Contact form submitted successfully.", data: contact },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error saving contact form:", error);
        return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
    }
}
