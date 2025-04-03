import Blog from "@/components/Blog";
import { metadata } from "../layout";
metadata.title = "Blog";
const BlogRoute = async () => {
  const res = await fetch(`${process.env.SERVER}/api/blog`);

  const data = await res.json();
  return <Blog blogs={data} />;
};

export default BlogRoute;
