import { useContext, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import { AdminContext } from "../../context/AdminContext";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

const Card = ({ children }) => (
  <div className="border rounded-xl shadow-md bg-white">{children}</div>
);

const Button = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md"
  >
    {children}
  </button>
);

const ImageWithFallback = ({ src, alt, className }) => (
  <img
    src={
      src
        ? `${BASE_URL}${src}`
        : "https://dummyimage.com/300x200/cccccc/000000.jpg&text=No+Image"
    }
    alt={alt}
    className={className}
  />
);


export default function AdminProjectCreate() {
  let navigate = useNavigate()
  const { projects, fetchProjects } = useContext(AdminContext);
  const Addhandler = () => {

    navigate("/admin/create");
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="flex md:flex-row flex-col">
      <AdminSidebar />

      <div className="flex-1 p-4 ml-12">
        <div className="text-xl flex font-semibold border-b-3 pl-2 mb-4 justify-between">
          All Projects{" "}
          <button
            className="mr-30 cursor-pointer flex"
            onClick={Addhandler}
          >
            Add Project
            <Plus />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects.map((project) => (
              <Card key={project._id}>
                {/* Title & Description */}
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {project.tagline}
                  </p>
                </div>

                {/* Image & Footer */}
                <div className="p-4">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />

                  <div className="flex items-center justify-between mt-4">
                    <span className="inline-flex items-center rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-medium text-white">
                      {project.status}
                    </span>
                    <Button onClick={() => navigate(`/admin/projectShowcase/${project._id}`)}>
                      View
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <p>No projects found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
