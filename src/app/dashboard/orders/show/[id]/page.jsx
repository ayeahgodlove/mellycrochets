"use client";

import PageBreadCrumbs from "../../../../../components/page-breadcrumb/page-breadcrumb.component";
import {
  DateField,
  EditButton,
  ImageField,
  MarkdownField,
  Show,
  TextField,
} from '@/components/refine';
import { useShow } from "@refinedev/core";
import { Card, Space, Typography } from '@/components/ui';

const { Title } = Typography;

export default function OrderShow() {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <>
      <PageBreadCrumbs items={["Orders", "Lists", "Details"]} />
      <div className="mb-4 flex justify-end">
        <Space>
          <EditButton recordItemId={record?.id} />
        </Space>
      </div>
      <Show isLoading={isLoading}>
        <Card className="p-6 bg-white shadow-sm border-0 space-y-4">
          <div>
            <Title level={5}>{"ID"}</Title>
            <TextField value={record?.id ?? ""} />
          </div>
          <div>
            <Title level={5}>{"Order NO"}</Title>
            <TextField value={record?.orderNo} />
          </div>
          <div>
            <Title level={5}>{"Email"}</Title>
            <TextField value={record?.email} />
          </div>
          <div>
            <Title level={5}>{"Username"}</Title>
            <MarkdownField value={record?.username} />
          </div>
          <div>
            <Title level={5}>{"Telephone"}</Title>
            <TextField value={record?.telephone} />
          </div>
          <div>
            <Title level={5}>{"Total Qtty"}</Title>
            <TextField value={record?.totalQtty} />
          </div>
          <div>
            <Title level={5}>{"Total Amount"}</Title>
            <TextField value={record?.totalAmount} />
          </div>
          <div>
            <Title level={5}>{"Payment Method"}</Title>
            <TextField value={record?.paymentMethod} />
          </div>
          <div>
            <Title level={5}>{"Status"}</Title>
            <TextField value={record?.status} />
          </div>
          <div>
            <Title level={5}>{"CreatedAt"}</Title>
            <DateField value={record?.createdAt} />
          </div>
        </Card>
      </Show>
    </>
  );
}
