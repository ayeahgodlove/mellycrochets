import { NextResponse } from "next/server";
import { CrochetRepository } from "../../../../data/repositories/crochet.repository";
import { CrochetTypeRepository } from "../../../../data/repositories/crochet-type.repository";
import { SizeRepository } from "../../../../data/repositories/size.repository";
import { NotFoundException } from "../../../../exceptions/not-found.exception";

const crochetRepository = new CrochetRepository();
const crochetTypeRepository = new CrochetTypeRepository();
const sizeRepository = new SizeRepository();

/**
 * GET /api/crochets/filter
 * Dedicated filter endpoint: accepts crochetTypeId and sizeId (and name),
 * validates IDs against crochet_types and sizes entities, then returns matching crochets.
 *
 * Query params:
 * - name / name_like: search by crochet name
 * - crochetTypeId: ID of crochet type (validated against crochet_types)
 * - sizeId: ID of size (validated against sizes)
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const name = searchParams.get("name_like") ?? searchParams.get("name");
  const crochetTypeId = searchParams.get("crochetTypeId");
  const sizeId = searchParams.get("sizeId");

  try {
    // Validate crochetTypeId: must exist in crochet_types when provided
    if (crochetTypeId != null && String(crochetTypeId).trim() !== "") {
      try {
        await crochetTypeRepository.findById(String(crochetTypeId).trim());
      } catch (e) {
        if (e instanceof NotFoundException) {
          return NextResponse.json(
            {
              data: null,
              message: `Crochet type not found for id: ${crochetTypeId}`,
              success: false,
            },
            { status: 404 }
          );
        }
        throw e;
      }
    }

    // Validate sizeId: must exist in sizes when provided
    if (sizeId != null && String(sizeId).trim() !== "") {
      try {
        await sizeRepository.findById(String(sizeId).trim());
      } catch (e) {
        if (e instanceof NotFoundException) {
          return NextResponse.json(
            {
              data: null,
              message: `Size not found for id: ${sizeId}`,
              success: false,
            },
            { status: 404 }
          );
        }
        throw e;
      }
    }

    const filters = {};
    if (name != null && String(name).trim() !== "") filters.name_like = name;
    if (crochetTypeId != null && String(crochetTypeId).trim() !== "") {
      filters.crochetTypeId = String(crochetTypeId).trim();
    }
    if (sizeId != null && String(sizeId).trim() !== "") {
      filters.sizeId = String(sizeId).trim();
    }

    const crochets =
      Object.keys(filters).length > 0
        ? await crochetRepository.getAllWithFilters(filters)
        : await crochetRepository.getAll();

    return NextResponse.json(crochets);
  } catch (error) {
    console.error("Error in /api/crochets/filter:", error);
    return NextResponse.json(
      {
        data: null,
        message: error.message || "Internal server error",
        success: false,
      },
      { status: 500 }
    );
  }
}
