"use client";

import PageBreadCrumbs from "../../../components/page-breadcrumb/page-breadcrumb.component";
import { API_URL_UPLOADS_POSTS } from "../../../constants/api-url";
import {
  // DateField,
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

  const { data: categoryData, isLoading: categoryIsLoading } = useMany({
    resource: "categories",
    ids:
      tableProps?.dataSource
        ?.map((item) => item?.category?.id)
        .filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  const { data: tagsData, isLoading: tagsIsLoading } = useMany({
    resource: "tags",
    ids:
      tableProps?.dataSource
        ?.flatMap((item) => item?.tags?.map((tag) => tag.id))
        .filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  return (
    <>
      <PageBreadCrumbs items={["Blog Posts", "Lists"]} />
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
                src={`${API_URL_UPLOADS_POSTS}/${record.imageUrl}`}
                alt={record?.title}
                width={80}
              />
            )}
          />
          <Table.Column
            dataIndex={"categoryId"}
            title={"Category"}
            render={(value) =>
              categoryIsLoading ? (
                <>Loading...</>
              ) : categoryData ? (
                categoryData.data.find((item) => item.id === value)?.name
              ) : (
                "Not found"
              )
            }
          />
          <Table.Column
            dataIndex="tags"
            title={"Tags"}
            render={(value) => {
              if (tagsIsLoading) return <>Loading...</>;
              if (!value || !tagsData) return "-";

              return (
                <Space size={[0, 8]} wrap>
                  {value.map((tag) => {
                    const tagInfo = tagsData.data.find((t) => t.id === tag.id);
                    return (
                      <Tag size="small" key={tag.id} color={"red"}>
                        {tagInfo?.name || tag.id}
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
