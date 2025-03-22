import { NextResponse } from "next/server";
import { CrochetRepository } from "../../../../data/repositories/crochet.repository";

const crochetRepository = new CrochetRepository();

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const color = searchParams.get("color");
  const crochetTypeId = searchParams.get("crochetTypeId");
  const sizeId = searchParams.get("sizeId");

  console.log("searchParams: ", searchParams);
  try {
    const crochets = await crochetRepository.filter({
      crochetTypeId,
      sizeId,
      color,
    });

    return NextResponse.json(crochets);
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
