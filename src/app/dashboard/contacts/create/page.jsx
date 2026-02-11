"use client";

import PageBreadCrumbs from "../../../../components/page-breadcrumb/page-breadcrumb.component";
import { Create, useForm } from '@/components/refine';
import { Card, Form, Input } from '@/components/ui';

export default function ContactCreate() {
  const { formProps, saveButtonProps } = useForm({});
  
  return (
    <>
      <PageBreadCrumbs items={["Contacts", "Lists", "Create"]} />
      <Create saveButtonProps={saveButtonProps}>
        <Card className="p-6 bg-white shadow-sm border-0">
          <Form {...formProps} layout="vertical">
            <Form.Item 
              label="Name" 
              name="name" 
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input placeholder="Enter contact name" />
            </Form.Item>
            
            <Form.Item 
              label="Email" 
              name="email" 
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Please enter a valid email address" }
              ]}
            >
              <Input type="email" placeholder="Enter email address" />
            </Form.Item>
            
            <Form.Item 
              label="Message" 
              name="message" 
              rules={[{ required: true, message: "Message is required" }]}
            >
              <Input.TextArea 
                rows={6} 
                placeholder="Enter message"
                maxLength={1000}
              />
            </Form.Item>
          </Form>
        </Card>
      </Create>
    </>
  );
}
