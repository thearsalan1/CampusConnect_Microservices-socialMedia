// data/footer.ts
export const footer = {
  brand: {
    name: "CampusConnect",
    tagline: "Your college, verified. Your community, connected.",
  },

  columns: [
    {
      title: "Product",
      links: [
        { label: "Marketplace", href: "/marketplace" },
        { label: "Social Feed", href: "/social" },
        { label: "Announcements", href: "/announcements" },
        { label: "Chat", href: "/chat" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "How It Works", href: "/#how-it-works" },
        { label: "FAQ", href: "/#faq" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
      ],
    },
  ],

  social: [
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Twitter", href: "#" },
  ],

  copyright: `© ${new Date().getFullYear()} CampusConnect. All rights reserved.`,
  bottomNote: "Built for students, by students.",
};