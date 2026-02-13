import { CrochetTypeRepository } from "../../../../../data/repositories/crochet-type.repository";
import { NextResponse } from "next/server";

const crochetTypeRepository = new CrochetTypeRepository();

export async function GET(req, { params }) {
  const resolved = await params;
  if (!resolved?.slug) {
    return NextResponse.json(
      { message: "Slug is required", success: false, data: null },
      { status: 400 }
    );
  }

  try {
    const slug = resolved.slug;

    const crochetType = await crochetTypeRepository.findBySlug(slug);
    // const crochetTypeDTO = crochetTypeMapper.toDTO(crochetType);
    return NextResponse.json(crochetType);
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