"use client";

import PageBreadCrumbs from "../../../../../components/page-breadcrumb/page-breadcrumb.component";
import {
  DateField,
  ImageField,
  MarkdownField,
  Show,
  TextField,
} from '@/components/refine';
import { useShow } from "@refinedev/core";
import { Card, Space, Typography } from '@/components/ui';

const { Title } = Typography;

export default function PaymentShow() {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <>
      <PageBreadCrumbs items={["Payments", "Lists", "Details"]} />
      <Show isLoading={isLoading}>
        <Card className="p-6 bg-white shadow-sm border-0 space-y-4">
          <div>
            <Title level={5}>{"ID"}</Title>
            <TextField value={record?.id ?? ""} />
          </div>
          <div>
            <Title level={5}>{"Order ID"}</Title>
            <TextField value={record?.orderId} />
          </div>
          <div>
            <Title level={5}>{"Transaction ID"}</Title>
            <TextField value={record?.transactionId} />
          </div>
          <div>
            <Title level={5}>{"Description"}</Title>
            <MarkdownField value={record?.description} />
          </div>
          <div>
            <Title level={5}>{"Telephone"}</Title>
            <TextField value={record?.telephone} />
          </div>
          <div>
            <Title level={5}>{"Email"}</Title>
            <TextField value={record?.email} />
          </div>
          <div>
            <Title level={5}>{"Username"}</Title>
            <TextField value={record?.username} />
          </div>
          <div>
            <Title level={5}>{"Price"}</Title>
            <TextField value={record?.price} />
          </div>
          <div>
            <Title level={5}>{"Currency"}</Title>
            <TextField value={record?.currency} />
          </div>
          <div>
            <Title level={5}>{"Country Code"}</Title>
            <TextField value={record?.countryCode} />
          </div>
          <div>
            <Title level={5}>{"Payment Method"}</Title>
            <TextField value={record?.paymentMethod} />
          </div>
          <div>
            <Title level={5}>{"Transaction Time"}</Title>
            <DateField value={record?.transactionTime} />
          </div>
          <div>
            <Title level={5}>{"Mch Transaction Ref"}</Title>
            <TextField value={record?.mchTransactionRef} />
          </div>
          <div>
            <Title level={5}>{"Request ID"}</Title>
            <TextField value={record?.requestId} />
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
