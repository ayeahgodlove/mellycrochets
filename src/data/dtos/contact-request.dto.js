// src/presentation/dtos/contact-request.dto.ts

import { nanoid } from "nanoid";
import { emptyContact } from "../models";

class ContactRequestDto {
  constructor(data) {
    if (!data || typeof data !== "object") {
      throw new Error("Invalid contact data");
    }
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone != null ? String(data.phone).trim() : "";
    this.message = data.message;
  }

  toData() {
    return {
      ...emptyContact,
      id: nanoid(20),
      name: this.name,
      email: this.email,
      phone: this.phone || "",
      message: this.message,
    };
  }

  toUpdateData(data) {
    if (!data.id || typeof data.id !== "string") {
      throw new Error("Valid ID is required for update.");
    }
    return { ...data };
  }
}

export { ContactRequestDto };
