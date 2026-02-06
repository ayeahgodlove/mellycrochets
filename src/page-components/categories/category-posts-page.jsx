import CrochetTypeHero from "../../components/shared/crochet-type-hero.component";
import PostList from "../../components/posts/post-list.component";

const CategoryPostsPage = ({ category }) => {
  return (
    <>
      <CrochetTypeHero
        title={category.name}
        description={category.description}
        breadcrumbs={[
          { title: "Posts", href: "/blog_posts" },
          { title: category.name, href: "#" },
        ]}
      />
      <div className="w-full px-10 pb-10" data-aos="fade-up">
        <PostList posts={category?.posts} />
      </div>
    </>
  );
};

export default CategoryPostsPage;
