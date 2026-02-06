"use client";

import { format } from "../../../lib/format";
import PageBreadCrumbs from "../../../components/page-breadcrumb/page-breadcrumb.component";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@/components/refine";
import { Space, Table } from "@/components/ui";
import { useMany } from "@refinedev/core";

export default function CrochetList() {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const { data: crochetTypeData, isLoading: crochetTypeIsLoading } = useMany({
    resource: "crochet_types",
    ids:
      tableProps?.dataSource
        ?.map((item) => item?.crochetType?.id)
        .filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  return (
    <>
      <PageBreadCrumbs items={["Crochets", "Lists"]} />
      <List>
        <Table {...tableProps} rowKey="id">
          <Table.Column
            dataIndex="id"
            title={"ID"}
            render={(value, record, index) => format.number(index + 1)}
            align="right"
          />
          <Table.Column title="Name" dataIndex="name" />
          <Table.Column
            dataIndex={"crochetTypeId"}
            title={"CrochetType"}
            render={(value) =>
              crochetTypeIsLoading ? (
                <>Loading...</>
              ) : crochetTypeData ? (
                crochetTypeData.data.find((item) => item.id === value)?.name
              ) : (
                "Not found"
              )
            }
          />
          <Table.Column
            title="Price In CFA"
            dataIndex="priceInCfa"
            render={(value) => format.number(value)}
            align="right"
          />
          <Table.Column
            title="Price In USD"
            dataIndex="priceInUsd"
            render={(value) => format.number(value)}
            align="right"
          />
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
