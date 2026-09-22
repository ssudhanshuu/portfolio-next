import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    tagline: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    technologies: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "Developer",
    },
    duration: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "completed", "inactive"],
      default: "active",
    },
    liveDemo: {
      type: String,
      trim: true,
    },
    github: {
      type: String,
      trim: true,
    },
    image: {
      type: String, // main image
    },
    screenshots: {
      type: [String], // array of image URLs
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
