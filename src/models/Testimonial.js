import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        role: { type: String, required: true, trim: true },
        company: { type: String, required: true, trim: true },
        testimonial: { type: String, required: true, trim: true },
        photo: { type: String, required: true, trim: true },
        rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
        projectName: { type: String, trim: true, default: "" },
    },
    { timestamps: true }
);

const cachedTestimonialModel = mongoose.models.Testimonial;

if (cachedTestimonialModel && !cachedTestimonialModel.schema.path("photo")) {
    mongoose.deleteModel("Testimonial");
}

export default mongoose.models.Testimonial || mongoose.model("Testimonial", testimonialSchema);