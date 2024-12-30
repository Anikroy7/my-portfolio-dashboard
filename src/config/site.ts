export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Portfolio Dashboard",
  description: `I’m a Full-Stack Engineer passionate about building impactful digital experiences. With expertise in technologies such asReact, Next.js, Node.js, MongoDB, and PHP, I specialize in creating solutions that are scalable, user-centric, and aligned with business needs`,
  navItems: [
    {
      label: "News Feed",
      href: "/",
    },
    {
      label: "Contact Us",
      href: "/contact",
    },

    {
      label: "About us",
      href: "/about",
    },
    {
      label: "Dashbaord",
      href: "/dashboard",
    },
  ],
  navMenuItems: [
    {
      label: "News Feed",
      href: "/",
    },
    {
      label: "Contact Us",
      href: "/contact",
    },
    {
      label: "About us",
      href: "/about",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
