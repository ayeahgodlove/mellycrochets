import { getPostImageUrl } from "../../constants/api-url";
import Link from "next/link";
import React from "react";

const AppPost = ({ post }) => {
  return (
    <div
      key={post.id}
      className="bg-white shadow-lg rounded-xl flex flex-col items-center"
    >
      <img
        src={getPostImageUrl(post.imageUrl)}
        alt={post.title}
        className=" mb-4 object-cover rounded-tl-xl rounded-tr-xl"
        style={{
          height: 300,
        }}
      />
      <div className="px-6 py-3">
        <p className="text-lg font-semibold text-gray-800">
          <Link href={`/blog_posts/${post.slug}`}>{post.title}</Link>
        </p>
        <p className="text-gray-600 mt-2 text-sm">{post.summary}</p>
        <Link
          href={`/blog_posts/${post.slug}`}
          className="view-country-link mt-4 px-6 py-2 border rounded-full w-full justify-center"
        >
          Learn more
        </Link>
      </div>
    </div>
  );
};

export default AppPost;
