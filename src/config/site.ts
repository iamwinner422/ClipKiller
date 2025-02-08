export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Vite + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Auto Clip",
      href: "/",
    },
    {
      label: "Clip Me",
      href: "/clip-me",
    },
    
  ],
  navMenuItems: [
    {
      label: "Auto Clip",
      href: "/",
    },
    {
      label: "Manual Clip",
      href: "/dashboard",
    },
  ],
  links: {
    github: "https://github.com/iamwinner422",
    web: "https://iamwinner422.vercel.app",
  },
};
