import { validate } from "class-validator";
import { NextResponse } from "next/server";
import { PostRepository } from "../../../data/repositories/post.repository";
import { PostRequestDto } from "../../../data/dtos/post-request.dto";
import { displayValidationErrors, VALIDATION_OPTIONS } from "../../../lib/displayValidationErrors";
import authOptions from "../../../lib/options";
import { getServerSession } from "next-auth";

const postRepository = new PostRepository();

export async function GET(request) {
  try {
    const posts = await postRepository.getAll();

    return NextResponse.json(posts);
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

export async function POST(request) {
  const session = await getServerSession(authOptions); //get session info

  if (!session || !session.user) {
    return NextResponse.json(
      {
        message: "Unauthorized: Please log in to access this resource.",
        success: false,
        data: null,
        validationErrors: [],
      },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const dto = new PostRequestDto(body);
    const validationErrors = await validate(dto, VALIDATION_OPTIONS);

    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          validationErrors: displayValidationErrors(validationErrors),
          success: false,
          data: null,
          message: "Attention!",
        },
        { status: 400 }
      );
    }

    const postResponse = await postRepository.create(
      {
        ...dto.toData(),
        authorId: session.user.id,
      },
      dto.tags
    );
    return NextResponse.json(
      {
        data: postResponse,
        message: "post created Successfully!",
        validationErrors: [],
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        message: error.message,
        validationErrors: [],
        success: false,
      },
      { status: 400 }
    );
  }
}
