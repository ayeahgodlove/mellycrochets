"use client";

import { useEffect } from "react";
import PageBreadCrumbs from "../../../../../components/page-breadcrumb/page-breadcrumb.component";
import { Edit, useForm, useSelect } from '@/components/refine';
import { Col, Form, Input, Row, Select } from '@/components/ui';
import { PostImageUpload } from "../../../../../components/shared/post-image-upload.component";
import { EditorComponent } from "../../../../../components/editor/editor.component";

export default function BlogPostEdit() {
  const { formProps, saveButtonProps, query } = useForm({});

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

  const record = query?.data?.data ?? query?.data;

  useEffect(() => {
    if (!record || !formProps?.form?.setFieldsValue) return;
    const updates = {};
    const categoryId = record.categoryId ?? record.category?.id;
    if (categoryId != null) {
      updates.categoryId = String(categoryId);
    }
    if (record.imageUrl != null && record.imageUrl !== "") {
      updates.imageUrl = record.imageUrl.includes("/") ? record.imageUrl.replace(/^.*\//, "") : record.imageUrl;
    }
    const tagsRaw = record.tags;
    if (Array.isArray(tagsRaw) && tagsRaw.length > 0 && typeof tagsRaw[0] === "object" && tagsRaw[0]?.id != null) {
      updates.tags = tagsRaw.map((t) => t.id);
    }
    if (Object.keys(updates).length > 0) {
      formProps.form.setFieldsValue(updates);
    }
  }, [record, formProps?.form]);

  return (
    <>
      <PageBreadCrumbs items={["Blog Posts", "Lists", "Edit"]} />
      <Edit saveButtonProps={saveButtonProps}>
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
      </Edit>
    </>
  );
}
