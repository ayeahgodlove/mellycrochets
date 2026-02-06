import { Card, Divider, Tag, Space } from "@/components/ui";
import CrochetTypeHero from "../../components/shared/crochet-type-hero.component";
import Link from "next/link";
import { CiFolderOn } from "react-icons/ci";
import PostComments from "../../components/comment/comment.component";

const BlogPostDetailPage = ({
  post,
  categories,
  tags,
  latestPosts,
  uploadsBaseUrl,
}) => {
  return (
    <>
      <CrochetTypeHero
        title={"Post Details"}
        description={post.title}
        breadcrumbs={[
          { title: "Posts", href: "/blog_posts" },
          { title: "Details", href: "#" },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card
            cover={
              <img
                src={`${uploadsBaseUrl}/${post.imageUrl}`}
                alt={post.title}
                className="rounded-t-xl object-cover w-full"
              />
            }
            className="rounded-xl"
            variant="borderless"
          >
            <>
              <h2>{post.title}</h2>
              <p>{post.summary}</p>
              <Divider />
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
              <Divider />
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <Tag
                    key={tag.id}
                    color="#ffe3e2"
                    style={{ color: "#333", fontWeight: 500 }}
                  >
                    {tag.name.toUpperCase()}
                  </Tag>
                ))}
              </div>
            </>
          </Card>
        </div>

        <Space direction="vertical" size={"small"} className="space-y-6">
          <Card
            variant="borderless"
            size="small"
            title="Latest Posts"
            className="rounded-xl shadow-sm"
          >
            <ul className="space-y-2">
              {latestPosts.map((p) => (
                <li key={p.id}>
                  <Link href={`/blog_posts/${p.slug}`}>
                    {p.title.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </Card>

          <Card
            variant="borderless"
            size="small"
            title="Categories"
            className="rounded-xl shadow-sm"
          >
            <ul className="space-y-1">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    style={{
                      marginBottom: 5,
                    }}
                    href={`/categories/${cat.slug}`}
                  >
                    <Space style={{ columnGap: 2 }}>
                      <CiFolderOn size={20} /> {cat.name.toUpperCase()}
                    </Space>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>

          <Card
            variant="borderless"
            size="small"
            title="Tags"
            className="rounded-xl shadow-sm"
          >
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link key={tag.id} href={`/tags/${tag.slug}`}>
                  <Tag
                    size="large"
                    color="#ffe3e2"
                    style={{ color: "#333", fontWeight: 500 }}
                  >
                    {tag.name.toUpperCase()}
                  </Tag>
                </Link>
              ))}
            </div>
          </Card>
        </Space>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <PostComments postId={post.id} />
      </div>
    </>
  );
};

export default BlogPostDetailPage;
