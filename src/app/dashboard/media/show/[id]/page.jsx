"use client";

import { API_URL_UPLOADS_MEDIA, API_URL_UPLOADS_POSTS } from "../../../../../constants/api-url";
import { EditButton, ImageField, Show, TextField } from '@/components/refine';
import { useShow } from "@refinedev/core";
import { Card, Space, Typography } from '@/components/ui';
import PageBreadCrumbs from "../../../../../components/page-breadcrumb/page-breadcrumb.component";

const { Title } = Typography;

export default function MediaShow() {
  const showResult = useShow({});
  const queryResult = showResult?.queryResult ?? showResult?.query;
  const { data, isLoading } = queryResult ?? {};
  const record = data?.data;

  return (
    <>
      <PageBreadCrumbs items={["Media", "Lists", "Details"]} />
      <div className="mb-4 flex justify-end">
        <Space>
          <EditButton recordItemId={record?.id} />
        </Space>
      </div>
      <Show isLoading={isLoading}>
        <Card className="p-6 bg-white shadow-sm border-0 space-y-4">
          <div>
            <Title level={5}>{"ID"}</Title>
            <TextField value={record?.id ?? ""} />
          </div>
          <div>
            <Title level={5}>{"Title"}</Title>
            <TextField value={record?.title} />
          </div>
          <div>
            <Title level={5}>{"Image"}</Title>
            <ImageField
              imageTitle={record?.title}
              value={`${API_URL_UPLOADS_POSTS}/${record?.imageUrl}`}
            />
          </div>
        </Card>
      </Show>
    </>
  );
}
