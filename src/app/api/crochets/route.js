import { validate } from "class-validator";
import { NextResponse } from "next/server";
import { CrochetRepository } from "../../../data/repositories/crochet.repository";
import { CrochetRequestDto } from "../../../data/dtos/crochet-request.dto";
import { displayValidationErrors, VALIDATION_OPTIONS } from "../../../lib/displayValidationErrors";
import authOptions from "../../../lib/options";
import { getServerSession } from "next-auth";

const crochetRepository = new CrochetRepository();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name_like") ?? searchParams.get("name");
    const crochetTypeId = searchParams.get("crochetTypeId");
    const sizeId = searchParams.get("sizeId");

    const filters = {};
    if (name != null && String(name).trim() !== "") filters.name_like = name;
    if (crochetTypeId != null && String(crochetTypeId).trim() !== "") filters.crochetTypeId = crochetTypeId;
    if (sizeId != null && String(sizeId).trim() !== "") filters.sizeId = sizeId;

    const hasFilters = Object.keys(filters).length > 0;
    const crochets = hasFilters
      ? await crochetRepository.getAllWithFilters(filters)
      : await crochetRepository.getAll();

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

    if (!dto.name?.trim()) {
      return NextResponse.json(
        { success: false, data: null, message: "Name is required.", validationErrors: [] },
        { status: 400 }
      );
    }
    if (!dto.description?.trim()) {
      return NextResponse.json(
        { success: false, data: null, message: "Description is required.", validationErrors: [] },
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
