import { Heart, MessageCircle, Send, User } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export const posts = [
  {
    key: 1,
    content: "Excited to share my project on AI!",
    images: ["https://picsum.photos/400/600?random=1"],
    userId: "u101",
    userName: "Arjun",
    collegeName: "G.D. Goenka Public School",
    branch: "Computer Science",
  },
  {
    key: 2,
    content: "Our cricket team just won the finals 🏏",
    images: ["https://picsum.photos/400/600?random=2"],
    userId: "u102",
    userName: "Priya",
    collegeName: "Navodaya Vidyalaya",
    branch: "Mechanical",
  },
  {
    key: 3,
    content: "Photography club outing was amazing!",
    images: ["https://picsum.photos/400/600?random=3"],
    userId: "u103",
    userName: "Rahul",
    collegeName: "Goenka School Shahjahanpur",
    branch: "Civil",
  },
  {
    key: 4,
    content: "Hackathon experience was unforgettable 🚀",
    images: ["https://picsum.photos/400/600?random=4"],
    userId: "u104",
    userName: "Sneha",
    collegeName: "G.D. Goenka Public School",
    branch: "IT",
  },
  {
    key: 5,
    content: "Cultural fest rehearsals are going strong 🎭",
    images: ["https://picsum.photos/400/600?random=5"],
    userId: "u105",
    userName: "Vikram",
    collegeName: "Navodaya Vidyalaya",
    branch: "Electronics",
  },
  {
    key: 6,
    content: "New library books just arrived 📚",
    images: ["https://picsum.photos/400/600?random=6"],
    userId: "u106",
    userName: "Ananya",
    collegeName: "Goenka School Shahjahanpur",
    branch: "Computer Science",
  },
  {
    key: 7,
    content: "Blood donation camp was a huge success ❤️",
    images: ["https://picsum.photos/400/600?random=7"],
    userId: "u107",
    userName: "Karan",
    collegeName: "G.D. Goenka Public School",
    branch: "Biotech",
  },
  {
    key: 8,
    content: "Placement drive interviews went well!",
    images: ["https://picsum.photos/400/600?random=8"],
    userId: "u108",
    userName: "Meera",
    collegeName: "Navodaya Vidyalaya",
    branch: "Electrical",
  },
  {
    key: 9,
    content: "Campus Connect app is awesome 😍",
    images: ["https://picsum.photos/400/600?random=9"],
    userId: "u109",
    userName: "Rohit",
    collegeName: "Goenka School Shahjahanpur",
    branch: "Computer Science",
  },
  {
    key: 10,
    content: "Workshop on Machine Learning was insightful 🤖",
    images: ["https://picsum.photos/400/600?random=10"],
    userId: "u110",
    userName: "Neha",
    collegeName: "G.D. Goenka Public School",
    branch: "IT",
  },
];

const mockComments = [
  { id: "c1", userName: "Priya", content: "This is amazing! 🔥" },
  { id: "c2", userName: "Rahul", content: "Congrats on this!" },
  { id: "c3", userName: "Sneha", content: "Super proud of you 👏" },
];

const SocialListing = () => {
  const [activePost, setActivePost] = useState(posts[0]);
  const postRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Mock like state — baad mein useToggleLike mutation se replace hoga
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(24);
  const [commentText, setCommentText] = useState("");

  // jab post change ho, like state reset karo (abhi mock hai, baad mein
  // real data useLikeStatus(activePost.key) jaisa kisi query se aayega)
  useEffect(() => {
    setIsLiked(false);
    setLikeCount(24);
  }, [activePost]);

  const handleToggleLike = () => {
    // UI-only toggle — baad mein yahan useToggleLike().mutate({ targetId, targetType: "POST" })
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          const index = Number(visibleEntry.target.getAttribute("data-index"));
          setActivePost(posts[index]);
        }
      },
      { root: null, threshold: 0.6 }
    );

    postRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full h-full flex gap-2 min-h-0 p-5">
      {/* Post side: scroll karega */}
      <div className="flex-[0.6] h-full overflow-y-auto min-h-0 no-scrollbar">
        {posts.map((post, index) => (
          <div
            key={post.key}
            ref={(el) => {
              postRefs.current[index] = el;
            }}
            data-index={index}
            className="w-full max-w-md aspect-[3/4] mb-6 rounded-lg shadow relative"
          >
            <img
              src={post.images[0]}
              alt={post.content}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 w-full px-4 py-2 backdrop-blur-xl flex items-center gap-4 rounded-b-lg">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                <User size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">{post.userName}</p>
                <p className="text-xs text-text-muted">{post.branch}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content side: activePost ke hisaab se badalta hai */}
      <div className="flex-[0.4] h-full bg-card rounded-lg border border-card-hover flex flex-col min-h-0 overflow-hidden">
        {/* Post info — fixed top */}
        <div className="p-4 border-b border-card-hover shrink-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
              <User size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">{activePost.userName}</p>
              <p className="text-xs text-text-muted">
                {activePost.collegeName} · {activePost.branch}
              </p>
            </div>
          </div>
          <p className="text-sm text-text-muted">{activePost.content}</p>
        </div>

        {/* Like/comment bar — fixed */}
        <div className="flex items-center gap-5 px-4 py-3 border-b border-card-hover shrink-0">
          <button
            onClick={handleToggleLike}
            className="flex items-center gap-1.5 text-text-muted hover:text-primary transition"
          >
            <Heart
              size={20}
              className={isLiked ? "fill-primary text-primary" : ""}
            />
            <span className="text-xs">{likeCount}</span>
          </button>

          <div className="flex items-center gap-1.5 text-text-muted">
            <MessageCircle size={20} />
            <span className="text-xs">{mockComments.length}</span>
          </div>
        </div>

        {/* Comments list — yeh scroll karega */}
        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-4 py-3 space-y-3">
          {mockComments.map((comment) => (
            <div key={comment.id} className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center shrink-0">
                <User size={14} className="text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-text-primary">{comment.userName}</p>
                <p className="text-xs text-text-muted">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Comment input — fixed bottom */}
        <div className="flex items-center gap-2 p-3 border-t border-card-hover shrink-0">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 bg-background text-sm px-3 py-2 rounded-xl border border-accent outline-none focus:border-primary placeholder:text-text-muted text-text-muted"
          />
          <button className="text-primary hover:text-primary-hover transition">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialListing;