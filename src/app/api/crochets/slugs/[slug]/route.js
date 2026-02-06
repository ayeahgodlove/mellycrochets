import { CrochetRepository } from "../../../../../data/repositories/crochet.repository";
import { NextResponse } from "next/server";

const crochetRepository = new CrochetRepository();
export async function GET(req, { params }) {
  const resolvedParams = await params;
  if (!resolvedParams?.slug) {
    return NextResponse.json(
      { message: "Slug is required", success: false, data: null },
      { status: 400 }
    );
  }

  try {
    const slug = resolvedParams.slug;

    const crochet = await crochetRepository.findBySlug(slug);
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
