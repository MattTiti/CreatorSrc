"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import config from "@/config";
import logo from "@/app/icon.png";
import ProjectColumn from "@/components/ProjectColumn";
import TypeColumn from "@/components/TypeColumn";

export default function Home() {
  // Combine all projects into a single array
  const allProjects = [
    ...config.screenTimeProjects,
    ...config.replacementProjects,
    ...config.productivityProjects,
  ];

  // Filter projects by type
  const webProjects = allProjects.filter((project) =>
    project.types.includes("Web")
  );
  const mobileProjects = allProjects.filter((project) =>
    project.types.includes("Mobile")
  );
  const extensionProjects = allProjects.filter((project) =>
    project.types.includes("Extension")
  );

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen text-neutral-700">
        <h1 className="text-4xl font-bold text-center py-8">
          Apps for Digital Minimalists
        </h1>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <ProjectColumn
              title="Screen Time"
              projects={config.screenTimeProjects}
              category="screen-time"
              description="Apps that help you reduce your screen time and/or block distracting websites."
            />
            <ProjectColumn
              title="Alternatives"
              projects={config.replacementProjects}
              category="replacements"
              description={`Apps that help you reclaim your attention and "slower" alternatives to popular time-wasting apps.`}
            />
            <ProjectColumn
              title="Productivity"
              projects={config.productivityProjects}
              category="productivity"
              description="Apps that help you make the most of limited screen time."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TypeColumn title="Web" projects={webProjects} />
            <TypeColumn title="Mobile" projects={mobileProjects} />
            <TypeColumn title="Extensions" projects={extensionProjects} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
