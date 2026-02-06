import axios from "axios";
import { Empty } from "@/components/ui";
import AppPost from "../../../components/posts/post.component";

export default async function BlogListWrapper() {
  const response = await axios.get(`${process.env.NEXTAUTH_URL}/api/posts`);

  if (response.status !== 200) {
    throw new Error("Failed to fetch crochetType details");
  }
  const { data: posts } = response;
  return (
    <section
      id="blog-posts"
      className="pt-16 pb-30 px-10 mb-15 md:px-20 text-center"
    >
      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {posts.map((post, index) => (
            <AppPost post={post} key={index} />
          ))}
        </div>
      ) : (
        <div className="empty-wrap">
          <Empty />
        </div>
      )}
    </section>
  );
}
