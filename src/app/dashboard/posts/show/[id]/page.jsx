"use client";

import PageBreadCrumbs from "../../../../../components/page-breadcrumb/page-breadcrumb.component";
import { API_URL_UPLOADS_POSTS } from "../../../../../constants/api-url";
import {
  DateField,
  ImageField,
  MarkdownField,
  Show,
  TextField,
} from "@refinedev/antd";
import { useOne, useShow } from "@refinedev/core";
import { Space, Tag, Typography } from "antd";

const { Title } = Typography;

export default function BlogPostShow() {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: categoryData, isLoading: categoryIsLoading } = useOne({
    resource: "categories",
    id: record?.category?.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  const { data: tagData, isLoading: tagIsLoading } = useOne({
    resource: "tags",
    id: record?.tag?.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  const getTag = (value) => {
    if (tagIsLoading) return <>Loading...</>;
    if (!value || !tagData) return "-";

    return (
      <Space size={[0, 8]} wrap>
        {value.map((tag) => {
          const tagInfo = tagData.data.find((t) => t.id === tag.id);
          return (
            <Tag size="small" key={tag.id} color={"red"}>
              {tagInfo?.name || tag.id}
            </Tag>
          );
        })}
      </Space>
    );
  };

  return (
    <>
      <PageBreadCrumbs items={["Blog Posts", "Lists", "Details"]} />
      <Show isLoading={isLoading} >
        <Title level={5}>{"ID"}</Title>
        <TextField value={record?.id ?? ""} />
        <Title level={5}>{"Title"}</Title>
        <TextField value={record?.title} />
        <Title level={5}>{"Summary"}</Title>
        <MarkdownField value={record?.summary} />
        <Title level={5}>{"Content"}</Title>
        <MarkdownField value={record?.content} />
        {/* <div
          style={{ padding: 10, background: "#f2f2f2" }}
          dangerouslySetInnerHTML={{
            __html: record?.content,
          }}
        /> */}
        <Title level={5}>{"Category"}</Title>
        <TextField
          value={
            categoryIsLoading ? (
              <>Loading...</>
            ) : (
              <>{categoryData?.data?.name}</>
            )
          }
        />

        <Title level={5}>{"Tags"}</Title>
        <TextField value={getTag(record?.tags)} />
        <Title level={5}>{"Status"}</Title>
        <TextField value={record?.status} />
        <Title level={5}>{"CreatedAt"}</Title>
        <DateField value={record?.createdAt} />
        <ImageField
          imageTitle={record?.title}
          value={`${API_URL_UPLOADS_POSTS}/${record?.imageUrl}`}
        />
      </Show>
    </>
  );
}
