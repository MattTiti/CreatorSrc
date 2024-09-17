"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import CategoryProjectList from "@/components/CategoryProjectList";
import config from "@/config";
import Header from "@/components/landing/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";

const ProjectDetails = ({ project }) => {
  if (!project)
    return (
      <div className="p-6 mt-48">
        <Spinner />
      </div>
    );

  return (
    <div className="p-6 text-neutral-700">
      <div className="flex items-start gap-4 mb-4">
        <Image
          src={project.picture}
          alt={project.name}
          width={100}
          height={100}
          className="rounded-lg object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">{project.name}</h2>
          <p className="text-gray-600">{project.tagline}</p>
          <div className="mt-2 flex gap-2">
            {project.types.map((type, index) => (
              <Badge key={index} variant="secondary">
                {type}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{project.description}</p>
      <Button asChild variant="outline">
        <a href={project.siteUrl} target="_blank" rel="noopener noreferrer">
          Visit Site
        </a>
      </Button>
    </div>
  );
};

export default function CategoryPage({ params }) {
  const { category } = params;
  const [selectedProject, setSelectedProject] = useState(null);
  let projects = [];
  let title = "";

  switch (category) {
    case "screen-time":
      projects = config.screenTimeProjects;
      title = "Screen Time";
      break;
    case "replacements":
      projects = config.replacementProjects;
      title = "Alternatives";
      break;
    case "productivity":
      projects = config.productivityProjects;
      title = "Productivity";
      break;
    case "web":
      projects = config.screenTimeProjects
        .concat(config.replacementProjects, config.productivityProjects)
        .filter((project) => project.types.includes("Web"));
      title = "Web";
      break;
    case "mobile":
      projects = config.screenTimeProjects
        .concat(config.replacementProjects, config.productivityProjects)
        .filter((project) => project.types.includes("Mobile"));
      title = "Mobile";
      break;
    case "extensions":
      projects = config.screenTimeProjects
        .concat(config.replacementProjects, config.productivityProjects)
        .filter((project) => project.types.includes("Extension"));
      title = "Extensions";
      break;
    default:
      // Handle invalid category
      return <div>Invalid category</div>;
  }

  useEffect(() => {
    if (projects.length > 0 && !selectedProject) {
      setSelectedProject(projects[0]);
    }
  }, [projects, selectedProject]);

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <CategoryProjectList
              title={title}
              projects={projects}
              onProjectClick={setSelectedProject}
              selectedProject={selectedProject}
            />
          </div>
          <div className="w-full md:w-2/3 bg-white rounded-lg shadow">
            <ProjectDetails project={selectedProject} />
          </div>
        </div>
      </div>
    </>
  );
}
