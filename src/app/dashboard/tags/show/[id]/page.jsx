"use client";

import PageBreadCrumbs from "../../../../../components/page-breadcrumb/page-breadcrumb.component";
import { Show } from '@/components/refine';
import { useShow } from "@refinedev/core";
import { Descriptions, Image } from '@/components/ui';

export default function TagShow() {
  const { query } = useShow({});
  const { data, isLoading } = query;

  const record = data?.data;

  return (
    <>
      <PageBreadCrumbs items={["Tags", "Lists", "Show"]} />
      <Show isLoading={isLoading}>
        <Descriptions bordered={false}>
          <Descriptions.Item label="Name">{record?.name}</Descriptions.Item>
        </Descriptions>
      </Show>
    </>
  );
}
