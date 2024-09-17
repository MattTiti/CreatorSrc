import themes from "daisyui/src/theming/themes";

const config = {
  appName: "Minimal Market",
  appDescription:
    "A collection of digital minimalist tools to help you reduce distractions and increase productivity.",
  domainName: "goodmornin.app",
  mailgun: {
    subdomain: "mg",
    fromNoReply: `GoodMornin <noreply@mg.goodmornin.app>`,
    fromAdmin: `Matt at GoodMornin <matt@mg.goodmornin.app>`,
    supportEmail: "matt@mg.goodmornin.app",
    forwardRepliesTo: "matthewtiti@gmail.com",
  },
  colors: {
    theme: "dark",
    main: themes["light"]["primary"],
    toast: "#eab308",
  },
  auth: {
    loginUrl: "/api/auth/signin",
    callbackUrl: "/custom",
  },
  googleAnalyticsId: "",
  screenTimeProjects: [
    {
      id: 1,
      name: "RescueTime",
      tagline: "Take control of your screen habits",
      picture: "/rescuetime_logo.jpeg",
      description:
        "RescueTime tracks app and website usage to give detailed reports on your digital habits. It helps you understand how much time you're spending on different activities and provides tools to block distractions and improve focus.",
      types: ["Mobile", "Web"],
      siteUrl: "https://www.rescuetime.com",
    },
    {
      id: 2,
      name: "Freedom",
      tagline: "Limit digital distractions everywhere",
      picture: "/freedom_app_logo.webp",
      description:
        "Freedom blocks distracting websites and apps across all your devices, helping you stay focused. It’s customizable, allowing you to create blocklists, set schedules, and limit distractions across multiple platforms.",
      types: ["Mobile", "Web", "Extension"],
      siteUrl: "https://freedom.to",
    },
    {
      id: 3,
      name: "Forest",
      tagline: "Grow your focus, one tree at a time",
      picture: "/forest_logo.png",
      description:
        "Forest encourages you to stay off your phone by planting virtual trees. As you stay focused, the tree grows, helping you reduce screen time while contributing to reforestation initiatives.",
      types: ["Mobile"],
      siteUrl: "https://www.forestapp.cc",
    },
    {
      id: 4,
      name: "Stay Focused",
      tagline: "Block apps that drain your time",
      picture: "/stay_focused_logo.png",
      description:
        "Stay Focused helps you block apps and websites that waste your time. You can set daily usage limits for specific apps and prevent access to them once you’ve exceeded your limit.",
      types: ["Mobile"],
      siteUrl: "https://play.google.com/store/apps/details?id=com.stayfocused",
    },
    {
      id: 5,
      name: "Flipd",
      tagline: "Stay motivated with community support",
      picture: "/flipd_logo.png",
      description:
        "Flipd offers productivity tracking, motivational content, and the ability to join productivity challenges with others. It’s a community-driven app that helps you stay focused while sharing your progress with like-minded users.",
      types: ["Mobile"],
      siteUrl: "https://www.flipdapp.co",
    },
  ],
  productivityProjects: [
    {
      id: 6,
      name: "Todoist",
      tagline: "Master task management effortlessly",
      picture: "/todoist_logo.png",
      description:
        "Todoist is a popular task management tool that helps individuals and teams organize their tasks. With features like due dates, labels, and recurring tasks, it keeps you on top of your workload across devices.",
      types: ["Mobile", "Web"],
      siteUrl: "https://todoist.com",
    },
    {
      id: 7,
      name: "Notion",
      tagline: "Your all-in-one workspace",
      picture: "/notion_logo.webp",
      description:
        "Notion is a versatile productivity tool that allows you to create, organize, and manage notes, documents, and projects all in one place. It's perfect for personal use or collaboration with teams, offering customizable templates for every need.",
      types: ["Web"],
      siteUrl: "https://notion.so",
    },
    {
      id: 8,
      name: "Trello",
      tagline: "Visualize your workflow with ease",
      picture: "/trello_logo.png",
      description:
        "Trello uses a Kanban-style board system to help you organize tasks visually. You can create boards for different projects, add cards for tasks, and move them through custom workflows for clear task management.",
      types: ["Web"],
      siteUrl: "https://trello.com",
    },
    {
      id: 9,
      name: "Be Focused",
      tagline: "Boost productivity with timed intervals",
      picture: "/befocused_logo.webp",
      description:
        "Be Focused is a Pomodoro timer app that helps you break your work into focused intervals. It lets you track your progress, manage tasks, and set up personalized work/rest cycles to maximize productivity.",
      types: ["Mobile"],
      siteUrl: "https://xwavesoft.com/be-focused-for-ios.html",
    },
    {
      id: 10,
      name: "Habitica",
      tagline: "Turn productivity into a game",
      picture: "/habitica-logo.png",
      description:
        "Habitica gamifies your daily tasks, turning to-dos into in-game achievements. By completing tasks, you earn rewards and level up your avatar, adding a fun, engaging element to productivity.",
      types: ["Web", "Mobile"],
      siteUrl: "https://habitica.com",
    },
  ],
  replacementProjects: [
    {
      id: 11,
      name: "GoodMornin",
      tagline: "Start your day informed, not distracted",
      picture: "/gm-icon.png",
      description:
        "GoodMornin sends you a daily text with the most important news, weather, sports, and more. By getting a concise summary, you can start your day without the distraction of endless scrolling through social media feeds.",
      types: ["Web"],
      siteUrl: "https://goodmornin.app",
    },
    {
      id: 12,
      name: "Pocket",
      tagline: "Curate and save content for later",
      picture: "/pocket-logo.webp",
      description:
        "Pocket allows you to save articles, videos, and web content to view later. It lets you stay productive by eliminating distractions and giving you the flexibility to consume content when you have the time.",
      types: ["Mobile", "Web"],
      siteUrl: "https://getpocket.com",
    },
    {
      id: 13,
      name: "Cold Turkey",
      tagline: "Take drastic action against distractions",
      picture: "/cold_logo.png",
      description:
        "Cold Turkey is a powerful tool for blocking distractions. It allows you to block specific apps, websites, or your entire device during work hours, ensuring you stay focused and productive.",
      types: ["Desktop"],
      siteUrl: "https://getcoldturkey.com",
    },
    {
      id: 14,
      name: "LeechBlock",
      tagline: "Set limits on distracting websites",
      picture: "/leech_logo.jpg",
      description:
        "LeechBlock is a browser extension that allows you to block time-wasting websites for specific periods. It's fully customizable, letting you control how long and when you can access distracting sites.",
      types: ["Extension"],
      siteUrl:
        "https://chromewebstore.google.com/detail/leechblock-ng/blaaajhemilngeeffpbfkdjjoefldkok?hl=en",
    },
    {
      id: 15,
      name: "BlockSite",
      tagline: "Keep distractions out of sight",
      picture: "/block_logo.jpeg",
      description:
        "BlockSite helps you prevent access to websites and apps that take your focus away from important tasks. With features like scheduling and custom blocklists, it's an ideal solution for increasing productivity.",
      types: ["Extension"],
      siteUrl: "https://blocksite.co",
    },
    {
      id: 16,
      name: "InboxWhenReady",
      tagline: "Control when you check your email",
      picture: "/inbox_logo.png",
      description:
        "InboxWhenReady hides your Gmail inbox until you're ready to check it. This extension helps reduce the urge to constantly check email and keeps you focused on work instead.",
      types: ["Extension"],
      siteUrl: "https://inboxwhenready.org",
    },
    {
      id: 17,
      name: "Streaks",
      tagline: "Build lasting, positive habits",
      picture: "/streaks_logo.jpg",
      description:
        "Streaks helps you develop and maintain healthy habits through daily tracking and reminders. With a clean and intuitive interface, it helps you stay motivated by building streaks as you complete daily tasks.",
      types: ["Mobile"],
      siteUrl: "https://streaksapp.com",
    },
  ],
};

export default config;
