"use client";

import PageBreadCrumbs from "../../../../../components/page-breadcrumb/page-breadcrumb.component";
import { getPostImageUrl } from "../../../../../constants/api-url";
import { DateField, EditButton, ImageField, Show, TextField } from "@/components/refine";
import { useOne, useShow } from "@refinedev/core";
import { Card, Space, Tag, Typography } from '@/components/ui';

const { Title } = Typography;

export default function BlogPostShow() {
  const { query } = useShow({});
  const data = query?.data;
  const isLoading = query?.isFetching ?? false;
  const record = data?.data ?? data;

  const categoryId = record?.categoryId ?? record?.category?.id;
  const { result: categoryResult, query: categoryQuery } = useOne({
    resource: "categories",
    id: categoryId ?? "",
    queryOptions: {
      enabled: !!record && !!categoryId,
    },
  });
  const categoryName = record?.category?.name ?? categoryResult?.name;
  const categoryIsLoading = categoryQuery?.isFetching ?? false;

  const getTag = (value) => {
    const list = Array.isArray(value) ? value : [];
    if (list.length === 0) return "-";

    return (
      <Space size={[0, 8]} wrap>
        {list.map((tag) => {
          const tagId = typeof tag === "object" && tag?.id != null ? tag.id : tag;
          const name = typeof tag === "object" && tag?.name != null ? tag.name : tagId;
          return (
            <Tag size="small" key={tagId} color={"red"}>
              {name}
            </Tag>
          );
        })}
      </Space>
    );
  };

  return (
    <>
      <PageBreadCrumbs items={["Blog Posts", "Lists", "Details"]} />
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
            <Title level={5}>{"Summary"}</Title>
            <TextField value={record?.summary} />
          </div>
          <div>
            <Title level={5}>{"Content"}</Title>
            <TextField value={record?.content} />
          </div>
          <div>
            <Title level={5}>{"Category"}</Title>
            <TextField
              value={categoryIsLoading ? "Loading..." : (categoryName ?? "-")}
            />
          </div>
          <div>
            <Title level={5}>{"Tags"}</Title>
            <TextField value={getTag(record?.tags)} />
          </div>
          <div>
            <Title level={5}>{"Status"}</Title>
            <TextField value={record?.status} />
          </div>
          <div>
            <Title level={5}>{"CreatedAt"}</Title>
            <DateField value={record?.createdAt} />
          </div>
          <div>
            <ImageField
              imageTitle={record?.title}
              value={getPostImageUrl(record?.imageUrl)}
            />
          </div>
        </Card>
      </Show>
    </>
  );
}
