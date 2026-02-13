/**
 * Processes image files before upload: converts HEIC and other non-web formats to JPEG,
 * and compresses images for web. Use as beforeUpload in Upload components.
 */

const WEB_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
const HEIC_TYPES = ["image/heic", "image/heif"];
const HEIC_EXT = /\.(heic|heif|HEIC|HEIF)$/i;

function isImageFile(file) {
  if (!file || typeof file !== "object") return false;
  const type = file.type || "";
  const name = file.name || "";
  return type.startsWith("image/") || /\.(jpe?g|png|webp|gif|heic|heif)$/i.test(name);
}

function isHeic(file) {
  const type = (file?.type || "").toLowerCase();
  const name = (file?.name || "").toLowerCase();
  return HEIC_TYPES.some((t) => type.includes(t)) || HEIC_EXT.test(name);
}

function baseName(name) {
  if (!name || typeof name !== "string") return "image";
  return name.replace(/\.[^.]+$/, "") || "image";
}

/**
 * Compress image via canvas to JPEG with max compression (quality 0.6).
 * @param {File|Blob} file
 * @returns {Promise<File>}
 */
function compressToJpeg(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const maxWidth = 1920;
      const maxHeight = 1920;
      let { width, height } = img;
      if (width > maxWidth || height > maxHeight) {
        const r = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * r);
        height = Math.round(height * r);
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Canvas toBlob failed"));
            return;
          }
          const name = file.name ? baseName(file.name) + ".jpg" : "image.jpg";
          resolve(new File([blob], name, { type: "image/jpeg" }));
        },
        "image/jpeg",
        0.6
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
}

/**
 * Convert HEIC/HEIF to JPEG using heic2any (dynamic import so it only loads when needed).
 * @param {File} file
 * @returns {Promise<Blob>}
 */
async function heicToJpeg(file) {
  const heic2any = (await import("heic2any")).default;
  const result = await heic2any({
    blob: file,
    toType: "image/jpeg",
  });
  const blob = Array.isArray(result) ? result[0] : result;
  return blob;
}

/**
 * Process a single image file: convert HEIC to JPEG, then compress to JPEG for web.
 * Non-HEIC images are compressed and converted to JPEG as well for consistency.
 * @param {File} file - Original file from input
 * @returns {Promise<File>} - Processed file (JPEG, compressed)
 */
export async function processImageForUpload(file) {
  if (!file || !isImageFile(file)) return file;

  let blob = file;

  if (isHeic(file)) {
    try {
      blob = await heicToJpeg(file);
    } catch (e) {
      console.warn("HEIC conversion failed, uploading original:", e);
      return file;
    }
  }

  const isAlreadyJpeg =
    blob.type === "image/jpeg" &&
    blob.size < 400000 &&
    !isHeic(file);
  if (isAlreadyJpeg && blob instanceof File) return blob;

  try {
    return await compressToJpeg(blob instanceof File ? blob : new File([blob], file.name || "image.jpg", { type: blob.type }));
  } catch (e) {
    console.warn("Compression failed, using as-is:", e);
    return blob instanceof File ? blob : new File([blob], baseName(file.name) + ".jpg", { type: "image/jpeg" });
  }
}

/**
 * Use as beforeUpload in Upload components. Processes image then returns the new File
 * so the upload sends the compressed JPEG.
 * @param {File} file
 * @param {Array} fileList
 * @returns {Promise<File>}
 */
export function processImageBeforeUpload(file, fileList) {
  if (!isImageFile(file)) return file;
  return processImageForUpload(file);
}

export { isImageFile };
