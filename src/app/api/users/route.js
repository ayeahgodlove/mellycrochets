import { validate } from "class-validator";
import { NextResponse } from "next/server";
import { UserRepository } from "../../../data/repositories/user.repository";
import { UserRequestDto } from "../../../data/dtos/user-request.dto";
import { displayValidationErrors, VALIDATION_OPTIONS } from "../../../lib/displayValidationErrors";
const userRepository = new UserRepository();

export async function GET(request) {
  try {
    const users = await userRepository.getAll();

    return NextResponse.json(users);
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
    const dto = new UserRequestDto(body);
    const validationErrors = await validate(dto, VALIDATION_OPTIONS);
    const userObj = await dto.toData();

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

    const userResponse = await userRepository.create({
      ...userObj,
    });
    return NextResponse.json(
      {
        data: userResponse,
        message: "user created Successfully!",
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
      { status: 500 }
    );
  }
}
