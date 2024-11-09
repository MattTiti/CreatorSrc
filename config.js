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
    toast: "#eab308",
  },
  googleAnalyticsId: "",
  creators: [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      specialty: "Digital Art",
      description: "Creating vibrant digital illustrations and concept art",
      tags: ["Digital Art", "Illustration", "Character Design"],
      priceRange: {
        min: 500,
        max: 2000,
      },
    },
    {
      id: 2,
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      specialty: "3D Animation",
      description:
        "Bringing characters to life through 3D animation and modeling",
      tags: ["3D Animation", "Character Rigging", "Motion Design"],
      priceRange: {
        min: 1000,
        max: 3000,
      },
    },
    {
      id: 3,
      name: "Emma Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      specialty: "Game Art",
      description: "Specializing in game assets and environmental design",
      tags: ["Game Art", "Environment Design", "Concept Art"],
      priceRange: {
        min: 800,
        max: 2500,
      },
    },
    {
      id: 4,
      name: "Marcus Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
      specialty: "VFX Artist",
      description:
        "Creating mind-bending visual effects for films and commercials",
      tags: ["VFX", "Compositing", "Motion Graphics"],
      priceRange: {
        min: 1200,
        max: 3500,
      },
    },
    {
      id: 5,
      name: "Luna Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luna",
      specialty: "Character Artist",
      description: "Designing unforgettable characters for games and animation",
      tags: ["Character Design", "2D Animation", "Digital Painting"],
      priceRange: {
        min: 900,
        max: 2800,
      },
    },
    {
      id: 6,
      name: "Alex Thompson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      specialty: "UI/UX Designer",
      description: "Crafting beautiful and intuitive user interfaces",
      tags: ["UI Design", "UX Design", "Prototyping"],
      priceRange: {
        min: 1500,
        max: 4000,
      },
    },
    {
      id: 7,
      name: "Priya Patel",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      specialty: "3D Modeling",
      description:
        "Creating detailed 3D models for games and architectural visualization",
      tags: ["3D Modeling", "Texturing", "Sculpting"],
      priceRange: {
        min: 1800,
        max: 4500,
      },
    },
    {
      id: 8,
      name: "David Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      specialty: "Motion Designer",
      description:
        "Specializing in eye-catching motion graphics and animations",
      tags: ["Motion Design", "After Effects", "Animation"],
      priceRange: {
        min: 1600,
        max: 4000,
      },
    },
    {
      id: 9,
      name: "Sophie Martin",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
      specialty: "Concept Artist",
      description: "Developing visual concepts for games and film productions",
      tags: ["Concept Art", "Environment Design", "Visual Development"],
      priceRange: {
        min: 1400,
        max: 3800,
      },
    },
  ],
};

export default config;
