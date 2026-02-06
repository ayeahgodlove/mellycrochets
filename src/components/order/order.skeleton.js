"use client";
import { Skeleton, Card, Space, Row, Col } from '@/components/ui';

const TableSkeleton = () => {
  const rows = Array.from({ length: 5 });

  return (
    <Row justify="center" align="middle">
      <Col xs={24} md={16} className="min-h-screen bg-gray-50 my-20 mx-4">
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
          <Card className="shadow-md rounded-2xl">
            <div className="w-full overflow-x-auto">
              <table className="w-full table-auto border-separate border-spacing-y-3">
                <thead>
                  <tr className="text-left text-gray-500 uppercase text-sm">
                    <th>SN</th>
                    <th>Tel</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Qtty</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((_, idx) => (
                    <tr key={idx} className="bg-white rounded-lg shadow-sm">
                      <td className="py-2 px-2">
                        <Skeleton.Input
                          style={{ width: 30 }}
                          active
                          size="small"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <Skeleton.Input
                          style={{ width: 100 }}
                          active
                          size="small"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <Skeleton.Input
                          style={{ width: 90 }}
                          active
                          size="small"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <Skeleton.Button
                          style={{ width: 90 }}
                          active
                          size="small"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <Skeleton.Input
                          style={{ width: 30 }}
                          active
                          size="small"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <Skeleton.Input
                          style={{ width: 60 }}
                          active
                          size="small"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <Space>
                          <Skeleton.Button shape="circle" active size="small" />
                          <Skeleton.Button shape="circle" active size="small" />
                        </Space>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end mt-6">
              <Skeleton.Input style={{ width: 100, height: 32 }} active />
            </div>
          </Card>
        </div>
      </Col>
    </Row>
  );
};

export default TableSkeleton;
