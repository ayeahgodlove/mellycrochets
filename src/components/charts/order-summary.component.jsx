import React from "react";
import { useTable, List } from "@/components/refine";
import { Table, Tag, Button } from "@/components/ui";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { format } from "../../lib/format";

const statusOptions = ["PAID", "PENDING", "CANCELED"];
const paymentMethodOptions = ["mobile_money", "orange_money"];

export const OrderList = () => {
  const { tableProps, filters } = useTable({
    resource: "orders",
    initialSorter: [{ field: "createdAt", order: "desc" }],
    syncWithLocation: true,
  });

  const { dataSource } = tableProps;

  const totalAmount = dataSource?.reduce(
    (sum, order) => sum + parseFloat(order.totalAmount),
    0
  );

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataSource);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "orders.xlsx");
  };

  return (
    <div style={{ marginTop: 20 }}>
      <List
        headerButtons={[
          <Button
            key="export"
            type="primary"
            icon={<Download size={16} />}
            onClick={exportToExcel}
          >
            Export to Excel
          </Button>,
        ]}
        title="Orders List"
      >
        <Table {...tableProps} rowKey="id" pagination={{ pageSize: 10 }}>
          <Table.Column
            dataIndex="orderNo"
            title="SN"
            render={(value, record, index) => index + 1}
          />
          <Table.Column dataIndex="telephone" title="Phone" />
          {/* <Table.Column dataIndex="username" title="Username" />
          <Table.Column dataIndex="address" title="Address" /> */}
          <Table.Column dataIndex="email" title="Email" />
          <Table.Column
            dataIndex="status"
            title="Status"
            filters={statusOptions.map((status) => ({
              text: status,
              value: status,
            }))}
            onFilter={(value, record) => record.status === value}
            render={(value) => (
              <Tag color={value === "PAID" ? "green" : "orange"}>{value}</Tag>
            )}
          />
          <Table.Column
            dataIndex="paymentMethod"
            title="Payment Method"
            filters={paymentMethodOptions.map((method) => ({
              text: method,
              value: method,
            }))}
            onFilter={(value, record) => record.paymentMethod === value}
            render={(value) => (
              <Tag color={value === "mobile_money" ? "yellow" : "orange"}>
                {value}
              </Tag>
            )}
          />
          <Table.Column dataIndex="totalQtty" title="Quantity" />
          <Table.Column dataIndex="totalAmount" title="Amount (XAF)" />
          <Table.Column
            dataIndex="createdAt"
            title="Created At"
            render={(value) => format.date(value)}
          />
        </Table>

        <div style={{ textAlign: "right", marginTop: 16 }}>
          <strong>Total Amount: </strong> {totalAmount?.toLocaleString()} XAF
        </div>
      </List>
    </div>
  );
};
