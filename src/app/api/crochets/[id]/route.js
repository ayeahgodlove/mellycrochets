import slugify from "slugify";
import { CrochetRequestDto } from "../../../../data/dtos/crochet-request.dto";
import { CrochetRepository } from "../../../../data/repositories/crochet.repository";
import { displayValidationErrors, VALIDATION_OPTIONS } from "../../../../lib/displayValidationErrors";
import { validate } from "class-validator";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import authOptions from "../../../../lib/options";

const crochetRepository = new CrochetRepository();

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

  try {
    const dto = new CrochetRequestDto(await req.json());
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

    const existing = await crochetRepository.findById(id);
    if (!existing) {
      return NextResponse.json(
        { message: "Crochet not found", success: false, data: null },
        { status: 404 }
      );
    }

    const imageUrls = Array.isArray(dto.imageUrls) && dto.imageUrls.length > 0
      ? dto.imageUrls
      : (Array.isArray(existing.imageUrls) ? existing.imageUrls : []);

    const obj = {
      id,
      name: dto.name ?? existing.name,
      slug: slugify((dto.name ?? existing.name) ?? "", { lower: true }),
      description: dto.description ?? existing.description,
      crochetTypeId: dto.crochetTypeId || existing.crochetTypeId,
      imageUrls,
      priceInCfa: dto.priceInCfa,
      priceInUsd: dto.priceInUsd,
    };
    const updatedCrochet = await crochetRepository.update(obj);

    return NextResponse.json(
      {
        data: updatedCrochet,
        message: "Crochet Updated Successfully!",
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

    const crochet = await crochetRepository.findById(id);
    return NextResponse.json(crochet);
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

    await crochetRepository.delete(id);

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
