"use client";

import { format } from "../../../lib/format";
import PageBreadCrumbs from "../../../components/page-breadcrumb/page-breadcrumb.component";
import { DeleteButton, EditButton, List, ShowButton, useTable } from "@refinedev/antd";
import { Space, Table } from "antd";

export default function TagList() {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <>
      <PageBreadCrumbs items={["Tags", "Lists"]} />
      <List>
        <Table {...tableProps} rowKey="id">
          <Table.Column
            dataIndex="id"
            title={"ID"}
            render={(value, record, index) => format.number(index + 1)}
          />
          <Table.Column title="Name" dataIndex="name" />
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
