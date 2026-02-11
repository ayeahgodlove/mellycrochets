import { validate } from "class-validator";
import { NextResponse } from "next/server";
import { CrochetTypeRepository } from "../../../data/repositories/crochet-type.repository";
import { CrochetTypeRequestDto } from "../../../data/dtos/crochet-type-request.dto";
import { displayValidationErrors, VALIDATION_OPTIONS } from "../../../lib/displayValidationErrors";
import authOptions from "../../../lib/options";
import { getServerSession } from "next-auth";

const crochetTypeRepository = new CrochetTypeRepository();

export async function GET(request) {
  try {
    const crochetTypes = await crochetTypeRepository.getAll();

    return NextResponse.json(crochetTypes);
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
    const dto = new CrochetTypeRequestDto(body);
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

    const crochetTypeResponse = await crochetTypeRepository.create({
      ...dto.toData(),
    });
    return NextResponse.json(
      {
        data: crochetTypeResponse,
        message: "crochetType created Successfully!",
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
