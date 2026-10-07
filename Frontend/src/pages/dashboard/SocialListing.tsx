import React from "react";

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

const SocialListing = () => {
  return (
    <div className="w-full h-full flex gap-4 min-h-0">
      {/* Post side: yeh scroll karega */}
      <div className="flex-[0.6] h-full overflow-y-auto min-h-0">
        {posts.map((post) => (
          <div
            key={post.key}
            className="w-full max-w-md aspect-[3/4] mb-6 rounded-lg shadow"
          >
            <img
              src={post.images[0]}
              alt={post.content}
              className="w-full h-full object-cover rounded-lg"
            />
            <p className="mt-2 text-sm text-text-muted">{post.content}</p>
          </div>
        ))}
      </div>

      {/* Content side: yeh fixed rahega, scroll nahi karega */}
      <div className="flex-[0.4] h-full bg-card p-4 rounded-lg border border-card-hover overflow-hidden">
        <h2 className="text-lg font-semibold mb-2">Content</h2>
        <p className="text-sm text-text-muted mb-2">
          Likes, comments, or extra info related to the post.
        </p>
        <p className="text-xs text-text-muted">This side stays fixed.</p>
      </div>
    </div>
  );
};

export default SocialListing;
