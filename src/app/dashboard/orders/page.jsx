"use client";

import PageBreadCrumbs from "../../../components/page-breadcrumb/page-breadcrumb.component";
import {
  DeleteButton,
  List,
  ShowButton,
  useTable,
} from "@/components/refine";
import { format } from "../../../lib/format";
import { Space, Table } from "@/components/ui";

export default function PaymentList() {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });
  return (
    <>
      <PageBreadCrumbs items={["Orders", "Lists"]} />
      <List>
        <Table {...tableProps} rowKey="id">
          <Table.Column
            dataIndex="id"
            title={"ID"}
            render={(value, record, index) =>
              format.twoChar((index + 1).toString())
            }
          />
          <Table.Column dataIndex="orderNo" title={"Order No"} ellipsis />
          <Table.Column dataIndex="totalQtty" title={"Total Qtty"} />
          <Table.Column dataIndex="totalAmount" title={"Total Amount"} />
          <Table.Column dataIndex="telephone" title={"Telephone"} />
          <Table.Column dataIndex="paymentMethod" title={"Payment Method"} />
          <Table.Column dataIndex="username" title={"Username"} />
          <Table.Column dataIndex="email" title={"Email"} />
          <Table.Column dataIndex="address" title={"Address"} />
          <Table.Column dataIndex="status" title={"Status"} />
          <Table.Column
            title={"Actions"}
            dataIndex="actions"
            render={(_, record) => (
              <Space>
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
