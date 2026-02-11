import { validate } from "class-validator";
import { NextResponse } from "next/server";
import { SubscriberRepository } from "../../../data/repositories/subscriber.repository";
import { SubscriberRequestDto } from "../../../data/dtos/subscriber-request.dto";
import { displayValidationErrors, VALIDATION_OPTIONS } from "../../../lib/displayValidationErrors";

const subscriberRepository = new SubscriberRepository();

export async function GET(request) {
  try {
    const subscribers = await subscriberRepository.getAll();

    return NextResponse.json(subscribers);
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
    const dto = new SubscriberRequestDto(body);
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

    const existingEmail = await subscriberRepository.findByEmail(body.email);
    if (existingEmail) {
      return NextResponse.json(
        {
          message: "Emailed already subscribed!",
          success: false,
          data: null,
        },
        { status: 400 }
      );
    }

    const subscriberResponse = await subscriberRepository.create({
      ...dto.toData(),
    });
    return NextResponse.json(
      {
        data: subscriberResponse,
        message: "Email subscribed Successfully!",
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
