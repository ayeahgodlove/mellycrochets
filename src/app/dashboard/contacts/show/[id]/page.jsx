"use client";

import PageBreadCrumbs from "../../../../../components/page-breadcrumb/page-breadcrumb.component";
import { EditButton, Show } from '@/components/refine';
import { useShow } from "@refinedev/core";
import { Card, Descriptions, Space } from '@/components/ui';
import { format } from "../../../../../lib/format";

export default function ContactShow() {
  const { query } = useShow({});
  const { data, isLoading } = query;

  const record = data?.data;

  return (
    <>
      <PageBreadCrumbs items={["Contacts", "Lists", "Show"]} />
      <div className="mb-4 flex justify-end">
        <Space>
          <EditButton recordItemId={record?.id} />
        </Space>
      </div>
      <Show isLoading={isLoading}>
        <Card className="p-6 bg-white shadow-sm border-0">
          <Descriptions bordered={false}>
          <Descriptions.Item label="Name">{record?.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{record?.email}</Descriptions.Item>
          <Descriptions.Item label="Message">
            <div className="whitespace-pre-wrap">{record?.message}</div>
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {record?.createdAt ? format.date(record.createdAt) : "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {record?.updatedAt ? format.date(record.updatedAt) : "-"}
          </Descriptions.Item>
          </Descriptions>
        </Card>
      </Show>
    </>
  );
}
