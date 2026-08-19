// data/faq.ts
export interface FAQItem {
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    question: "Is my data safe on CampusConnect?",
    answer:
      "Yes. We only verify your College ID against your college's official records to confirm you're a real student — we never ask for your email directly, and your password is never stored in plain text. Your information stays within your own college's verified community.",
  },
  {
    question: "How does the verification process actually work?",
    answer:
      "You sign up with your name, College ID, and a password — no email required. We match your College ID against your college's official student records, find your registered college email automatically, and send an OTP there. Once you verify that OTP, you're in.",
  },
  {
    question: "Which colleges can join CampusConnect?",
    answer:
      "CampusConnect works with any college willing to share their official student roster for verification purposes. If your college isn't onboarded yet, reach out and we'll help get it set up.",
  },
  {
    question: "Is CampusConnect free to use?",
    answer:
      "Yes, CampusConnect is completely free for students. There are no hidden charges for browsing the marketplace, chatting, or reading announcements.",
  },
  {
    question: "Can students from other colleges see my posts or message me?",
    answer:
      "No. Everything on CampusConnect — the marketplace, the social feed, chats, and announcements — is scoped strictly to your own college. Students from other colleges never see your content, and you never see theirs.",
  },
  {
    question: "Who can post official announcements?",
    answer:
      "Only verified college admins can create official announcements. Students can read them and leave comments or questions, which admins can respond to directly.",
  },
  {
    question: "Can I message someone I don't already know?",
    answer:
      "Yes — you can search for any verified student by their College ID and send them a message request. They'll need to accept before a full conversation opens up, so you're never getting unsolicited spam from strangers.",
  },
  {
    question: "What happens if someone posts something inappropriate?",
    answer:
      "Students can report any post, item, or comment. Once something receives enough reports, it's automatically hidden from view and flagged for your college's admins to review and take action on.",
  },
  {
    question: "Do I need to download an app?",
    answer:
      "No, CampusConnect works right in your browser — no installation needed. Just log in from your phone or laptop whenever you need it.",
  },
  {
    question: "What if I forget my password?",
    answer:
      "No problem — use the 'Forgot Password' option on the login page. We'll send a one-time code to your verified college email so you can securely reset it.",
  },
];