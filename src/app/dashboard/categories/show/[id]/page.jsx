"use client";

import PageBreadCrumbs from "../../../../../components/page-breadcrumb/page-breadcrumb.component";
import { EditButton, Show } from '@/components/refine';
import { useShow } from "@refinedev/core";
import { Card, Descriptions, Space } from '@/components/ui';

export default function CategoryShow() {
  const { query } = useShow({});
  const { data, isLoading } = query;

  const record = data?.data;

  return (
    <>
      <PageBreadCrumbs items={["Categories", "Lists", "Show"]} />
      <div className="mb-4 flex justify-end">
        <Space>
          <EditButton recordItemId={record?.id} />
        </Space>
      </div>
      <Show isLoading={isLoading}>
        <Card className="p-6 bg-white shadow-sm border-0">
          <Descriptions bordered={false}>
            <Descriptions.Item label="Name">{record?.name}</Descriptions.Item>
          </Descriptions>
        </Card>
      </Show>
    </>
  );
}
