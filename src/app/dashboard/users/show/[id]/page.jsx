"use client";

import PageBreadCrumbs from "../../../../../components/page-breadcrumb/page-breadcrumb.component";
import { Show } from '@/components/refine';
import { useShow } from "@refinedev/core";
import { Descriptions, Image } from '@/components/ui';

export default function UserShow() {
  const { query } = useShow({});
  const { data, isLoading } = query;

  const record = data?.data;

  return (
    <>
      <PageBreadCrumbs items={["Users", "Lists", "Show"]} />
      <Show isLoading={isLoading}>
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
      </Show>
    </>
  );
}
