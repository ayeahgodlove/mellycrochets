"use client";

import PageBreadCrumbs from "../../../components/page-breadcrumb/page-breadcrumb.component";
import { API_URL_UPLOADS_POSTS } from "../../../constants/api-url";
import { format } from "../../../lib/format";
import {
  DeleteButton,
  // EditButton,
  List,
  ShowButton,
  useTable,
} from '@/components/refine';
import { Image, Space, Table } from '@/components/ui';

export default function MediaList() {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <>
      <PageBreadCrumbs items={["Media", "Lists"]} />
      <List>
        <Table {...tableProps} rowKey="id">
          <Table.Column
            dataIndex="id"
            title={"ID"}
            render={(value, record, index) =>
              format.twoChar((index + 1).toString())
            }
          />
          <Table.Column dataIndex="title" title={"Title"} />

          <Table.Column
            dataIndex="imageUrl"
            title={"Image"}
            render={(value, record) => (
              <Image
                src={`${API_URL_UPLOADS_POSTS}/${record.imageUrl}`}
                alt={record?.title}
                height={50}
                width={50}
              />
            )}
          />
          <Table.Column
            title={"Actions"}
            dataIndex="actions"
            render={(_, record) => (
              <Space>
                {/* <EditButton hideText size="small" recordItemId={record.id} /> */}
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
