import { FacebookIcon, GithubIcon, MailIcon } from "lucide-react";

export const siteConfig = {
  global: {
    url: "https://vapi.tn",
    name: "Vapi",
    logo: "/images/logo.png",
    title: "Vapi - Première marketplace de vente de cigarettes électroniques en Tunisie.",
    description:
      "Vapi, site de cigarette électronique, vous donne accès à la communeauté Vape In Tunisia. Vous avez également la possibilité de faire l'achat de vos cigarettes électroniques en ligne.",
    keywords: [
      "vape jetable tunisie",
      "vape jetable",
      "vapoter tunisie",
      "vape tunsie",
      "cigarette électronique tunisie",
      "vape",
    ],
    authors: [
      {
        name: "mehdibha",
        url: "https://www.mehdibha.com",
      },
    ],
    creator: "mehdibha",
    thumbnail: "/images/thumbnail.jpg",
    twitter: {
      creator: "@mehdibha_",
    },
    externalLinks: [
      { icon: FacebookIcon, url: "https://www.facebook.com/groups/160143328137207" },
      { icon: MailIcon, url: "mailto:hello@mehdibha.com" },
      { icon: GithubIcon, url: "https://github.com/mehdibha/vapi.tn" },
    ],
  },
  header: {
    nav: {
      links: [
        { href: "/", label: "Communauté" },
        { href: "/marketplace", label: "Marketplace" },
        { href: "/vape-stores", label: "Vape stores" },
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
  homePage: {
    hero: {
      headline: "Get an instant **preview**\n for your theme",
      subheadline:
        "Get an instant preview for your theme with vapi. Export your theme in one click.",
      cta: [
        { label: "Go to playground", href: "/playground" },
        { label: "Star on GitHub", href: "https://github.com/mehdibha/vapi" },
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
      subheadline: "vapi is open source and available on GitHub",
      cta: {
        label: "Star on GitHub",
        href: "https://github.com/mehdibha/vapi",
      },
    },
  },
  pricingPage: {
    headline: "Simple pricing.",
    subheadline:
      "Use vapi for free. Upgrade to enable custom domains and more advanced features.",
    pricingPlans: [
      {
        name: "Free",
        price: { monthly: "$0", yearly: "$0" },
        description: "Good for getting started.",
        href: "#",
        features: [
          "Free hosting on 'vapi.co'",
          "Optimized SEO",
          "Has 'Built with vapi' branding",
        ],
      },
      {
        featured: true,
        name: "Pro",
        price: { monthly: "$19", yearly: "$15" },
        billing: "per month",
        description: "Perfect for small / medium sized businesses.",
        href: "#",
        features: [
          "Everything in Free.",
          "Basic analytics",
          "Remove 'Built with vapi' branding",
        ],
      },
      {
        name: "Entreprise",
        price: { monthly: "$39", yearly: "$31" },
        billing: "per month",
        description: "For even the biggest enterprise companies.",
        href: "#",
        features: [
          "Everything in Personal site.",
          "Advanced analytics",
          "Priority support",
        ],
      },
    ],
    faq: [
      {
        question: "How does vapi works?",
        answer:
          "vapi is a monorepo starter that comes with Next.js, Tailwind CSS, Shadcn-ui, Server components, and more. It's a great way to start your next project.",
      },
      {
        question: "How do I create a website with vapi?",
        answer: "You can create a website with vapi by following the documentation.",
      },
      {
        question: "How much does vapi cost?",
        answer: "It's free to use vapi",
      },
      {
        question: "Can I use vapi for free?",
        answer: "Yes, you can use vapi for free.",
      },
    ],
    cta: {
      headline: "Proudly **open-source**",
      subheadline: "vapi is open source and available on GitHub",
      cta: { label: "Star on GitHub", href: "https://github.com/mehdibha/vapi" },
    },
  },
  blogPage: {
    headline: "Blog",
    subheadline: "Learn more about vapi and write your posts with MDX.",
  },
};
