import CrochetTypeHero from "../../components/shared/crochet-type-hero.component";
import PostList from "../../components/posts/post-list.component";

const TagPostsPage = ({ tag }) => {
  return (
    <>
      <CrochetTypeHero
        title={tag.name}
        description={tag.description}
        breadcrumbs={[
          { title: "Posts", href: "/blog_posts" },
          { title: tag.name, href: "#" },
        ]}
      />
      <div className="w-full px-10 pb-10" data-aos="fade-up">
        <PostList posts={tag?.posts} />
      </div>
    </>
  );
};

export default TagPostsPage;
