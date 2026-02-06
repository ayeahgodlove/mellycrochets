"use client";

import { API_URL_UPLOADS_MEDIA } from "../../../../../constants/api-url";
import { ImageField, Show, TextField } from '@/components/refine';
import { useShow } from "@refinedev/core";
import { Typography } from '@/components/ui';
import PageBreadCrumbs from "../../../../../components/page-breadcrumb/page-breadcrumb.component";

const { Title } = Typography;

export default function MediaShow() {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <>
      <PageBreadCrumbs items={["Media", "Lists", "Details"]} />
      <Show isLoading={isLoading}>
        <Title level={5}>{"ID"}</Title>
        <TextField value={record?.id ?? ""} />
        <Title level={5}>{"Title"}</Title>
        <TextField value={record?.title} />
        <Title level={5}>{"Image"}</Title>
        <ImageField
          imageTitle={record?.title}
          value={`${API_URL_UPLOADS_MEDIA}/${record?.imageUrl}`}
        />
      </Show>
    </>
  );
}
