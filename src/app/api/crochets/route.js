import { validate } from "class-validator";
import { NextResponse } from "next/server";
import { CrochetRepository } from "../../../data/repositories/crochet.repository";
import { CrochetRequestDto } from "../../../data/dtos/crochet-request.dto";
import { displayValidationErrors } from "../../../lib/displayValidationErrors";
import authOptions from "../../../lib/options";
import { getServerSession } from "next-auth";

const crochetRepository = new CrochetRepository();

export async function GET(request) {
  try {
    const crochets = await crochetRepository.getAll();

    return NextResponse.json(crochets);
  } catch (error) {
    console.error("Error fetching crochets:", error);
    return NextResponse.json(
      {
        data: null,
        message: error.message || "Internal server error",
        validationErrors: [],
        success: false,
      },
      { status: 500 }
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
    const dto = new CrochetRequestDto(body);
    const validationErrors = await validate(dto);

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

    const crochetResponse = await crochetRepository.create({
      ...dto.toData(),
    });
    return NextResponse.json(
      {
        data: crochetResponse,
        message: "crochet created Successfully!",
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
