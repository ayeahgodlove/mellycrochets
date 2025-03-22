import slugify from "slugify";
import { nanoid } from "nanoid";
import { emptyCrochetType } from "../models";

class CrochetTypeRequestDto {
  constructor(data) {
    if (!data || typeof data !== "object") {
      throw new Error("Invalid category data.");
    }

    if (
      !data.name ||
      typeof data.name !== "string" ||
      data.name.length < 4 ||
      data.name.length > 25
    ) {
      throw new Error(
        "Category name must be a string between 4 and 25 characters."
      );
    }

    if (!data.description || typeof data.description !== "string") {
      throw new Error("Category description is required.");
    }

    this.name = data.name;
    this.description = data.description;
  }

  toData() {
    return {
      ...emptyCrochetType,
      id: nanoid(10),
      slug: slugify(this.name, { lower: true, replacement: "-" }),
      name: this.name,
      description: this.description,
    };
  }

  toUpdateData(data) {
    if (!data.id || typeof data.id !== "string") {
      throw new Error("Valid category ID is required for update.");
    }

    return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      description: data.description,
    };
  }
}

export { CrochetTypeRequestDto };
