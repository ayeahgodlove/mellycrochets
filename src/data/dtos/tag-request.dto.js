// src/presentation/dtos/tag-request.dto.ts

import { nanoid } from "nanoid";
import slugify from "slugify";
import { emptyTag } from "../models";

class TagRequestDto {
  constructor(data) {
    if (!data || typeof data !== "object") throw new Error("Invalid Tag data");

    this.name = data.name;
  }

  toData() {
    return {
      ...emptyTag,
      id: nanoid(10),
      name: this.name,
      slug: slugify(this.name ?? "", { lower: true, strict: true }),
    };
  }

  toUpdateData(data) {
    return { ...data };
  }
}

export { TagRequestDto };
