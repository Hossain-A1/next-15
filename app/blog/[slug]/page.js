import BlogDetails from "@/components/BlogDetails";
export const generateMetadata = async ({ params }) => {
  return {
    title: `HeroTech - Blog -` + params?.slug,
  };
};
const BlogDetailsRoute = async ({ params }) => {
  const res = await fetch(`${process.env.SERVER}/api/blog/${params.slug}`);
  let data = [];
  data = await res.json();
  return <BlogDetails title={params?.slug} data={data} />;
};

export default BlogDetailsRoute;

export const generateStaticSlugs = async () => {
  const res = await fetch(`${process.env.SERVER}/api/blog/slug-list`);
  let data = [];
  data = await res.json();

  return data.map((slug) => ({
    slug: slug,
  }));
};
