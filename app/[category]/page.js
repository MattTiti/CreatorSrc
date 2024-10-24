"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import CategoryProjectList from "@/components/CategoryProjectList";
import config from "@/config";
import Header from "@/components/landing/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogHeader,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const ImageDialog = ({ isOpen, onClose, imageSrc }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogHeader>
        <DialogTitle></DialogTitle>
      </DialogHeader>
      <DialogContent className="w-[90vw] md:w-[800px]">
        <div className="aspect-video">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt="Project image"
              layout="fill"
              objectFit="contain"
            />
          ) : (
            <Spinner />
          )}
        </div>
        <DialogClose className="absolute top-2 right-2" />
      </DialogContent>
    </Dialog>
  );
};

const ImageCarousel = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="w-full mx-0 mb-6 overflow-x-auto">
      <div className="w-full flex space-x-4 pb-4">
        {images.map((image, index) => (
          <div key={index} className="flex-shrink-0 sm:w-48 w-64">
            <Card className="w-full">
              <CardContent className="p-0">
                <Image
                  src={image}
                  alt={`Project image ${index + 1}`}
                  width={256}
                  height={192}
                  className="rounded-md object-cover w-full h-full cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                />
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      <ImageDialog
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageSrc={selectedImage}
      />
    </div>
  );
};

const ProjectDetails = ({ project }) => {
  if (!project)
    return (
      <div className="p-6 mt-48">
        <Spinner />
      </div>
    );

  return (
    <div className="p-4 md:p-6 text-neutral-700">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
        <div className="flex flex-col md:flex-row items-start gap-4 mb-4">
          <Image
            src={project.picture}
            alt={project.name}
            width={80} // Adjust width for mobile
            height={80} // Adjust height for mobile
            className="rounded-lg object-cover"
          />
          <div>
            <h2 className="text-lg md:text-xl font-semibold">{project.name}</h2>
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
        <Button
          asChild
          variant="outline"
          className="w-full md:w-1/4 mt-4 md:mt-0"
        >
          <a href={project.siteUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" /> Visit Site
          </a>
        </Button>
      </div>

      {project.images && project.images.length > 0 && (
        <div className="space-y-2">
          <Label className="text-lg font-semibold">Images</Label>
          <ImageCarousel images={project.images} />
        </div>
      )}

      <div className="space-y-2 mt-4 mb-12">
        <Label className="text-lg font-semibold">Description</Label>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          {project.description.map((point, index) => (
            <li key={index} className="text-gray-700">
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const AppFooter = ({ projects }) => {
  return (
    <div className="w-full h-[20vh] bg-stone-50 border-t border-gray-200 flex flex-col hidden sm:block">
      <div className="pt-2">
        <Label className="text-lg font-semibold mx-4">More Apps</Label>
      </div>
      <div className="flex-1 overflow-x-auto">
        <div className="flex p-4 space-x-4">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/${project.category}?projectId=${project.id}`}
              className="flex-shrink-0 h-20 w-92"
            >
              <div className="bg-white p-4 rounded-lg shadow h-full flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <Image
                    src={project.picture}
                    alt={project.name}
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold line-clamp-1">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {project.tagline}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function CategoryPage({ params }) {
  const { category } = params;
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const [selectedProject, setSelectedProject] = useState(null);

  const { projects, title, footerProjects } = useMemo(() => {
    let projects = [];
    let title = "";
    let footerProjects = [];

    switch (category) {
      case "screen-time":
        projects = config.screenTimeProjects;
        title = "Screen Time";
        footerProjects = [
          ...config.replacementProjects.map((p) => ({
            ...p,
            category: "replacements",
          })),
          ...config.productivityProjects.map((p) => ({
            ...p,
            category: "productivity",
          })),
        ].slice(0, 10);
        break;
      case "replacements":
        projects = config.replacementProjects;
        title = "Alternatives";
        footerProjects = [
          ...config.screenTimeProjects.map((p) => ({
            ...p,
            category: "screen-time",
          })),
          ...config.productivityProjects.map((p) => ({
            ...p,
            category: "productivity",
          })),
        ].slice(0, 10);
        break;
      case "productivity":
        projects = config.productivityProjects;
        title = "Productivity";
        footerProjects = [
          ...config.screenTimeProjects.map((p) => ({
            ...p,
            category: "screen-time",
          })),
          ...config.replacementProjects.map((p) => ({
            ...p,
            category: "replacements",
          })),
        ].slice(0, 10);
        break;
      default:
        title = "Invalid category";
    }

    return { projects, title, footerProjects };
  }, [category]);

  useEffect(() => {
    if (projectId) {
      const project = projects.find((p) => p.id.toString() === projectId);
      if (project) {
        setSelectedProject(project);
      }
    } else if (projects.length > 0 && !selectedProject) {
      setSelectedProject(projects[0]);
    }
  }, [projects, projectId]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  if (title === "Invalid category") {
    return <div>Invalid category</div>;
  }

  return (
    <div className="flex flex-col h-screen text-neutral-700">
      <Header />
      <div className="flex-grow h-auto sm:h-[60vh] flex flex-col-reverse sm:flex-row">
        <div className="w-full md:w-1/3 overflow-y-auto">
          <CategoryProjectList
            title={title}
            projects={projects}
            onProjectClick={handleProjectClick}
            selectedProject={selectedProject}
          />
        </div>
        <div className="w-full md:w-2/3 bg-white overflow-y-auto">
          <ProjectDetails project={selectedProject} category={category} />
        </div>
      </div>
      <AppFooter projects={footerProjects} />
    </div>
  );
}
