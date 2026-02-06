"use client";

import PageBreadCrumbs from "../../../components/page-breadcrumb/page-breadcrumb.component";
import {
  DateField,
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
      <PageBreadCrumbs items={["Payments", "Lists"]} />
      <List>
        <Table {...tableProps} rowKey="id">
          <Table.Column
            dataIndex="id"
            title={"ID"}
            render={(value, record, index) =>
              format.twoChar((index + 1).toString())
            }
          />
          <Table.Column dataIndex="orderId" title={"Order"} ellipsis />
          <Table.Column
            dataIndex="transactionId"
            title={"Transaction ID"}
            ellipsis
          />
          <Table.Column dataIndex="telephone" title={"Telephone"} />
          <Table.Column dataIndex="price" title={"Amount"} />
          <Table.Column dataIndex="currency" title={"Currency"} />
          <Table.Column dataIndex="countryCode" title={"Country Code"} />
          <Table.Column dataIndex="status" title={"Status"} />
          <Table.Column
            dataIndex={["transactionTime"]}
            title={"Paid At"}
            render={(value) => <DateField value={value} />}
          />
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
