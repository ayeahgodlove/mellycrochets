import { PostRepository } from "../../../../../data/repositories/post.repository";
import { NotFoundException } from "../../../../../exceptions/not-found.exception";
import { NextResponse } from "next/server";

const postRepository = new PostRepository();

export async function GET(req, context) {
  try {
    const { slug } = await context.params;

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
    if (error instanceof NotFoundException) {
      return NextResponse.json(
        { data: null, message: error.message, success: false },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        data: null,
        message: error.message,
        success: false,
      },
      { status: 400 }
    );
  }
}
