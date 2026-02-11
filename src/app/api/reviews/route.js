import { validate } from "class-validator";
import { NextResponse } from "next/server";
import { ReviewRepository } from "../../../data/repositories/review.repository";
import { ReviewRequestDto } from "../../../data/dtos/review-request.dto";
import { displayValidationErrors, VALIDATION_OPTIONS } from "../../../lib/displayValidationErrors";

const reviewRepository = new ReviewRepository();

export async function GET(request) {
  try {
    const reviews = await reviewRepository.getAll();

    return NextResponse.json(reviews);
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
  try {
    const body = await request.json();
    const dto = new ReviewRequestDto(body);
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

    const reviewResponse = await reviewRepository.create({
      ...dto.toData(),
    });
    return NextResponse.json(
      {
        data: reviewResponse,
        message: "review created Successfully!",
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
