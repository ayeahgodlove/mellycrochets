"use client";

import PageBreadCrumbs from "../../../../../components/page-breadcrumb/page-breadcrumb.component";
import { EditButton, Show } from '@/components/refine';
import { useShow } from "@refinedev/core";
import { Card, Descriptions, Image, Space } from '@/components/ui';

export default function UserShow() {
  const { query } = useShow({});
  const { data, isLoading } = query;

  const record = data?.data;

  return (
    <>
      <PageBreadCrumbs items={["Users", "Lists", "Show"]} />
      <div className="mb-4 flex justify-end">
        <Space>
          <EditButton recordItemId={record?.id} />
        </Space>
      </div>
      <Show isLoading={isLoading}>
        <Card className="p-6 bg-white shadow-sm border-0">
          <Descriptions bordered={false}>
          <Descriptions.Item label="Email">{record?.email}</Descriptions.Item>
          <Descriptions.Item label="Username">
            {record?.username}
          </Descriptions.Item>
          <Descriptions.Item label="Provider">{record?.provider}</Descriptions.Item>
          <Descriptions.Item label="Role">
            {record?.role}
          </Descriptions.Item>
          <Descriptions.Item label="Verified">
            {record?.verified ? "Yes" : "No"}
          </Descriptions.Item>
          <Descriptions.Item label="Image">
            {record?.image && record.image.trim() !== "" ? (
              <Image src={record.image} alt="User" width={100} />
            ) : (
              <span className="text-muted-foreground">No image</span>
            )}
          </Descriptions.Item>
          </Descriptions>
        </Card>
      </Show>
    </>
  );
}
