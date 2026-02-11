import { ReviewRequestDto } from "../../../../data/dtos/review-request.dto";
import { ReviewRepository } from "../../../../data/repositories/review.repository";
import { displayValidationErrors, VALIDATION_OPTIONS } from "../../../../lib/displayValidationErrors";
import { validate } from "class-validator";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import authOptions from "../../../../lib/options";
import { emptyReview } from "../../../../data/models";

const reviewRepository = new ReviewRepository();

export async function PATCH(req, { params }) {
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

  if (!params?.id) {
    return NextResponse.json(
      {
        message: "Invalid request: ID is required.",
        success: false,
        data: null,
      },
      { status: 400 }
    );
  }

  const userId = session.user.id;

  try {
    const dto = new ReviewRequestDto(await req.json());
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

    const id = params.id;

    const obj = {
      ...emptyReview,
      ...dto.toData(),
      id: id,
      userId,
    };
    const updatedReview = await reviewRepository.update(obj);

    return NextResponse.json(
      {
        data: updatedReview,
        message: "Review Updated Successfully!",
        validationErrors: [],
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  if (!params?.id) {
    return NextResponse.json(
      { message: "ID is required", success: false, data: null },
      { status: 400 }
    );
  }

  try {
    const id = params.id;

    const review = await reviewRepository.findById(id);
    // const reviewDTO = reviewMapper.toDTO(review);
    return NextResponse.json(review);
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

export async function DELETE(req, { params }) {
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
    const id = params.id;

    await reviewRepository.delete(id);

    return NextResponse.json({
      message: `Operation successfully completed!`,
      validationErrors: [],
      success: true,
      data: null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
        data: null,
        validationErrors: [error],
        success: false,
      },
      { status: 400 }
    );
  }
}
