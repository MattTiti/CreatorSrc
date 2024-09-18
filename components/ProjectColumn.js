"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Smartphone,
  Globe,
  PenTool,
  Layers,
  Chrome,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { Label } from "@/components/ui/label";

const ProjectItem = ({ project, onClick }) => (
  <div
    className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded"
    onClick={onClick}
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

const ProjectColumn = ({
  title,
  projects,
  category,
  showAllLink = true,
  slice = true,
}) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const displayedProjects = slice ? projects.slice(0, 5) : projects;

  const getIcon = (title) => {
    switch (title) {
      case "Screen Time":
        return <Clock className="w-6 h-6 mr-2" />;
      case "Alternatives":
        return <Layers className="w-6 h-6 mr-2" />;
      case "Productivity":
        return <PenTool className="w-6 h-6 mr-2" />;
      case "Web":
        return <Globe className="w-6 h-6 mr-2" />;
      case "Mobile":
        return <Smartphone className="w-6 h-6 mr-2" />;
      case "Extensions":
        return <Chrome className="w-6 h-6 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6">
      <div className="flex justify-between items-center mb-4 pb-2 border-b-4 border-neutral-700">
        <h2 className="text-2xl font-semibold flex items-center">
          {getIcon(title)}
          {title}
        </h2>
        {showAllLink && (
          <Link href={`/${category}`}>
            <Button variant="ghost" size="sm">
              See All
            </Button>
          </Link>
        )}
      </div>
      {displayedProjects.length > 0 ? (
        displayedProjects.map((project) => (
          <ProjectItem
            key={project.id}
            project={project}
            onClick={() => setSelectedProject(project)}
          />
        ))
      ) : (
        <p className="text-gray-500">No projects available.</p>
      )}
      <Dialog
        open={!!selectedProject}
        onOpenChange={() => setSelectedProject(null)}
      >
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader className="flex flex-row items-start gap-4">
            <Image
              src={selectedProject?.picture || ""}
              alt={selectedProject?.name || ""}
              width={50}
              height={50}
              className="rounded-lg object-cover"
            />
            <div className="flex-grow">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <DialogTitle>{selectedProject?.name}</DialogTitle>
                  {selectedProject?.types.map((type, index) => (
                    <Badge key={index} variant="secondary">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
              <DialogDescription>{selectedProject?.tagline}</DialogDescription>
            </div>
          </DialogHeader>

          <div>
            <ul className="list-disc pl-5 space-y-2">
              {selectedProject?.description.map((point, index) => (
                <li key={index} className="text-gray-600">
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/${category}?projectId=${selectedProject?.id}`}>
                See More
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a
                href={selectedProject?.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Site
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectColumn;
