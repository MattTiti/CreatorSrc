import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Smartphone,
  Globe,
  PenTool,
  Layers,
  Chrome,
} from "lucide-react";

const ProjectItem = ({ project, onClick, isSelected }) => (
  <div
    className={`flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 text-neutral-700 rounded ${
      isSelected ? "bg-gray-100" : ""
    }`}
    onClick={() => onClick(project)}
  >
    <Image
      src={project.picture}
      alt={project.name}
      width={50}
      height={50}
      className="rounded-lg mr-4"
    />
    <div>
      <div className="flex items-center gap-2">
        <h3 className="text-md font-semibold">{project.name}</h3>
        {project.types.map((type, index) => (
          <Badge key={index} variant="secondary">
            {type}
          </Badge>
        ))}
      </div>
      <p className="text-sm text-gray-600">{project.tagline}</p>
    </div>
  </div>
);

const CategoryProjectList = ({
  title,
  projects,
  onProjectClick,
  selectedProject,
}) => {
  const getIcon = (title) => {
    switch (title) {
      case "Screen Time":
        return <Clock className="w-6 h-6 mr-2" />;
      case "Mobile":
        return <Smartphone className="w-6 h-6 mr-2" />;
      case "Productivity":
        return <PenTool className="w-6 h-6 mr-2" />;
      case "Web":
        return <Globe className="w-6 h-6 mr-2" />;
      case "Alternatives":
        return <Layers className="w-6 h-6 mr-2" />;
      case "Extensions":
        return <Chrome className="w-6 h-6 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 shadow text-neutral-700 h-full flex flex-col border-r border-neutral-200">
      <h2 className="text-2xl font-semibold mb-4 pb-2 border-b-4 border-neutral-700 flex items-center">
        {getIcon(title)}
        {title}
      </h2>
      <div className="overflow-y-auto flex-grow">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectItem
              key={project.id}
              project={project}
              onClick={onProjectClick}
              isSelected={selectedProject && selectedProject.id === project.id}
            />
          ))
        ) : (
          <p className="text-gray-500">No projects available.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryProjectList;
