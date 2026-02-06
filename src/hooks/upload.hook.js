import { message } from "@/components/ui";
import { useState } from "react";

export const useUpload = () => {
  const [fileList, setFileList] = useState < UploadFile < any > [] > [];
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileInfo, setFileInfo] = useState < any > null;

  const progress = {
    strokeColor: {
      "0%": "#108ee9",
      "100%": "#87d068",
    },
    strokeWidth: 3,
    format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
  };

  const onRemove = (file) => {
    setFileList((prevFileList) =>
      prevFileList.filter((item) => item.uid !== file.uid)
    );
  };
  const beforeUpload = (file) => {
    const maxSize = 2 * 1024 * 1024; // 2MB
    const fileSize = file.size;
    if (fileSize > maxSize) {
      message.error("File must be smaller than 2MB");
      return false;
    }
    setFileList((prevFileList) => [...prevFileList, file]);
    return true;
  };

  const onChangeUpload = (info) => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      if (info.fileList.length > 0) {
        const file = info.fileList[0];
        const { name, type, size } = file;
        setFileInfo({ name, type, size });
      } else {
        setFileInfo(null);
      }
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleCancel = () => setPreviewOpen(false);

  return {
    fileList,
    progress,
    onChangeUpload,
    beforeUpload,
    onRemove,
    handlePreview,
    previewImage,
    previewOpen,
    previewTitle,
    handleCancel,
    fileInfo,
  };
};
