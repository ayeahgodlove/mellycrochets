"use client";

import PageBreadCrumbs from "../../../components/page-breadcrumb/page-breadcrumb.component";
import { getPostImageUrl } from "../../../constants/api-url";
import {
  // DateField,
  CreateButton,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@/components/refine";
import { useMany } from "@refinedev/core";
import { format } from "../../../lib/format";
import { Image, Space, Table, Tag } from "@/components/ui";

export default function BlogPostList() {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const categoryIds = tableProps?.dataSource
    ? [...new Set(
        tableProps.dataSource
          .map((item) => item?.categoryId ?? item?.category?.id)
          .filter(Boolean)
      )]
    : [];

  const tagIds = tableProps?.dataSource
    ? [...new Set(
        tableProps.dataSource.flatMap((item) =>
          (item?.tags ?? []).map((t) => (typeof t === "object" && t?.id != null ? t.id : t))
        ).filter(Boolean)
      )]
    : [];

  const { result: categoryResult, query: categoryQuery } = useMany({
    resource: "categories",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  const { result: tagsResult, query: tagsQuery } = useMany({
    resource: "tags",
    ids: tagIds,
    queryOptions: {
      enabled: tagIds.length > 0,
    },
  });

  const categoryList = categoryResult?.data ?? [];
  const tagsList = tagsResult?.data ?? [];
  const categoryIsLoading = categoryQuery?.isFetching ?? false;
  const tagsIsLoading = tagsQuery?.isFetching ?? false;

  return (
    <>
      <PageBreadCrumbs items={["Blog Posts", "Lists"]} />
      <div className="mb-4 flex justify-end">
        <CreateButton />
      </div>
      <List>
        <Table {...tableProps} rowKey="id">
          <Table.Column
            dataIndex="id"
            title={"ID"}
            render={(value, record, index) =>
              format.twoChar((index + 1).toString())
            }
          />
          <Table.Column dataIndex="title" title={"Title"} ellipsis />
          <Table.Column
            dataIndex="imageUrl"
            title={"Image"}
            render={(value, record) => (
              <Image
                src={getPostImageUrl(record?.imageUrl)}
                alt={record?.title}
                width={80}
              />
            )}
          />
          <Table.Column
            dataIndex={"categoryId"}
            title={"Category"}
            render={(value, record) => {
              if (categoryIsLoading) return <>Loading...</>;
              const name =
                record?.category?.name ??
                categoryList.find((c) => String(c.id) === String(value))?.name;
              return name ?? value ?? "-";
            }}
          />
          <Table.Column
            dataIndex="tags"
            title={"Tags"}
            render={(value) => {
              if (tagsIsLoading) return <>Loading...</>;
              const list = Array.isArray(value) ? value : [];
              if (list.length === 0) return "-";

              return (
                <Space size={[0, 8]} wrap>
                  {list.map((tag) => {
                    const tagId = typeof tag === "object" && tag?.id != null ? tag.id : tag;
                    const name =
                      (typeof tag === "object" && tag?.name != null)
                        ? tag.name
                        : tagsList.find((t) => String(t.id) === String(tagId))?.name;
                    return (
                      <Tag size="small" key={tagId} color={"red"}>
                        {name ?? tagId}
                      </Tag>
                    );
                  })}
                </Space>
              );
            }}
          />
          <Table.Column dataIndex="status" title={"Status"} />
          {/* <Table.Column
            dataIndex={["createdAt"]}
            title={"Created at"}
            render={(value) => <DateField value={value} />}
          /> */}
          <Table.Column
            title={"Actions"}
            dataIndex="actions"
            render={(_, record) => (
              <Space>
                <EditButton hideText size="small" recordItemId={record.id} />
                <ShowButton hideText size="small" recordItemId={record.id} />
                <DeleteButton hideText size="small" recordItemId={record.id} />
              </Space>
            )}
          />
        </Table>
      </List>
    </>
  );
}
