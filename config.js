import themes from "daisyui/src/theming/themes";

const config = {
  appName: "Creator Source",
  appDescription:
    "The platform for connecting brands and products with creators.",
  domainName: "creatorsource.io",
  mailgun: {
    subdomain: "mg",
    fromNoReply: `Creator Source <noreply@mg.creatorsource.io>`,
    fromAdmin: `Matt at Creator Source <matt@mg.creatorsource.io>`,
    supportEmail: "matt@mg.creatorsource.io",
    forwardRepliesTo: "matthewtiti@gmail.com",
  },
  colors: {
    theme: "dark",
    main: themes["light"]["primary"],
    toast: "#000",
  },
  googleAnalyticsId: "G-VCG3T6HRQT",
  creators: [
    {
      userId: "placeholder1",
      displayName: "Sarah Johnson",
      username: "sarahcreates",
      contactEmail: "sarah@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      shortTitle: "Lifestyle & Fashion Content Creator",
      about:
        "Creating authentic lifestyle content and fashion inspiration for the modern woman. Specializing in Instagram Reels and TikTok trends.",
      priceRange: {
        min: 800,
        max: 3000,
      },
      platforms: ["Instagram", "TikTok", "YouTube"],
      tags: ["Fashion", "Lifestyle", "Beauty", "Travel"],
      links: [
        { name: "Instagram", url: "https://instagram.com/sarahcreates" },
        { name: "TikTok", url: "https://tiktok.com/@sarahcreates" },
      ],
    },
    {
      userId: "placeholder2",
      displayName: "John Doe",
      username: "techjohn",
      contactEmail: "john@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      shortTitle: "Tech Reviewer & Gaming Creator",
      about:
        "Honest tech reviews and gaming content. From unboxing the latest gadgets to in-depth gaming tutorials and streaming.",
      platforms: ["YouTube", "Twitch", "Twitter"],
      tags: ["Tech Reviews", "Gaming", "Tutorials", "Streaming"],
      priceRange: {
        min: 1000,
        max: 5000,
      },
      links: [
        { name: "YouTube", url: "https://youtube.com/@techjohn" },
        { name: "Twitch", url: "https://twitch.tv/techjohn" },
      ],
    },
    {
      userId: "placeholder3",
      displayName: "Emma Wilson",
      username: "emmacooks",
      contactEmail: "emma@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      shortTitle: "Food & Recipe Content Creator",
      about:
        "Sharing easy-to-follow recipes and cooking tips. Specializing in quick, healthy meals and food photography.",
      platforms: ["Instagram", "TikTok", "Pinterest"],
      tags: ["Cooking", "Recipes", "Food Photography", "Healthy Eating"],
      priceRange: {
        min: 500,
        max: 2500,
      },
      links: [
        { name: "Instagram", url: "https://instagram.com/emmacooks" },
        { name: "TikTok", url: "https://tiktok.com/@emmacooks" },
      ],
    },
    {
      userId: "placeholder4",
      displayName: "Marcus Chen",
      username: "fitnesswithmarcus",
      contactEmail: "marcus@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
      shortTitle: "Fitness & Wellness Creator",
      about:
        "Helping you achieve your fitness goals through workout tutorials and nutrition advice. Certified personal trainer.",
      platforms: ["YouTube", "Instagram", "TikTok"],
      tags: ["Fitness", "Workouts", "Nutrition", "Wellness"],
      priceRange: {
        min: 700,
        max: 4000,
      },
      links: [
        { name: "YouTube", url: "https://youtube.com/@fitnesswithmarcus" },
        { name: "Instagram", url: "https://instagram.com/fitnesswithmarcus" },
      ],
    },
    {
      userId: "placeholder5",
      displayName: "Luna Rodriguez",
      username: "lunabeauty",
      contactEmail: "luna@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luna",
      shortTitle: "Beauty & Makeup Creator",
      about:
        "Creating makeup tutorials and skincare reviews. Passionate about clean beauty and inclusive makeup techniques.",
      platforms: ["YouTube", "Instagram", "TikTok"],
      tags: ["Beauty", "Makeup", "Skincare", "Tutorials"],
      priceRange: {
        min: 600,
        max: 3000,
      },
      links: [
        { name: "YouTube", url: "https://youtube.com/@lunabeauty" },
        { name: "Instagram", url: "https://instagram.com/lunabeauty" },
      ],
    },
    {
      userId: "placeholder6",
      displayName: "Alex Thompson",
      username: "plantswithlex",
      contactEmail: "alex@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      shortTitle: "Plant Care & Home Garden Creator",
      about:
        "Making plant care easy and accessible. Sharing tips for urban gardening, propagation, and creating your indoor jungle.",
      platforms: ["Instagram", "TikTok", "Pinterest"],
      tags: ["Plants", "Gardening", "Home Decor", "Sustainability"],
      priceRange: {
        min: 200,
        max: 1500,
      },
      links: [
        { name: "Instagram", url: "https://instagram.com/plantswithlex" },
        { name: "TikTok", url: "https://tiktok.com/@plantswithlex" },
      ],
    },
    {
      userId: "placeholder7",
      displayName: "Mia Patel",
      username: "studywithmia",
      contactEmail: "mia@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia",
      shortTitle: "Study Tips & Productivity Creator",
      about:
        "Helping students ace their exams with effective study techniques, time management, and productivity hacks.",
      platforms: ["YouTube", "Instagram", "TikTok"],
      tags: ["StudyTips", "Productivity", "StudentLife", "Education"],
      priceRange: {
        min: 150,
        max: 1000,
      },
      links: [
        { name: "YouTube", url: "https://youtube.com/@studywithmia" },
        { name: "Instagram", url: "https://instagram.com/studywithmia" },
      ],
    },
    {
      userId: "placeholder8",
      displayName: "David Kim",
      username: "budgetwithdk",
      contactEmail: "david@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      shortTitle: "Personal Finance & Budget Tips Creator",
      about:
        "Breaking down complex financial topics into simple, actionable advice for young adults. Focusing on budgeting, saving, and investing basics.",
      platforms: ["TikTok", "Instagram", "YouTube"],
      tags: ["Finance", "Budgeting", "Investing", "MoneyTips"],
      priceRange: {
        min: 300,
        max: 2000,
      },
      links: [
        { name: "TikTok", url: "https://tiktok.com/@budgetwithdk" },
        { name: "YouTube", url: "https://youtube.com/@budgetwithdk" },
      ],
    },
    {
      userId: "placeholder9",
      displayName: "Sophie Martinez",
      username: "craftswithsophie",
      contactEmail: "sophie@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
      shortTitle: "DIY & Craft Creator",
      about:
        "Creating easy DIY projects and craft tutorials. Specializing in budget-friendly home decor and upcycling projects.",
      platforms: ["Pinterest", "Instagram", "YouTube"],
      tags: ["DIY", "Crafts", "HomeDecor", "Upcycling"],
      priceRange: {
        min: 100,
        max: 1200,
      },
      links: [
        { name: "Instagram", url: "https://instagram.com/craftswithsophie" },
        { name: "Pinterest", url: "https://pinterest.com/craftswithsophie" },
      ],
    },
    {
      userId: "placeholder10",
      displayName: "Ryan Lee",
      username: "gamingwithryan",
      contactEmail: "ryan@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan",
      shortTitle: "Gaming & Streaming Creator",
      about:
        "Daily gaming streams and tutorials. Focusing on strategy games and building an inclusive gaming community.",
      platforms: ["Twitch", "YouTube", "TikTok"],
      tags: ["Gaming", "Streaming", "Tutorials", "ESports"],
      priceRange: {
        min: 250,
        max: 1800,
      },
      links: [
        { name: "Twitch", url: "https://twitch.tv/gamingwithryan" },
        { name: "YouTube", url: "https://youtube.com/@gamingwithryan" },
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
