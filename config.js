import themes from "daisyui/src/theming/themes";

const config = {
  appName: "Creator Source",
  appDescription:
    "A collection of digital minimalist tools to help you reduce distractions and increase productivity.",
  domainName: "minimalmarket.app",
  mailgun: {
    subdomain: "mg",
    fromNoReply: `Minimal Market <noreply@mg.minimalmarket.app>`,
    fromAdmin: `Matt at Minimal Market <matt@mg.minimalmarket.app>`,
    supportEmail: "matt@mg.minimalmarket.app",
    forwardRepliesTo: "matthewtiti@gmail.com",
  },
  colors: {
    theme: "dark",
    main: themes["light"]["primary"],
    toast: "#000",
  },
  googleAnalyticsId: "",
  creators: [
    {
      userId: "placeholder1",
      displayName: "Sarah Johnson",
      username: "sarahjohnson",
      contactEmail: "sarah@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      shortTitle: "Digital Artist & Illustrator",
      about:
        "Creating vibrant digital illustrations and concept art with over 5 years of experience in the industry.",
      priceRange: {
        min: 500,
        max: 2000,
      },
      platforms: ["Instagram", "ArtStation", "Behance"],
      tags: ["Digital Art", "Illustration", "Character Design"],
      links: [
        { name: "Portfolio", url: "https://example.com/sarah" },
        { name: "Instagram", url: "https://instagram.com/sarah" },
      ],
    },
    {
      userId: "placeholder2",
      displayName: "John Doe",
      username: "johndoe",
      contactEmail: "john@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      shortTitle: "3D Animation Specialist",
      about:
        "Bringing characters to life through 3D animation and modeling. Specialized in character rigging and motion design.",
      platforms: ["YouTube", "Vimeo", "ArtStation"],
      tags: ["3D Animation", "Character Rigging", "Motion Design"],
      priceRange: {
        min: 1000,
        max: 3000,
      },
      links: [
        { name: "Portfolio", url: "https://example.com/john" },
        { name: "Showreel", url: "https://vimeo.com/john" },
      ],
    },
    {
      userId: "placeholder3",
      displayName: "Emma Wilson",
      username: "emmawilson",
      contactEmail: "emma@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      shortTitle: "Game Art Specialist",
      about:
        "Specializing in game assets and environmental design. Experienced in concept art and environment design.",
      platforms: ["ArtStation", "Behance", "Dribbble"],
      tags: ["Game Art", "Environment Design", "Concept Art"],
      priceRange: {
        min: 800,
        max: 2500,
      },
      links: [
        { name: "Portfolio", url: "https://example.com/emma" },
        { name: "ArtStation", url: "https://artstation.com/emma" },
      ],
    },
    {
      userId: "placeholder4",
      displayName: "Marcus Chen",
      username: "marcuschen",
      contactEmail: "marcus@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
      shortTitle: "VFX Artist & Compositing Specialist",
      about:
        "Creating mind-bending visual effects for films and commercials. Proficient in compositing and motion graphics.",
      platforms: ["YouTube", "Vimeo", "ArtStation"],
      tags: ["VFX", "Compositing", "Motion Graphics"],
      priceRange: {
        min: 1200,
        max: 3500,
      },
      links: [
        { name: "Portfolio", url: "https://example.com/marcus" },
        { name: "Showreel", url: "https://vimeo.com/marcus" },
      ],
    },
    {
      userId: "placeholder5",
      displayName: "Luna Rodriguez",
      username: "lunarodriguez",
      contactEmail: "luna@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luna",
      shortTitle: "Character Artist & Digital Painter",
      about:
        "Designing unforgettable characters for games and animation. Skilled in 2D animation and digital painting.",
      platforms: ["Instagram", "ArtStation", "Behance"],
      tags: ["Design", "2D Animation", "Digital Painting"],
      priceRange: {
        min: 900,
        max: 2800,
      },
      links: [
        { name: "Portfolio", url: "https://example.com/luna" },
        { name: "Instagram", url: "https://instagram.com/luna" },
      ],
    },
    {
      userId: "placeholder6",
      displayName: "Alex Thompson",
      username: "alexthompson",
      contactEmail: "alex@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      shortTitle: "UI/UX Designer & Prototyper",
      about:
        "Crafting beautiful and intuitive user interfaces. Experienced in UI design and prototyping.",
      platforms: ["Behance", "Dribbble", "LinkedIn"],
      tags: ["UI Design", "UX Design", "Prototyping"],
      priceRange: {
        min: 1500,
        max: 4000,
      },
      links: [
        { name: "Portfolio", url: "https://example.com/alex" },
        { name: "LinkedIn", url: "https://linkedin.com/in/alexthompson" },
      ],
    },
    {
      userId: "placeholder7",
      displayName: "Priya Patel",
      username: "priyapatel",
      contactEmail: "priya@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      shortTitle: "3D Modeler & Sculptor",
      about:
        "Creating detailed 3D models for games and architectural visualization. Proficient in texturing and sculpting.",
      platforms: ["ArtStation", "Behance", "Dribbble"],
      tags: ["3D Modeling", "Texturing", "Sculpting"],
      priceRange: {
        min: 1800,
        max: 4500,
      },
      links: [
        { name: "Portfolio", url: "https://example.com/priya" },
        { name: "ArtStation", url: "https://artstation.com/priya" },
      ],
    },
    {
      userId: "placeholder8",
      displayName: "David Kim",
      username: "davidkim",
      contactEmail: "david@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      shortTitle: "Motion Designer & Animator",
      about:
        "Specializing in eye-catching motion graphics and animations. Experienced in After Effects and animation.",
      platforms: ["YouTube", "Vimeo", "ArtStation"],
      tags: ["Motion Design", "After Effects", "Animation"],
      priceRange: {
        min: 1600,
        max: 4000,
      },
      links: [
        { name: "Portfolio", url: "https://example.com/david" },
        { name: "Showreel", url: "https://vimeo.com/david" },
      ],
    },
    {
      userId: "placeholder9",
      displayName: "Sophie Martin",
      username: "sophiemartin",
      contactEmail: "sophie@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
      shortTitle: "Concept Artist & Visual Developer",
      about:
        "Developing visual concepts for games and film productions. Experienced in environment design and visual development.",
      platforms: ["ArtStation", "Behance", "Dribbble"],
      tags: ["Concept Art", "Environment Design", "Visual Development"],
      priceRange: {
        min: 1400,
        max: 3800,
      },
      links: [
        { name: "Portfolio", url: "https://example.com/sophie" },
        { name: "ArtStation", url: "https://artstation.com/sophie" },
      ],
    },
  ],
  brands: [
    {
      userId: "brand1",
      displayName: "TechVision Pro",
      username: "techvision",
      contactEmail: "contact@techvision.com",
      avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=TechVision",
      industry: "Gaming Technology",
      marketBudget: {
        min: "10000",
        max: "50000",
      },
      tags: ["Gaming", "Hardware", "Technology"],
      links: [
        { name: "Website", url: "https://techvision.example.com" },
        { name: "LinkedIn", url: "https://linkedin.com/company/techvision" },
      ],
      about:
        "Leading manufacturer of premium gaming peripherals and accessories for professional gamers and enthusiasts.",
      shortTitle: "Gaming Hardware & Accessories",
    },
    {
      userId: "brand2",
      displayName: "EcoStyle Living",
      username: "ecostyle",
      contactEmail: "hello@ecostyle.com",
      avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=EcoStyle",
      industry: "Sustainable Consumer Goods",
      marketBudget: {
        min: "5000",
        max: "25000",
      },
      tags: ["Eco-Friendly", "Sustainable", "Lifestyle"],
      links: [
        { name: "Website", url: "https://ecostyle.example.com" },
        { name: "Instagram", url: "https://instagram.com/ecostyle" },
      ],
      about:
        "Creating sustainable lifestyle products that combine style with environmental consciousness.",
      shortTitle: "Sustainable Home & Lifestyle Products",
    },
    {
      userId: "brand3",
      displayName: "CloudFlow Analytics",
      username: "cloudflow",
      contactEmail: "contact@cloudflow.com",
      avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=CloudFlow",
      industry: "Business Intelligence",
      marketBudget: {
        min: "15000",
        max: "75000",
      },
      tags: ["Analytics", "Data Science", "Business Intelligence"],
      links: [
        { name: "Website", url: "https://cloudflow.example.com" },
        { name: "LinkedIn", url: "https://linkedin.com/company/cloudflow" },
      ],
      about:
        "Enterprise-grade analytics platform helping businesses make data-driven decisions with AI-powered insights.",
      shortTitle: "AI-Powered Analytics Platform",
    },
    {
      userId: "brand4",
      displayName: "TaskMaster Pro",
      username: "taskmaster",
      contactEmail: "hello@taskmaster.com",
      avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=TaskMaster",
      industry: "Project Management",
      marketBudget: {
        min: "8000",
        max: "40000",
      },
      tags: ["Project Management", "Productivity", "Team Collaboration"],
      links: [
        { name: "Website", url: "https://taskmaster.example.com" },
        { name: "Twitter", url: "https://twitter.com/taskmaster" },
      ],
      about:
        "Streamlined project management solution for modern teams, featuring automated workflows and real-time collaboration.",
      shortTitle: "Team Project Management Platform",
    },
    {
      userId: "brand5",
      displayName: "SecureVault",
      username: "securevault",
      contactEmail: "security@securevault.com",
      avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=SecureVault",
      industry: "Cybersecurity",
      marketBudget: {
        min: "20000",
        max: "100000",
      },
      tags: ["Security", "Password Management", "Enterprise"],
      links: [
        { name: "Website", url: "https://securevault.example.com" },
        { name: "LinkedIn", url: "https://linkedin.com/company/securevault" },
      ],
      about:
        "Enterprise password management and security solution with advanced encryption and team access controls.",
      shortTitle: "Enterprise Security Solutions",
    },
    {
      userId: "brand6",
      displayName: "HRFlow",
      username: "hrflow",
      contactEmail: "support@hrflow.com",
      avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=HRFlow",
      industry: "HR Software",
      marketBudget: {
        min: "12000",
        max: "60000",
      },
      tags: ["HR", "Employee Management", "Payroll"],
      links: [
        { name: "Website", url: "https://hrflow.example.com" },
        { name: "LinkedIn", url: "https://linkedin.com/company/hrflow" },
      ],
      about:
        "Comprehensive HR management platform streamlining recruitment, onboarding, and employee management processes.",
      shortTitle: "HR Management Software",
    },
    {
      userId: "brand7",
      displayName: "SalesBoost AI",
      username: "salesboost",
      contactEmail: "sales@salesboost.com",
      avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=SalesBoost",
      industry: "Sales Software",
      marketBudget: {
        min: "25000",
        max: "120000",
      },
      tags: ["Sales", "AI", "CRM"],
      links: [
        { name: "Website", url: "https://salesboost.example.com" },
        { name: "Twitter", url: "https://twitter.com/salesboost" },
      ],
      about:
        "AI-powered sales automation platform helping teams close more deals with predictive analytics and smart workflows.",
      shortTitle: "AI Sales Automation Platform",
    },
    {
      userId: "brand8",
      displayName: "ContentFlow",
      username: "contentflow",
      contactEmail: "hello@contentflow.com",
      avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=ContentFlow",
      industry: "Content Management",
      marketBudget: {
        min: "10000",
        max: "45000",
      },
      tags: ["CMS", "Digital Content", "Workflow"],
      links: [
        { name: "Website", url: "https://contentflow.example.com" },
        { name: "Instagram", url: "https://instagram.com/contentflow" },
      ],
      about:
        "Modern content management system designed for digital-first businesses with powerful workflow automation.",
      shortTitle: "Digital Content Management",
    },
    {
      userId: "brand9",
      displayName: "DevOps Pro",
      username: "devopspro",
      contactEmail: "support@devopspro.com",
      avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=DevOpsPro",
      industry: "Developer Tools",
      marketBudget: {
        min: "18000",
        max: "85000",
      },
      tags: ["DevOps", "CI/CD", "Cloud"],
      links: [
        { name: "Website", url: "https://devopspro.example.com" },
        { name: "GitHub", url: "https://github.com/devopspro" },
      ],
      about:
        "Complete DevOps platform for continuous integration, deployment, and infrastructure management.",
      shortTitle: "DevOps Automation Platform",
    },
    {
      userId: "brand10",
      displayName: "LearnSphere",
      username: "learnsphere",
      contactEmail: "edu@learnsphere.com",
      avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=LearnSphere",
      industry: "EdTech",
      marketBudget: {
        min: "15000",
        max: "70000",
      },
      tags: ["Education", "E-Learning", "LMS"],
      links: [
        { name: "Website", url: "https://learnsphere.example.com" },
        { name: "LinkedIn", url: "https://linkedin.com/company/learnsphere" },
      ],
      about:
        "Enterprise learning management system with adaptive learning paths and detailed analytics.",
      shortTitle: "Enterprise Learning Platform",
    },
  ],
  products: [
    {
      brandId: "brand1", // References TechVision Pro
      name: "ProGamer X1 Mouse",
      description:
        "Professional gaming mouse with advanced optical sensor and customizable RGB lighting.",
      category: "Gaming Peripherals",
      marketingBudget: {
        min: "5000",
        max: "15000",
      },
      tags: ["Gaming Mouse", "RGB", "eSports"],
      images: [
        "https://api.dicebear.com/7.x/shapes/svg?seed=mouse1",
        "https://api.dicebear.com/7.x/shapes/svg?seed=mouse2",
      ],
      avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=mouse1",
    },
    {
      brandId: "brand2", // References EcoStyle Living
      name: "Bamboo Essentials Kit",
      description:
        "Complete set of eco-friendly bamboo kitchen utensils and storage solutions.",
      category: "Kitchen & Dining",
      marketingBudget: {
        min: "2000",
        max: "8000",
      },
      tags: ["Eco-Friendly", "Kitchen", "Bamboo"],
      images: [
        "https://api.dicebear.com/7.x/shapes/svg?seed=bamboo1",
        "https://api.dicebear.com/7.x/shapes/svg?seed=bamboo2",
      ],
      avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=bamboo1",
    },
    {
      brandId: "brand3", // CloudFlow Analytics
      name: "CloudFlow Enterprise Analytics",
      description:
        "Enterprise-grade analytics platform with AI-powered insights, custom dashboards, and real-time data processing.",
      category: "Business Intelligence",
      marketingBudget: {
        min: "8000",
        max: "25000",
      },
      tags: ["Analytics", "Enterprise", "AI"],
      images: [
        "https://api.dicebear.com/7.x/shapes/svg?seed=analytics1",
        "https://api.dicebear.com/7.x/shapes/svg?seed=analytics2",
      ],
      avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=analytics1",
    },
    {
      brandId: "brand4", // TaskMaster Pro
      name: "TaskMaster Teams",
      description:
        "Collaborative project management solution with automated workflows, time tracking, and resource management.",
      category: "Project Management",
      marketingBudget: {
        min: "5000",
        max: "18000",
      },
      tags: ["Project Management", "Collaboration", "Productivity"],
      images: [
        "https://api.dicebear.com/7.x/shapes/svg?seed=taskmaster1",
        "https://api.dicebear.com/7.x/shapes/svg?seed=taskmaster2",
      ],
      avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=taskmaster1",
    },
    {
      brandId: "brand5", // SecureVault
      name: "SecureVault Enterprise",
      description:
        "Enterprise password management system with SSO integration, advanced encryption, and compliance features.",
      category: "Security",
      marketingBudget: {
        min: "12000",
        max: "35000",
      },
      tags: ["Security", "Enterprise", "Compliance"],
      images: [
        "https://api.dicebear.com/7.x/shapes/svg?seed=secure1",
        "https://api.dicebear.com/7.x/shapes/svg?seed=secure2",
      ],
      avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=secure1",
    },
    {
      brandId: "brand6", // HRFlow
      name: "HRFlow Complete Suite",
      description:
        "All-in-one HR management platform with recruitment, onboarding, and performance management tools.",
      category: "HR Software",
      marketingBudget: {
        min: "7000",
        max: "22000",
      },
      tags: ["HR", "Management", "Recruitment"],
      images: [
        "https://api.dicebear.com/7.x/shapes/svg?seed=hrflow1",
        "https://api.dicebear.com/7.x/shapes/svg?seed=hrflow2",
      ],
      avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=hrflow1",
    },
    {
      brandId: "brand7", // SalesBoost AI
      name: "SalesBoost Pro",
      description:
        "AI-powered sales automation platform with predictive analytics and pipeline management.",
      category: "Sales Software",
      marketingBudget: {
        min: "15000",
        max: "40000",
      },
      tags: ["Sales", "AI", "Automation"],
      images: [
        "https://api.dicebear.com/7.x/shapes/svg?seed=salesboost1",
        "https://api.dicebear.com/7.x/shapes/svg?seed=salesboost2",
      ],
      avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=salesboost1",
    },
    {
      brandId: "brand8", // ContentFlow
      name: "ContentFlow CMS",
      description:
        "Modern headless CMS with API-first architecture and powerful content modeling capabilities.",
      category: "Content Management",
      marketingBudget: {
        min: "6000",
        max: "20000",
      },
      tags: ["CMS", "Headless", "API"],
      images: [
        "https://api.dicebear.com/7.x/shapes/svg?seed=contentflow1",
        "https://api.dicebear.com/7.x/shapes/svg?seed=contentflow2",
      ],
      avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=contentflow1",
    },
    {
      brandId: "brand9", // DevOps Pro
      name: "DevOps Pipeline Manager",
      description:
        "Complete CI/CD pipeline management with container orchestration and infrastructure as code.",
      category: "Developer Tools",
      marketingBudget: {
        min: "10000",
        max: "30000",
      },
      tags: ["DevOps", "CI/CD", "Infrastructure"],
      images: [
        "https://api.dicebear.com/7.x/shapes/svg?seed=devops1",
        "https://api.dicebear.com/7.x/shapes/svg?seed=devops2",
      ],
      avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=devops1",
    },
    // Add more products as needed
  ],
};

export default config;
