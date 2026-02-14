"use client";

import { format } from "../../../lib/format";
import PageBreadCrumbs from "../../../components/page-breadcrumb/page-breadcrumb.component";
import { CreateButton, DeleteButton, EditButton, List, ShowButton, useTable } from "@/components/refine";
import { Space, Table } from "@/components/ui";

export default function ContactList() {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <>
      <PageBreadCrumbs items={["Contacts", "Lists"]} />
      <div className="mb-4 flex justify-end">
        <CreateButton />
      </div>
      <List>
        <Table {...tableProps} rowKey="id">
          <Table.Column
            dataIndex="id"
            title={"ID"}
            render={(value, record, index) => format.number(index + 1)}
          />
          <Table.Column title="Name" dataIndex="name" />
          <Table.Column title="Email" dataIndex="email" />
          <Table.Column title="Phone" dataIndex="phone" />
          <Table.Column
            title="Message"
            dataIndex="message"
            render={(value) => (
              <span className="truncate max-w-xs block">
                {value?.length > 50 ? `${value.substring(0, 50)}...` : value}
              </span>
            )}
          />
          <Table.Column
            title="Created At"
            dataIndex="createdAt"
            render={(value) => (value ? format.date(value) : "-")}
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
