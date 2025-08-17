import React from "react";
import useAuth from "../../Hooks/useAuth";

const blogs = [
  {
    title: "Java Annotated Monthly – July 2025",
    summary:
      "JetBrains’ monthly roundup for Java devs, packed with productivity tips, tech insights, and ecosystem updates.",
    image:
      "https://i.postimg.cc/8CFsr8M1/ai-nuclear-energy-background-future-innovation-disruptive-technology.jpg",
    link: "https://blog.jetbrains.com/idea/2025/07/java-annotated-monthly-july-2025",
    author: "JetBrains",
    date: "July 12, 2025",
  },
  {
    title: "Weekly Tech Talk – July 7, 2025",
    summary:
      "A weekly digest covering the hottest topics in AI, IT innovations, and future-focused technology.",
    image:
      "https://i.postimg.cc/8cGC3j35/man-doing-software-quality-assurance-using-tablet-reading-source-code.jpg",
    link: "https://medium.com/@abhishekmonpara198/weekly-tech-talk-july-7th-2025-your-monday-night-tech-brief-cc1c729371b0",
    author: "Abhishek Monpara",
    date: "July 7, 2025",
  },
  {
    title: "Mid-Year Tech Trends: What 2025 Is Really Telling Us",
    summary:
      "Explore how AI, cybersecurity, and smart devices are disrupting industries — and what tech leaders must prepare for.",
    image:
      "https://i.postimg.cc/wM962nyR/representation-user-experience-interface-design.jpg",
    link: "https://blog.grantmcgregor.co.uk/mid-year-tech-trends-what-2025-is-really-telling-us",
    author: "Grant McGregor",
    date: "July 5, 2025",
  },
  {
    title: "Top Open Source Projects to Watch in 2025",
    summary:
      "Explore the most exciting open-source tools gaining momentum this year — from AI frameworks to dev productivity tools.",
    image:
      "https://i.postimg.cc/9FFm75Hv/standard-quality-control-concept-m.jpg",
    link: "https://opensource.com/article/25/07/top-open-source-projects",
    author: "OpenSource.com",
    date: "July 2, 2025",
  },
];

const BlogSection = () => {
    const {theme}=useAuth()
  return (
    <section className={`rounded-md py-16 px-10 text-base-content mb-20 ${theme==="dark" ? 'bg-[#0a0e19]': 'bg-[#faf5f6]'}`}>
      <div className="">
        <h2 className="text-center text-3xl font-bold text-primary mb-12"> Latest Tech Blogs</h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {blogs.map((blog, index) => (
            <a
              key={index}
              href={blog.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-base-100 rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-5 flex flex-col justify-between items-center">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary">{blog.title}</h3>
                <div className="">
                    <p className="text-sm text-gray-500 mb-3">{blog.summary.slice(0, 90)}...</p>
                <div className="text-xs text-gray-400 flex justify-between">
                  <span>By {blog.author}</span>
                  <span>{blog.date}</span>
                </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
