import { PostRepository } from "../../../../../data/repositories/post.repository";
import { NextResponse } from "next/server";

const postRepository = new PostRepository();

export async function GET(req, { params }) {
  try {
    const slug = params.slug;

    const postBySlug = await postRepository.findBySlug(slug);
    if (postBySlug) return NextResponse.json(postBySlug, { status: 200 });

    return NextResponse.json(
      {
        data: null,
        message: "Post not found",
        success: false,
      },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      },
      { status: 400 }
    );
  }
}
