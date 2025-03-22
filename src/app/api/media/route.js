import { MediaRepository } from "../../../data/repositories/media.repository";
import { validate } from "class-validator";
import { NextResponse } from "next/server";
import { MediaRequestDto } from "../../../data/dtos/media-request.dto";

const mediaRepository = new MediaRepository();

export async function GET(requestd) {
  try {
    const medias = await mediaRepository.getAll();

    return NextResponse.json(medias);
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
  const data = await request.json();
  const imageUrl = data.imageUrl[0].name;
  const dto = new MediaRequestDto({
    title: data.title,
    carId: data.carId,
    imageUrl,
  });

  const validationErrors = await validate(dto);
  if (validationErrors.length > 0) {
    return NextResponse.json(
      {
        validationErrors,
        success: false,
        data: null,
        message: "Title or file missing!",
      },
      { status: 400 }
    );
  }

  try {
    const mediaResponse = await mediaRepository.createMedia(dto.toData());

    return NextResponse.json(
      {
        data: mediaResponse,
        message: "media created Successfully!",
        validationErrors: [],
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("error: ", error);
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
