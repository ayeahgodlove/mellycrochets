"use client";
import { Skeleton, Button, Typography, Row, Col } from '@/components/ui';

const { Text } = Typography;

const CheckoutSkeleton = () => {
  return (
    <Row
      gutter={[16, 18]}
      align={"middle"}
      justify={"center"}
      style={{ margin: "2rem 0" }}
    >
      <Col xs={22} md={18}>
        <div className="min-h-screen bg-white py-10 px-4 sm:px-8">
          <div className="shadow-md rounded-xl">
            <Text strong className="block text-center text-lg mb-6">
              🥰 JUST A MINUTE TO FINISH YOUR CHECKOUT.
            </Text>

            <div className="overflow-x-auto">
              <table className="w-full table-auto border-separate border-spacing-y-3">
                <thead>
                  <tr className="text-left text-gray-600 text-sm uppercase">
                    <th>No</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white rounded-lg shadow-sm">
                    <td className="py-3 px-2">
                      <Skeleton.Input
                        style={{ width: 20 }}
                        active
                        size="small"
                      />
                    </td>
                    <td className="py-3 px-2">
                      <Skeleton.Avatar size="large" shape="circle" active />
                    </td>
                    <td className="py-3 px-2">
                      <Skeleton.Input
                        style={{ width: 140 }}
                        active
                        size="small"
                      />
                    </td>
                    <td className="py-3 px-2">
                      <Skeleton.Input
                        style={{ width: 30 }}
                        active
                        size="small"
                      />
                    </td>
                    <td className="py-3 px-2">
                      <Skeleton.Input
                        style={{ width: 60 }}
                        active
                        size="small"
                      />
                    </td>
                    <td className="py-3 px-2">
                      <Skeleton.Input
                        style={{ width: 70 }}
                        active
                        size="small"
                      />
                    </td>
                    <td className="py-3 px-2">
                      <Skeleton.Button shape="circle" size="small" active />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-10 text-right">
              <Text strong className="text-lg mr-2">
                Total amount:
              </Text>
              <Skeleton.Input style={{ width: 120 }} active size="default" />
            </div>

            <div className="mt-6 text-center">
              <Button
                type="primary"
                shape="round"
                size="large"
                className="bg-red-600 hover:bg-red-700 text-white"
                disabled
              >
                <Skeleton.Button active style={{ width: 180, height: 40 }} />
              </Button>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default CheckoutSkeleton;
