import { validate } from "class-validator";
import { NextResponse } from "next/server";
import { CategoryRepository } from "../../../data/repositories/category.repository";
import { CategoryRequestDto } from "../../../data/dtos/category-request.dto";
import { displayValidationErrors, VALIDATION_OPTIONS } from "../../../lib/displayValidationErrors";
import authOptions from "../../../lib/options";
import { getServerSession } from "next-auth";

const categoryRepository = new CategoryRepository();

export async function GET(request) {
  try {
    const categories = await categoryRepository.getAll();

    return NextResponse.json(categories);
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

  const userId = session.user.id;

  try {
    const body = await request.json();
    const dto = new CategoryRequestDto(body);
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

    const categoryResponse = await categoryRepository.create({
      ...dto.toData(),
      userId,
    });
    return NextResponse.json(
      {
        data: categoryResponse,
        message: "category created Successfully!",
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
