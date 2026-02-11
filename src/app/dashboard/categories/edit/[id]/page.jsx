"use client";

import PageBreadCrumbs from "../../../../../components/page-breadcrumb/page-breadcrumb.component";
import { Edit, useForm } from '@/components/refine';
import { Card, Form, Input } from '@/components/ui';

export default function CategoryEdit() {
  const { formProps, saveButtonProps } = useForm({});

  return (
    <>
      <PageBreadCrumbs items={["Categories", "Lists", "Edit"]} />
      <Edit saveButtonProps={saveButtonProps}>
        <Card className="p-6 bg-white shadow-sm border-0">
          <Form {...formProps} layout="vertical">
            <Form.Item 
              label="Name" 
              name="name" 
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input placeholder="Enter category name" />
            </Form.Item>
          </Form>
        </Card>
      </Edit>
    </>
  );
}
