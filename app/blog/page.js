import Blog from "@/components/Blog";

export const metadata = {
  title: "Blog",
};

// Revalidate every 60 seconds
export const revalidate = 86400

const BlogRoute = async () => {
  const res = await fetch(`${process.env.SERVER}/api/blog`);

  const data = await res.json();
  return <Blog blogs={data} />;
};

export default BlogRoute;
