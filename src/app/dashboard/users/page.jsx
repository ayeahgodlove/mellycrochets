"use client";

import { format } from "../../../lib/format";
import PageBreadCrumbs from "../../../components/page-breadcrumb/page-breadcrumb.component";
import {
  List,
  ShowButton,
  useTable,
} from '@/components/refine';
import { Image, Space, Table } from '@/components/ui';

export default function UserList() {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <>
      <PageBreadCrumbs items={["Users", "Lists"]} />
      <List>
        <Table {...tableProps} rowKey="id">
          <Table.Column
            dataIndex="id"
            title={"ID"}
            render={(value, record, index) => format.number(index + 1)}
          />
          <Table.Column title="Email" dataIndex="email" />
          <Table.Column title="Username" dataIndex="username" />
          <Table.Column title="Provider" dataIndex="provider" />
          <Table.Column title="Role" dataIndex="role" />
          <Table.Column
            title="Image"
            dataIndex="image"
            render={(value) => {
              if (!value || value.trim() === "") {
                return <span className="text-muted-foreground text-sm">-</span>;
              }
              return <Image src={value} alt="User" preview={false} width={30} />;
            }}
          />
          <Table.Column
            title={"Actions"}
            dataIndex="actions"
            render={(_, record) => (
              <Space>
                <ShowButton hideText size="small" recordItemId={record.id} />
              </Space>
            )}
          />
        </Table>
      </List>
    </>
  );
}
