"use client";

import React from "react";
import { BASE_URL, API_URL_UPLOADS_POSTS } from "../../constants/api-url";
import { Button, Upload } from "@/components/ui";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { processImageBeforeUpload } from "../../lib/image-upload-processor";

/** Normalize stored value to a display URL (full path). Store only filename in DB. */
function toDisplayUrl(value) {
  if (!value || typeof value !== "string") return null;
  if (value.startsWith("/") || value.startsWith("http")) return value;
  return `${API_URL_UPLOADS_POSTS}/${value}`;
}

/**
 * Form field for post image: shows current image with remove, and upload to replace/add.
 * Form.Item passes value (imageUrl string — filename only) and onChange. On upload success we call onChange(filename only).
 */
export function PostImageUpload({ value, onChange, disabled, className }) {
  const displayUrl = toDisplayUrl(value);

  const handleUploadChange = (e) => {
    const file = e?.file;
    if (file?.status === "done") {
      const res = file.response;
      const filename = res?.filename ?? (typeof res?.url === "string" ? res.url.replace(/^.*\//, "") : null) ?? (typeof res?.data === "string" ? res.data.replace(/^.*\//, "") : null);
      if (filename) onChange?.(filename);
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      {displayUrl && (
        <div className="relative inline-block rounded-lg border border-gray-200 bg-gray-50 p-2">
          <img
            src={displayUrl}
            alt="Post"
            className="max-h-48 rounded object-contain"
          />
          {!disabled && (
            <Button
              type="button"
              size="small"
              onClick={() => onChange?.("")}
              className="absolute right-2 top-2 gap-1.5 bg-red-600 text-white hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4" />
              Remove
            </Button>
          )}
        </div>
      )}
      {!disabled && (
        <Upload.Dragger
          name="file"
          action={`${BASE_URL}/uploads`}
          listType="picture"
          maxCount={1}
          multiple={false}
          fileList={[]}
          beforeUpload={processImageBeforeUpload}
          onChange={handleUploadChange}
        >
          <p className="text-sm text-gray-600">
            {displayUrl ? "Drag & drop a new image to replace" : "Drag & drop an image here, or click to select"}
          </p>
        </Upload.Dragger>
      )}
    </div>
  );
}
