import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Steps,
  InputNumber,
  Select,
  Upload,
  message,
} from "@/components/ui";
import { Plus } from "lucide-react";
import { useCreate } from "@refinedev/core";
import { emptyCrochet } from "../../data/models";
import { BASE_URL } from "../../constants/api-url";
import { useRouter } from "next/navigation";

const { Step } = Steps;

export default function CrochetForm({ formProps, crochetTypes, selectProps }) {
  const { form } = formProps;
  const [current, setCurrent] = useState(0);
  const [fileList, setFileList] = useState([]);
  const { mutate } = useCreate({
    resource: "crochets",
  });
  const router = useRouter();

  const next = () => {
    form.validateFields().then(() => {
      setCurrent(current + 1);
    });
  };

  const prev = () => setCurrent(current - 1);

  const handleUploadChange = ({ file, fileList }) => {
    // Update the file list to include only valid statuses
    const filteredList = fileList.filter(
      (f) => f.status === "uploading" || f.status === "done"
    );

    if (file.status === "done") {
      message.success(`${file.name} uploaded successfully.`);

      const uploadedUrl = file.response?.url;
      if (uploadedUrl) {
        const updatedList = filteredList.map((f) => {
          if (f.uid === file.uid) {
            return {
              ...f,
              url: uploadedUrl,
              name: file.name,
              response: { url: uploadedUrl },
            };
          }
          return f;
        });

        setFileList(updatedList);
      }
    } else if (file.status === "error") {
      message.error(`${file.name} upload failed.`);
    }

    setFileList(filteredList);
  };

  const handleSubmit = async () => {
    try {
      const imageUrls = fileList.map((file) => file.name); // Or file.response.url if uploaded

      const payload = {
        ...emptyCrochet,
        name: form.getFieldValue("name"),
        description: form.getFieldValue("description"),
        crochetTypeId: form.getFieldValue("crochetTypeId"),
        priceInCfa: form.getFieldValue("priceInCfa"), // Default price
        priceInUsd: form.getFieldValue("priceInUsd"), // Default price
        imageUrls,
      };

      mutate(
        {
          values: payload,
        },
        {
          onSuccess: () => {
            router.push("/dashboard/crochets");
          },
          onError: () => {},
        }
      );
    } catch (error) {
      message.error("Please check the form for errors.");
    }
  };

  const steps = [
    {
      title: "Basic Info",
      content: (
        <>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label={"CrochetType"}
            name={"crochetTypeId"}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              showSearch
              //   onChange={selectProps.onChange}
              //   onSearch={selectProps.onSearch}
              //   filterOption={selectProps.filterOption}
              options={
                crochetTypes
                  ? crochetTypes.data.map((d) => {
                      return {
                        label: d.name,
                        value: d.id,
                      };
                    })
                  : []
              }
              placeholder="Select a related crochetType"
              size="large"
            />
          </Form.Item>
        </>
      ),
    },
    {
      title: "Pricing",
      content: (
        <>
          <Form.Item
            name="priceInCfa"
            label="Price (CFA)"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="priceInUsd"
            label="Price (USD)"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </>
      ),
    },
    {
      title: "Upload Images",
      content: (
        <Form.Item name="imageUrls" label="Upload Images">
          <Upload
            listType="picture-card"
            fileList={fileList}
            beforeUpload={() => true}
            onChange={handleUploadChange}
            action={`${BASE_URL}/uploads/crochets`}
            multiple
            showUploadList={{ showPreviewIcon: true }}
          >
            {fileList.length < 5 && (
              <div>
                <Plus size={16} />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      ),
    },
    {
      title: "Review & Submit",
      content: (
        <>
          <p>
            <strong>Name:</strong> {form.getFieldValue("name")}
          </p>
          <p>
            <strong>Description:</strong> {form.getFieldValue("description")}
          </p>
          <p>
            <strong>Type:</strong> {form.getFieldValue("crochetTypeId")}
          </p>
          <p>
            <strong>CFA:</strong> {form.getFieldValue("priceInCfa")}
          </p>
          <p>
            <strong>USD:</strong> {form.getFieldValue("priceInUsd")}
          </p>
          <p>
            <strong>Images:</strong> {fileList.map((f) => f.name).join(", ")}
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white">
      <Steps current={current} className="mb-6">
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>

      {steps[current].content}

      <div className="flex justify-between mt-6">
        {current > 0 && <Button onClick={prev}>Previous</Button>}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}
