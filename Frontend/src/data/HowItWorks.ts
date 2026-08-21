// data/howApplicationWorks.ts
import {
  UserPlus,
  MailCheck,
  ShoppingBag,
  Users,
  MessageCircle,
  Megaphone,
} from "lucide-react";

export const howItWorks = [
  {
    step: "01",
    icon: UserPlus,
    title: "Sign Up With Your College ID",
    description:
      "Enter your name, college ID, and a password. No need to type your email — we already know it.",
  },
  {
    step: "02",
    icon: MailCheck,
    title: "Verify With OTP",
    description:
      "We match your College ID against your college's official records and send an OTP straight to your registered college email.",
  },
  {
    step: "03",
    icon: ShoppingBag,
    title: "Browse the Marketplace",
    description:
      "Buy and sell books, cycles, electronics, and more — every listing is from a verified student at your own college.",
  },
  {
    step: "04",
    icon: Users,
    title: "Join the Social Feed",
    description:
      "Post updates, like, and comment with classmates. Filter by branch to see what's happening in your own department.",
  },
  {
    step: "05",
    icon: MessageCircle,
    title: "Chat With Classmates",
    description:
      "Search any verified student by College ID and send a message request, or start a chat instantly from a marketplace listing.",
  },
  {
    step: "06",
    icon: Megaphone,
    title: "Stay Updated With Announcements",
    description:
      "College admins post official notices and events. Pinned announcements stay on top, and you can ask questions right in the comments.",
  },
];
