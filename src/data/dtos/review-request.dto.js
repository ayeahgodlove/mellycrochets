// src/presentation/dtos/review-request.dto.ts

import { nanoid } from "nanoid";
import { emptyReview } from "../models";

class ReviewRequestDto {
  constructor(data) {
    if (!data || typeof data !== "object") throw new Error("Invalid review data");

    this.userId = data.userId;
    this.crochetId = data.crochetId;
    this.comment = data.comment;
    this.rating = data.rating;
    this.username = data.username;
  }

  toData() {
    return {
      ...emptyReview,
      id: nanoid(10),
      userId: this.userId,
      crochetId: this.crochetId,
      comment: this.comment,
      rating: this.rating,
      toggle: false,
      username: this.username
    };
  }

  toUpdateData(data) {
    return { ...data };
  }
}

export { ReviewRequestDto };
