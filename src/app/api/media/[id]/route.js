import { MediaRequestDto } from "../../../../data/dtos/media-request.dto";
import { MediaRepository } from "../../../../data/repositories/media.repository";
import { displayValidationErrors, VALIDATION_OPTIONS } from "../../../../lib/displayValidationErrors";
import { validate } from "class-validator";
import { NextResponse } from "next/server";

const mediaRepository = new MediaRepository();

export async function PATCH(req, { params }) {
  const data = await req.json();
  const imageUrl = data.imageUrl[0].name;

  const dto = new MediaRequestDto(data.title, imageUrl);

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
  } else {
    try {
      const id = params.id;
      const obj = {
        ...emptyMedia,
        ...dto.toData(),
        id: id,
      };
      const updatedMedia = await mediaRepository.update(obj);

      return NextResponse.json(
        {
          data: updatedMedia,
          message: "Media Updated Successfully!",
          validationErrors: [],
          success: true,
        },
        { status: 200 }
      );
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
}

export async function GET(req, { params }) {
  try {
    const id = params.id;

    const media = await mediaRepository.findById(id);
    if (!media) {
      throw new NotFoundException("Media", id);
    }

    return NextResponse.json(media);
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

export async function DELETE(req, { params }) {
  try {
    const id = params.id;

    await mediaRepository.delete(id);

    return NextResponse.json({
      message: `Operation successfully completed!`,
      validationErrors: [],
      success: true,
      data: null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
        data: null,
        validationErrors: [error],
        success: true,
      },
      { status: 400 }
    );
  }
}
