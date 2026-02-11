"use client";

import PageBreadCrumbs from "../../../../components/page-breadcrumb/page-breadcrumb.component";
import { Create, useForm, useSelect } from "@/components/refine";
import { Col, Form, Input, Row, Select } from "@/components/ui";
import { PostImageUpload } from "../../../../components/shared/post-image-upload.component";
import { EditorComponent } from "../../../../components/editor/editor.component";

export default function BlogPostCreate() {
  const { formProps, saveButtonProps } = useForm({});

  const { query: categoryQuery } = useSelect({
    resource: "categories",
    optionLabel: "name",
    optionValue: "id",
  });
  const { query: tagQuery } = useSelect({
    resource: "tags",
    optionLabel: "name",
    optionValue: "id",
  });

  // Refine getList returns { data: array, total }; our APIs return the array directly, so data is the list
  const categories = categoryQuery?.data?.data ?? categoryQuery?.data ?? [];
  const tags = tagQuery?.data?.data ?? tagQuery?.data ?? [];
  const categoryOptions = Array.isArray(categories) ? categories.map((d) => ({ label: d.name, value: String(d.id) })) : [];
  const tagOptions = Array.isArray(tags) ? tags.map((d) => ({ label: d.name, value: d.id })) : [];

  return (
    <>
      <PageBreadCrumbs items={["Blog Posts", "Lists", "Create"]} />
      <Create saveButtonProps={saveButtonProps}>
        <Form {...formProps} layout="vertical">
          <Form.Item
            label={"Title"}
            name={["title"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            name="summary"
            label="Summary"
            style={{ marginBottom: 3 }}
            rules={[
              {
                required: true,
                message: "Summary is required",
              },
            ]}
          >
            <Input.TextArea size="large" />
          </Form.Item>

          <Form.Item label={"Content"} name="content">
            <EditorComponent
              initialValue={(formProps.form?.getFieldValue?.("content")) ?? ""}
              onChange={(value) =>
                formProps.form?.setFieldsValue?.({ content: value })
              }
            />
          </Form.Item>
          <Row gutter={[8, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                label={"Category"}
                name={"categoryId"}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  showSearch
                  filterOption={(input, opt) =>
                    (opt?.label ?? "").toString().toLowerCase().includes(input.toLowerCase())
                  }
                  options={categoryOptions}
                  placeholder="Select a related category"
                  size="large"
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label={"Status"}
                name={["status"]}
                initialValue={"draft"}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  options={[
                    { value: "draft", label: "Draft" },
                    { value: "published", label: "Published" },
                    { value: "archived", label: "Archived" },
                  ]}
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label={"Tags"}
            name={["tags"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              options={tagOptions}
              mode="multiple"
              placeholder="Select related tags"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="imageUrl"
            label="Image"
            rules={[{ required: true, message: "Image is required" }]}
            style={{ marginBottom: 10 }}
          >
            <PostImageUpload />
          </Form.Item>
        </Form>
      </Create>
    </>
  );
}
