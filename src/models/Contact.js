import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        phone: { type: String, default: "" },
        company: { type: String, default: "" },
        subject: { type: String, required: true, trim: true },
        message: { type: String, required: true, trim: true },
        projectType: { type: String, default: "" },
        budget: { type: String, default: "" },
        timeline: { type: String, default: "" },
    },
    { timestamps: true }
);

export default mongoose.models.Contact || mongoose.model("Contact", contactSchema);
