"use client";

import { useEffect, useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { useParams } from "react-router-dom";

const ProjectsPage = () => {
  const { id } = useParams();
  const { projects, fetchProjectswithid, loading } = useContext(AdminContext);

  useEffect(() => {
    if (id) {
      fetchProjectswithid(id);
    }
  }, [id, fetchProjectswithid]);

  // Handle loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading project details...</p>
      </div>
    );
  }

  // Handle no project found
  if (!projects || (Array.isArray(projects) && projects.length === 0)) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">No project found.</p>
      </div>
    );
  }

  // Ensure we're working with a single project object
  const project = Array.isArray(projects) ? projects[0] : projects;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="bg-white shadow-md rounded-lg p-6 mb-12 border">
        {/* Header Image */}
        {project.image && (
          <div className="flex justify-center mb-6">
            <img
              src={project.image}
              alt={project.name}
              className="w-full max-w-4xl rounded-lg"
            />
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-10">
          {/* Left Side */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800">{project.name}</h2>
            <p className="text-gray-500 mb-4">{project.tagline}</p>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Overview</h3>
              <p className="text-gray-600 mt-2">{project.description}</p>
            </div>

            {/* Technologies */}
            {project.technologies?.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Technologies
                </h3>
                <ul className="list-disc list-inside mt-2 text-gray-600">
                  {project.technologies.map((tech, idx) => (
                    <li key={idx}>{tech}</li>
                  ))}
                </ul>
              </div>
            )}
            <h1 className="text-2xl font-bold mb-4">Project Gallery</h1>
            {/* Screenshots */}
            {project.screenshots?.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Gallery</h3>
                <div className="flex gap-4 flex-wrap mt-2">
                  {project.screenshots.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Screenshot ${idx + 1}`}
                      className="w-32 h-auto rounded shadow"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4 mt-4 flex-wrap">
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>

          {/* Right Side - Project Details */}
          <div className="w-full md:w-64 bg-gray-100 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-700 mb-2">
              Project Details
            </h4>
            <p className="text-gray-600">
              <span className="font-medium">Status:</span> {project.status}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Duration:</span> {project.duration}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Role:</span> {project.role}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Category:</span> {project.category}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
