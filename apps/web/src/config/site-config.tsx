import { APP_URL } from "./constants";

export const siteConfig = {
  global: {
    url: "https://vapotertn.co",
    name: "vapotertn",
    logo: "/images/logo.png",
    title: "vapotertn - instant preview for your theme",
    description:
      "Get an instant preview for your theme with vapotertn. Export your theme in one click.",
    keywords: [
      "Theme",
      "Theme customizer",
      "Next.js",
      "React",
      "Tailwind CSS",
      "Shadcn-ui",
      "Server components",
    ],
    authors: [
      {
        name: "mehdibha",
        url: "https://www.mehdibha.com",
      },
    ],
    creator: "mehdibha",
    thumbnail: "/images/og-image.png",
    twitter: {
      creator: "@mehdibha_",
    },
  },
  header: {
    nav: {
      links: [
        { href: "/themes", label: "Themes" },
        { href: "/blog", label: "Blog" },
      ],
    },
    cta: {
      primary: {
        label: "Playground",
        href: "/playground",
      },
      secondary: {
        label: "Sign in",
        href: "/login",
      },
    },
  },
  footer: {
    socialLinks: {
      twitter: "https://twitter.com/mehdibha_",
      instagram: "https://instagram.com/mehdibha",
      github: "https://github.com/mehdibha",
      linkedin: "https://www.linkedin.com/mehdibha",
      mail: "mailto:hello@mehdibha.com",
      codepen: null,
    },
  },
  homePage: {
    hero: {
      headline: "Get an instant **preview**\n for your theme",
      subheadline:
        "Get an instant preview for your theme with vapotertn. Export your theme in one click.",
      cta: [
        { label: "Go to playground", href: "/playground" },
        { label: "Star on GitHub", href: "https://github.com/mehdibha/vapotertn" },
      ],
      demoVideo: {
        src: null,
      },
    },
    features: {
      headline: "supported libraries",
      features: [
        {
          title: "MUI",
          description: "Discover our theme previewer for MUI",
          image: "https://mui.com/static/logo.svg",
          cta: {
            label: "Go to playground",
            href: "/playground?library=mui",
          },
          soon: true,
        },
        {
          title: "shadcn-ui",
          description: "Discover our theme previewer for shadcn",
          image: "/images/shadcn.svg",
          cta: {
            label: "Go to playground",
            href: "/playground?library=shadcn",
          },
        },
      ],
    },
    testimonial: {
      headline: "Our community **loves** us",
      subheadline: "",
      testimonials: [
        {
          content: "Love this",
          href: "https://twitter.com/port_dev/status/1742437552433279045",
          author: {
            name: "port",
            role: "Passionate developer",
            avatar:
              "https://pbs.twimg.com/profile_images/1652909540461912064/WEIE2q8H_400x400.png",
            verified: true,
          },
        },
        {
          content: "Awesome. Would be great if we could pick from some pre-built themes!",
          href: "https://twitter.com/shadcn/status/1742408367564292589",
          author: {
            name: "Shadcn",
            role: "Author of shadcn-ui",
            verified: true,
            avatar:
              "https://pbs.twimg.com/profile_images/1593304942210478080/TUYae5z7_400x400.jpg",
          },
        },
        {
          content: "Wow nice but light  theme is amazing🫡.",
          href: "https://twitter.com/_mohd_mustaqim/status/1742385036798640508",
          author: {
            name: "Md Mustaqim Alam",
            role: "Front-end Developer",
            avatar:
              "https://pbs.twimg.com/profile_images/1740190887055941632/1ozsfIoE_400x400.jpg",
            verified: false,
          },
        },
      ],
    },
    cta: {
      headline: "Proudly **open source**",
      subheadline: "vapotertn is open source and available on GitHub",
      cta: {
        label: "Star on GitHub",
        href: "https://github.com/mehdibha/vapotertn",
      },
    },
  },
  pricingPage: {
    headline: "Simple pricing.",
    subheadline:
      "Use vapotertn for free. Upgrade to enable custom domains and more advanced features.",
    pricingPlans: [
      {
        name: "Free",
        price: { monthly: "$0", yearly: "$0" },
        description: "Good for getting started.",
        href: APP_URL,
        features: [
          "Free hosting on 'vapotertn.co'",
          "Optimized SEO",
          "Has 'Built with vapotertn' branding",
        ],
      },
      {
        featured: true,
        name: "Pro",
        price: { monthly: "$19", yearly: "$15" },
        billing: "per month",
        description: "Perfect for small / medium sized businesses.",
        href: APP_URL,
        features: [
          "Everything in Free.",
          "Basic analytics",
          "Remove 'Built with vapotertn' branding",
        ],
      },
      {
        name: "Entreprise",
        price: { monthly: "$39", yearly: "$31" },
        billing: "per month",
        description: "For even the biggest enterprise companies.",
        href: APP_URL,
        features: [
          "Everything in Personal site.",
          "Advanced analytics",
          "Priority support",
        ],
      },
    ],
    faq: [
      {
        question: "How does vapotertn works?",
        answer:
          "vapotertn is a monorepo starter that comes with Next.js, Tailwind CSS, Shadcn-ui, Server components, and more. It's a great way to start your next project.",
      },
      {
        question: "How do I create a website with vapotertn?",
        answer: "You can create a website with vapotertn by following the documentation.",
      },
      {
        question: "How much does vapotertn cost?",
        answer: "It's free to use vapotertn",
      },
      {
        question: "Can I use vapotertn for free?",
        answer: "Yes, you can use vapotertn for free.",
      },
    ],
    cta: {
      headline: "Proudly **open-source**",
      subheadline: "vapotertn is open source and available on GitHub",
      cta: { label: "Star on GitHub", href: "https://github.com/mehdibha/vapotertn" },
    },
  },
  blogPage: {
    headline: "Blog",
    subheadline: "Learn more about vapotertn and write your posts with MDX.",
  },
};
