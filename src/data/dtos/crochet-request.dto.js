// src/presentation/dtos/crochet-request.dto.js

import { nanoid } from "nanoid";
import { emptyCrochet } from "../models";
import slugify from "slugify";

function toNumber(val) {
  if (val == null || val === "") return 0;
  const n = Number(val);
  return Number.isFinite(n) ? n : 0;
}

function parseImageUrls(val) {
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

class CrochetRequestDto {
  constructor(data) {
    if (!data || typeof data !== "object") throw new Error("Invalid crochet data");

    this.name = data.name != null ? String(data.name) : "";
    this.slug = data.slug != null ? String(data.slug) : "";
    this.description = data.description != null ? String(data.description) : "";
    this.crochetTypeId = data.crochetTypeId ?? data.crochetType?.id ?? "";
    this.imageUrls = parseImageUrls(data.imageUrls);
    this.priceInCfa = toNumber(data.priceInCfa);
    this.priceInUsd = toNumber(data.priceInUsd);
  }

  toData() {
    return {
      ...emptyCrochet,
      id: nanoid(20),
      name: this.name,
      slug: slugify(this.name ?? "", { lower: true }),
      description: this.description,
      crochetTypeId: this.crochetTypeId,
      imageUrls: this.imageUrls,
      priceInCfa: this.priceInCfa,
      priceInUsd: this.priceInUsd,
    };
  }

  toUpdateData(existing) {
    return {
      name: this.name,
      slug: slugify(this.name ?? "", { lower: true }),
      description: this.description,
      crochetTypeId: this.crochetTypeId,
      imageUrls: this.imageUrls.length > 0 ? this.imageUrls : (existing?.imageUrls ?? []),
      priceInCfa: this.priceInCfa,
      priceInUsd: this.priceInUsd,
    };
  }
}

export { CrochetRequestDto };