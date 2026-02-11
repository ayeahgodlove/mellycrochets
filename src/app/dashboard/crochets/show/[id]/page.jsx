"use client";

import PageBreadCrumbs from "../../../../../components/page-breadcrumb/page-breadcrumb.component";
import { EditButton, Show } from "@/components/refine";
import { useOne, useShow } from "@refinedev/core";
import { Card, Descriptions, Image, Space } from "@/components/ui";
import { format } from "../../../../../lib/format";

export default function CrochetShow() {
  const { query } = useShow({});
  const data = query?.data;
  const isLoading = query?.isFetching ?? false;
  const record = data?.data ?? data;

  const crochetTypeId = record?.crochetTypeId ?? record?.crochetType?.id;
  const { result: crochetTypeResult } = useOne({
    resource: "crochet_types",
    id: crochetTypeId ?? "",
    queryOptions: {
      enabled: !!record && !!crochetTypeId,
    },
  });
  const crochetTypeName = record?.crochetType?.name ?? crochetTypeResult?.name;

  return (
    <>
      <PageBreadCrumbs items={["Crochets", "Lists", "Show"]} />
      <div className="mb-4 flex justify-end">
        <Space>
          <EditButton recordItemId={record?.id} />
        </Space>
      </div>
      <Show isLoading={isLoading}>
        <Card className="p-6 bg-white shadow-sm border-0">
          <Descriptions bordered={false}>
            <Descriptions.Item label="Name">{record?.name}</Descriptions.Item>
            <Descriptions.Item label="Crochet Type">{crochetTypeName ?? "-"}</Descriptions.Item>
            <Descriptions.Item label="Description">{record?.description ?? "-"}</Descriptions.Item>
            <Descriptions.Item label="Price (CFA)">{record?.priceInCfa != null ? format.number(record.priceInCfa) : "-"}</Descriptions.Item>
            <Descriptions.Item label="Price (USD)">{record?.priceInUsd != null ? format.number(record.priceInUsd) : "-"}</Descriptions.Item>
            {Array.isArray(record?.imageUrls) && record.imageUrls.length > 0 && (
              <Descriptions.Item label="Images">
                <Space size={8} wrap>
                  {record.imageUrls.map((url, i) => (
                    <Image
                      key={i}
                      src={url.startsWith("/") || url.startsWith("http") ? url : `/uploads/crochets/${url}`}
                      alt={`${record?.name} ${i + 1}`}
                      width={80}
                      height={80}
                      style={{ objectFit: "cover" }}
                    />
                  ))}
                </Space>
              </Descriptions.Item>
            )}
          </Descriptions>
        </Card>
      </Show>
    </>
  );
}
