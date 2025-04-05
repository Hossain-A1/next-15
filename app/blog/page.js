import Blog from "@/components/Blog";

export const metadata = {
  title: "Blog",
};

export const revalidate = 86400;

// Optional: force dynamic if you want to skip static build errors
export const dynamic = "force-dynamic";

const BlogRoute = async () => {
  let blogs = [];

  try {
    const res = await fetch(`${process.env.SERVER}/api/blog`);
    if (!res.ok) throw new Error("Failed to fetch blogs");
    blogs = await res.json();
  } catch (err) {
    console.error("Build-time fetch error in /blog:", err.message);
  }

  return <Blog blogs={blogs} />;
};

export default BlogRoute;
