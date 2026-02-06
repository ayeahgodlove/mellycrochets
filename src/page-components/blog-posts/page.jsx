import BlogListWrapper from "../../components/pages/blog/blog-list-wrapper.component";
import BlogHero from "../../components/shared/post-hero.component";

const BlogPostsPage = ({ title, description }) => {
  return (
    <>
      <BlogHero title={title} description={description} />
      <BlogListWrapper />
    </>
  );
};

export default BlogPostsPage;
