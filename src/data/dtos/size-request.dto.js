// src/presentation/dtos/size-request.dto.ts

import { nanoid } from "nanoid";
import { emptySize } from "../models";

class SizeRequestDto {
  constructor(data) {
    if (!data || typeof data !== "object") throw new Error("Invalid size data");

    this.label = data.label;
  }

  toData() {
    return {
      ...emptySize,
      id: nanoid(10),
      label: this.label,
    };
  }

  toUpdateData(data) {
    return { ...data };
  }
}

export { SizeRequestDto };
