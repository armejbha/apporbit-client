import React from "react";
import useAuth from "../../Hooks/useAuth";
import { FaPlayCircle } from "react-icons/fa";

const tutorials = [
  {
    title: "How to Use AppOrbit Dashboard",
    summary: "Learn how to navigate the AppOrbit dashboard efficiently and manage your apps.",
    link: "#",
    author: "AppOrbit Team",
    date: "August 10, 2025",
  },
  {
    title: "Submitting Your First App",
    summary: "Step-by-step guide to submit your first app on AppOrbit and get it reviewed.",
    link: "#",
    author: "AppOrbit Team",
    date: "August 8, 2025",
  },
  {
    title: "Managing Reviews Effectively",
    summary: "Tips on responding to user reviews and improving your app rating.",
    link: "#",
    author: "AppOrbit Team",
    date: "August 5, 2025",
  },
  {
    title: "Optimizing App Visibility",
    summary: "Learn how to optimize your app for maximum exposure on AppOrbit.",
    link: "#",
    author: "AppOrbit Team",
    date: "August 2, 2025",
  },
];

const TutorialSection = () => {
  const { theme } = useAuth();

  return (
    <section
      className={`py-16 px-10 mb-20 rounded-md ${
        theme === "dark" ? "bg-[#0a0e19]" : "bg-[#faf5f6]"
      }`}
    >
      <h2 className="text-4xl font-bold text-center mb-12">📚 App Tutorials & How-To Guides</h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {tutorials.map((tutorial, index) => (
          <a
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-5 rounded-xl shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between group ${
              theme === "dark" ? "bg-[#1a1f2e]" : "bg-white"
            }`}
          >
            {/* Icon */}
            <div className="flex justify-center mb-3">
              <FaPlayCircle className="text-4xl text-yellow-500" />
            </div>

            {/* Content container */}
            <div className="flex-1 flex flex-col justify-between">
              {/* Title */}
              <h3 className="text-lg font-semibold mb-2 text-center group-hover:text-primary">
                {tutorial.title}
              </h3>

              {/* Summary with fixed height */}
              <p className="text-sm text-gray-500 mb-4 text-center min-h-[60px]">
                {tutorial.summary}
              </p>

              {/* Author & Date */}
              <div className="text-xs text-gray-400 flex justify-between mt-auto">
                <span>{tutorial.author}</span>
                <span>{tutorial.date}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default TutorialSection;
