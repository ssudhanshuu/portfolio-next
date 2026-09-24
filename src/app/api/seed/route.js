import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Project from "@/models/Project";
import Skill from "@/models/Skill";
import Blog from "@/models/Blog";

export async function GET() {
  try {
    await dbConnect();

    // 1. Projects Data
    const projects = [
      {
        name: "Movie Booking App",
        tagline: "Book movies online",
        description: "Full stack movie booking application with Clerk auth, seat selection, and real-time availability.",
        status: "active",
        category: "Web",
        technologies: ["React", "Node.js", "MongoDB", "Clerk"],
        image: "https://dummyimage.com/600x400/151521/4f46e5.jpg&text=Movie+App"
      },
      {
        name: "E-commerce Platform",
        tagline: "Online shopping store",
        description: "Modern e-commerce app with cart, checkout flow, Stripe payments, and admin dashboard.",
        status: "completed",
        category: "Web",
        technologies: ["React", "Express", "MongoDB", "Stripe"],
        image: "https://dummyimage.com/600x400/151521/4f46e5.jpg&text=E-commerce"
      },
      {
        name: "Mobile Banking",
        tagline: "Secure money transfer",
        description: "Banking app with secure authentication, fund transfers, and transaction history.",
        status: "active",
        category: "Mobile",
        technologies: ["React Native", "Node.js", "PostgreSQL"],
        image: "https://dummyimage.com/600x400/151521/4f46e5.jpg&text=Banking+App"
      },
    ];

    // 2. Skills Data
    const skillCategories = [
      {
        category: "Frontend",
        skills: [
          { name: "React.js", proficiency: 85, year: 2 },
          { name: "JavaScript", proficiency: 80, year: 3 },
          { name: "TypeScript", proficiency: 75, year: 2 },
          { name: "Tailwind", proficiency: 75, year: 2 },
          { name: "HTML/CSS", proficiency: 92, year: 4 },
        ],
      },
      {
        category: "Backend",
        skills: [
          { name: "Node.js", proficiency: 80, year: 3 },
          { name: "Express.js", proficiency: 78, year: 3 },
          { name: "Socket.io", proficiency: 78, year: 2 },
          { name: "REST APIs", proficiency: 90, year: 3 },
        ],
      },
      {
        category: "Database",
        skills: [
          { name: "MongoDB", proficiency: 85, year: 3 },
        ],
      },
    ];

    // 3. Blogs Data
    const dummyBlogs = [
      {
        name: "Mastering React in 2025",
        tagline: "React best practices",
        description: "Learn the latest React features and best practices to make your frontend development superfast and scalable.",
        category: "React",
        status: "active",
        image: "https://dummyimage.com/600x400/151521/4f46e5.jpg&text=React+2025"
      },
      {
        name: "TailwindCSS Tips & Tricks",
        tagline: "CSS tricks for you",
        description: "Discover how to build clean and attractive UIs with TailwindCSS using some easy and practical tricks.",
        category: "CSS",
        status: "completed",
        image: "https://dummyimage.com/600x400/151521/4f46e5.jpg&text=Tailwind"
      },
      {
        name: "Why Node.js Still Rules",
        tagline: "Backend king",
        description: "Explore why Node.js remains the king of backend development. Dive into its performance and ecosystem.",
        category: "Node.js",
        status: "active",
        image: "https://dummyimage.com/600x400/151521/4f46e5.jpg&text=Node.js"
      },
    ];

    // Insert Data
    await Project.insertMany(projects);
    
    // Skills insertion needs to handle existing categories or create new ones
    for (const cat of skillCategories) {
      await Skill.findOneAndUpdate(
        { category: cat.category },
        { $push: { skills: { $each: cat.skills } } },
        { upsert: true }
      );
    }
    
    await Blog.insertMany(dummyBlogs);

    return NextResponse.json({ message: "Data seeded successfully!" });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
