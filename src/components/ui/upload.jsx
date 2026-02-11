"use client";

import React, { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { X, Upload as UploadIcon, Image as ImageIcon, Loader2, Eye } from "lucide-react";
import { toast } from "sonner";

// Generate unique ID for files
const generateUID = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Upload component
export const Upload = ({
  listType = "text",
  fileList = [],
  beforeUpload,
  onChange,
  action,
  multiple = false,
  showUploadList = { showPreviewIcon: true, showRemoveIcon: true },
  accept,
  maxCount,
  children,
  className,
  disabled,
  ...props
}) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleFileSelect = useCallback(
    async (event) => {
      const files = Array.from(event.target.files || []);
      if (!files.length) return;

      let filesToUpload = files;
      if (!multiple) {
        filesToUpload = [files[0]];
      }
      if (maxCount && fileList.length + filesToUpload.length > maxCount) {
        toast.error(`You can only upload up to ${maxCount} files.`);
        return;
      }

      const newFiles = filesToUpload.map((file) => {
        const uid = generateUID();
        return {
          uid,
          name: file.name,
          status: "uploading",
          originFileObj: file,
          size: file.size,
          type: file.type,
        };
      });

      // Call beforeUpload for each file
      const processedFiles = [];
      for (const file of newFiles) {
        if (beforeUpload) {
          const result = beforeUpload(file.originFileObj, [file, ...fileList]);
          if (result === false) {
            continue; // Skip this file
          }
          if (result && typeof result === "object" && result.then) {
            // Promise result
            try {
              const resolved = await result;
              if (resolved !== false) {
                processedFiles.push(file);
              }
            } catch {
              continue;
            }
          } else if (result !== false) {
            processedFiles.push(file);
          }
        } else {
          processedFiles.push(file);
        }
      }

      if (!processedFiles.length) return;

      // Update fileList with uploading status
      const updatedFileList = [...fileList, ...processedFiles];
      onChange?.({ file: processedFiles[0], fileList: updatedFileList });

      // Upload files if action is provided
      if (action) {
        for (const file of processedFiles) {
          uploadFile(file, action, (progress) => {
            setUploadProgress((prev) => ({ ...prev, [file.uid]: progress }));
          })
            .then((response) => {
              const updatedFile = {
                ...file,
                status: "done",
                url: response.url || response.data?.url || file.url,
                response: response,
              };
              const newFileList = updatedFileList.map((f) =>
                f.uid === file.uid ? updatedFile : f
              );
              onChange?.({ file: updatedFile, fileList: newFileList });
            })
            .catch((error) => {
              const errorFile = {
                ...file,
                status: "error",
                error,
              };
              const newFileList = updatedFileList.map((f) =>
                f.uid === file.uid ? errorFile : f
              );
              onChange?.({ file: errorFile, fileList: newFileList });
            });
        }
      } else {
        // No action, mark as done immediately
        const doneFiles = processedFiles.map((f) => ({ ...f, status: "done" }));
        const newFileList = updatedFileList.map((f) => {
          const doneFile = doneFiles.find((df) => df.uid === f.uid);
          return doneFile || f;
        });
        onChange?.({ file: doneFiles[0], fileList: newFileList });
      }

      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [fileList, beforeUpload, onChange, action, multiple, maxCount]
  );

  const uploadFile = async (file, uploadUrl, onProgress) => {
    const formData = new FormData();
    formData.append("file", file.originFileObj);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const percent = (e.loaded / e.total) * 100;
          onProgress?.(percent);
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch {
            resolve({ url: xhr.responseText || file.url });
          }
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      });

      xhr.addEventListener("error", () => {
        reject(new Error("Upload failed"));
      });

      xhr.open("POST", uploadUrl);
      xhr.send(formData);
    });
  };

  const handleRemove = (file) => {
    const newFileList = fileList.filter((f) => f.uid !== file.uid);
    onChange?.({ file, fileList: newFileList });
  };

  const handlePreview = (file) => {
    if (file.url) {
      window.open(file.url, "_blank");
    } else if (file.originFileObj) {
      const reader = new FileReader();
      reader.onload = (e) => {
        window.open(e.target.result, "_blank");
      };
      reader.readAsDataURL(file.originFileObj);
    }
  };

  const renderUploadButton = () => {
    if (listType === "picture-card") {
      const canUpload = !maxCount || fileList.length < maxCount;
      if (!canUpload) return null;

      return (
        <div
          className={cn(
            "relative w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-red-500 hover:bg-gray-50 transition-colors",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onClick={() => !disabled && fileInputRef.current?.click()}
        >
          {children || (
            <>
              <UploadIcon className="w-6 h-6 text-gray-400 mb-1" />
              <span className="text-xs text-gray-500">Upload</span>
            </>
          )}
        </div>
      );
    }

    return (
      <Button
        type="default"
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled}
        className="mb-2"
      >
        <UploadIcon className="w-4 h-4 mr-2" />
        Select File
      </Button>
    );
  };

  const renderFileList = () => {
    if (listType === "picture-card") {
      return (
        <div className="flex flex-wrap gap-4">
          {fileList.map((file) => (
            <div
              key={file.uid}
              className="relative w-24 h-24 border border-gray-200 rounded-lg overflow-hidden group"
            >
              {file.status === "uploading" ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                </div>
              ) : file.status === "error" ? (
                <div className="w-full h-full flex items-center justify-center bg-red-50">
                  <span className="text-xs text-red-600">Error</span>
                </div>
              ) : (
                <>
                  <img
                    src={
                      file.url ||
                      (file.originFileObj
                        ? URL.createObjectURL(file.originFileObj)
                        : "")
                    }
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    {showUploadList?.showPreviewIcon && (
                      <button
                        onClick={() => handlePreview(file)}
                        className="p-1.5 bg-white rounded text-gray-700 hover:bg-gray-100"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}
                    {showUploadList?.showRemoveIcon && (
                      <button
                        onClick={() => handleRemove(file)}
                        className="p-1.5 bg-white rounded text-red-600 hover:bg-red-50"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
          {renderUploadButton()}
        </div>
      );
    }

    if (listType === "picture") {
      return (
        <div className="space-y-2">
          {fileList.map((file) => (
            <div
              key={file.uid}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="w-12 h-12 flex-shrink-0">
                {file.status === "uploading" ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded">
                    <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                  </div>
                ) : file.status === "error" ? (
                  <div className="w-full h-full flex items-center justify-center bg-red-50 rounded">
                    <span className="text-xs text-red-600">Error</span>
                  </div>
                ) : (
                  <img
                    src={
                      file.url ||
                      (file.originFileObj
                        ? URL.createObjectURL(file.originFileObj)
                        : "")
                    }
                    alt={file.name}
                    className="w-full h-full object-cover rounded"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {file.name}
                </p>
                {file.status === "uploading" && uploadProgress[file.uid] && (
                  <p className="text-xs text-gray-500">
                    {Math.round(uploadProgress[file.uid])}%
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {showUploadList?.showPreviewIcon && (
                  <button
                    onClick={() => handlePreview(file)}
                    className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                )}
                {showUploadList?.showRemoveIcon && (
                  <button
                    onClick={() => handleRemove(file)}
                    className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
          {renderUploadButton()}
        </div>
      );
    }

    // text list type
    return (
      <div className="space-y-2">
        {fileList.map((file) => (
          <div
            key={file.uid}
            className="flex items-center gap-3 p-2 border border-gray-200 rounded hover:bg-gray-50"
          >
            <ImageIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 truncate">{file.name}</p>
              {file.status === "uploading" && uploadProgress[file.uid] && (
                <p className="text-xs text-gray-500">
                  {Math.round(uploadProgress[file.uid])}%
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {showUploadList?.showPreviewIcon && (
                <button
                  onClick={() => handlePreview(file)}
                  className="p-1 text-gray-600 hover:text-gray-900"
                >
                  <Eye className="w-4 h-4" />
                </button>
              )}
              {showUploadList?.showRemoveIcon && (
                <button
                  onClick={() => handleRemove(file)}
                  className="p-1 text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
        {renderUploadButton()}
      </div>
    );
  };

  return (
    <div className={cn("upload-wrapper", className)} {...props}>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        multiple={multiple}
        accept={accept}
        onChange={handleFileSelect}
        disabled={disabled}
      />
      {renderFileList()}
    </div>
  );
};

// Dragger subcomponent
Upload.Dragger = ({
  name,
  action,
  listType = "picture",
  maxCount,
  multiple = false,
  fileList = [],
  beforeUpload,
  onChange,
  showUploadList = { showPreviewIcon: true, showRemoveIcon: true },
  accept,
  children,
  className,
  disabled,
  ...props
}) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;

    const files = Array.from(e.dataTransfer.files || []);
    if (!files.length) return;

    await processFiles(files);
  };

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    await processFiles(files);
  };

  const processFiles = async (files) => {
    let filesToUpload = files;
    if (!multiple) {
      filesToUpload = [files[0]];
    }
    if (maxCount && fileList.length + filesToUpload.length > maxCount) {
      toast.error(`You can only upload up to ${maxCount} files.`);
      return;
    }

    const newFiles = filesToUpload.map((file) => {
      const uid = generateUID();
      return {
        uid,
        name: file.name,
        status: "uploading",
        originFileObj: file,
        size: file.size,
        type: file.type,
      };
    });

    const processedFiles = [];
    for (const file of newFiles) {
      if (beforeUpload) {
        const result = beforeUpload(file.originFileObj, [file, ...fileList]);
        if (result === false) continue;
        if (result && typeof result === "object" && result.then) {
          try {
            const resolved = await result;
            if (resolved !== false) {
              processedFiles.push(file);
            }
          } catch {
            continue;
          }
        } else if (result !== false) {
          processedFiles.push(file);
        }
      } else {
        processedFiles.push(file);
      }
    }

    if (!processedFiles.length) return;

    const updatedFileList = [...fileList, ...processedFiles];
    onChange?.({ file: processedFiles[0], fileList: updatedFileList });

    if (action) {
      for (const file of processedFiles) {
        uploadFile(file, action, (progress) => {
          setUploadProgress((prev) => ({ ...prev, [file.uid]: progress }));
        })
          .then((response) => {
            const updatedFile = {
              ...file,
              status: "done",
              url: response.url || response.data?.url || file.url,
              response: response,
            };
            const newFileList = updatedFileList.map((f) =>
              f.uid === file.uid ? updatedFile : f
            );
            onChange?.({ file: updatedFile, fileList: newFileList });
          })
          .catch((error) => {
            const errorFile = {
              ...file,
              status: "error",
              error,
            };
            const newFileList = updatedFileList.map((f) =>
              f.uid === file.uid ? errorFile : f
            );
            onChange?.({ file: errorFile, fileList: newFileList });
          });
      }
    } else {
      const doneFiles = processedFiles.map((f) => ({ ...f, status: "done" }));
      const newFileList = updatedFileList.map((f) => {
        const doneFile = doneFiles.find((df) => df.uid === f.uid);
        return doneFile || f;
      });
      onChange?.({ file: doneFiles[0], fileList: newFileList });
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadFile = async (file, uploadUrl, onProgress) => {
    const formData = new FormData();
    formData.append(name || "file", file.originFileObj);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const percent = (e.loaded / e.total) * 100;
          onProgress?.(percent);
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch {
            resolve({ url: xhr.responseText || file.url });
          }
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      });

      xhr.addEventListener("error", () => {
        reject(new Error("Upload failed"));
      });

      xhr.open("POST", uploadUrl);
      xhr.send(formData);
    });
  };

  const handleRemove = (file) => {
    const newFileList = fileList.filter((f) => f.uid !== file.uid);
    onChange?.({ file, fileList: newFileList });
  };

  const handlePreview = (file) => {
    if (file.url) {
      window.open(file.url, "_blank");
    } else if (file.originFileObj) {
      const reader = new FileReader();
      reader.onload = (e) => {
        window.open(e.target.result, "_blank");
      };
      reader.readAsDataURL(file.originFileObj);
    }
  };

  return (
    <div
      className={cn(
        "relative border-2 border-dashed rounded-lg p-8 text-center transition-colors",
        isDragging
          ? "border-red-500 bg-red-50"
          : "border-gray-300 bg-gray-50 hover:border-gray-400",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => !disabled && fileInputRef.current?.click()}
      {...props}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        multiple={multiple}
        accept={accept}
        onChange={handleFileSelect}
        disabled={disabled}
      />
      <div className="space-y-4">
        <UploadIcon className="w-12 h-12 mx-auto text-gray-400" />
        {children || (
          <div>
            <p className="text-sm font-medium text-gray-700">
              Click or drag file to this area to upload
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Support for single or bulk upload
            </p>
          </div>
        )}
      </div>
      {fileList.length > 0 && (
        <div className="mt-4 space-y-2">
          {fileList.map((file) => (
            <div
              key={file.uid}
              className="flex items-center gap-3 p-2 bg-white border border-gray-200 rounded text-left"
            >
              <div className="w-10 h-10 flex-shrink-0">
                {file.status === "uploading" ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded">
                    <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                  </div>
                ) : file.status === "error" ? (
                  <div className="w-full h-full flex items-center justify-center bg-red-50 rounded">
                    <span className="text-xs text-red-600">Error</span>
                  </div>
                ) : (
                  <img
                    src={
                      file.url ||
                      (file.originFileObj
                        ? URL.createObjectURL(file.originFileObj)
                        : "")
                    }
                    alt={file.name}
                    className="w-full h-full object-cover rounded"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 truncate">{file.name}</p>
                {file.status === "uploading" && uploadProgress[file.uid] && (
                  <p className="text-xs text-gray-500">
                    {Math.round(uploadProgress[file.uid])}%
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {showUploadList?.showPreviewIcon && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePreview(file);
                    }}
                    className="p-1 text-gray-600 hover:text-gray-900"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                )}
                {showUploadList?.showRemoveIcon && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(file);
                    }}
                    className="p-1 text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
