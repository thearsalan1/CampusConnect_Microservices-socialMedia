import AnnouncementsBar from "../dashboard/AnnouncementsBar";
import SocialListing from "./SocialListing";

const SocialPage = () => {
  return (
    <div className="flex flex-1 min-h-0 overflow-hidden w-full">
      <section className="flex-1 p-4 min-h-0 overflow-hidden">
        <SocialListing />
      </section>

      <aside className="w-84 p-4 bg-card border border-l-accent overflow-y-auto shrink-0">
        <AnnouncementsBar />
      </aside>
    </div>
  );
};

export default SocialPage;