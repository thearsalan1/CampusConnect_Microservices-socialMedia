import { ArrowRight } from "lucide-react";

export const announcements = [
  { key: 1, title: "Annual Tech Fest 2026 Registration Open" },
  { key: 2, title: "Mid-Semester Examination Schedule Released" },
  { key: 3, title: "New Library Timings Effective From Monday" },
  { key: 4, title: "Workshop on AI & Machine Learning" },
  { key: 5, title: "College Cricket Tournament – Team Selection" },
  { key: 6, title: "Blood Donation Camp Organized by NSS" },
  { key: 7, title: "Holiday Notice for Diwali Festival" },
  { key: 8, title: "Placement Drive: Infosys & TCS" },
  { key: 9, title: "Cultural Fest Auditions Start Tomorrow" },
  { key: 10, title: "Important Update: Hostel Rules Revised" },
];

const AnnouncementsBar = () => {
  return (
    <div className="">
      <div className="flex justify-between items-center text-accent-hover mb-3 pr-3">
        <h1 className="text-heading ">
        Latest Announcements
      </h1>
      <span className="cursor-pointer hover:text-primary">
        <ArrowRight/>
      </span>
      </div>
      {announcements.map((announcement) => (
        <div
          key={announcement.key}
          className="py-3 px-2 mb-2 border-b border-accent hover:bg-surface transition cursor-pointer text-body text-xs"
        >
          <p className="truncate text-text-muted">{announcement.title}</p>
        </div>
      ))}
    </div>
  );
};

export default AnnouncementsBar;
