import { validate } from "class-validator";
import { NextResponse } from "next/server";
import { ContactRepository } from "../../../data/repositories/contact.repository";
import { ContactRequestDto } from "../../../data/dtos/contact-request.dto";
import { displayValidationErrors, VALIDATION_OPTIONS } from "../../../lib/displayValidationErrors";
import { notifyOwnerContact } from "../../../lib/notify.service";

const contactRepository = new ContactRepository();

export async function GET(request) {
  try {
    const contacts = await contactRepository.getAll();

    return NextResponse.json(contacts);
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

export async function POST(request) {
  try {
    const body = await request.json();
    const dto = new ContactRequestDto(body);
    const validationErrors = await validate(dto, VALIDATION_OPTIONS);

    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          validationErrors: displayValidationErrors(validationErrors),
          success: false,
          data: null,
          message: "Attention!",
        },
        { status: 400 }
      );
    }

    const contactResponse = await contactRepository.create({
      ...dto.toData(),
    });
    const contactData = contactResponse?.get ? contactResponse.get() : contactResponse;
    try {
      await notifyOwnerContact({
        name: body.name,
        email: body.email,
        phone: body.phone,
        message: body.message,
      });
    } catch (notifyErr) {
      console.error("Contact notify (email/WhatsApp) failed:", notifyErr);
    }
    return NextResponse.json(
      {
        data: contactResponse,
        message: "Message sent successfully!",
        validationErrors: [],
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        message: error.message,
        validationErrors: [],
        success: false,
      },
      { status: 400 }
    );
  }
}
