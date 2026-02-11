"use client";

import {
  Avatar,
  Button,
  Card,
  Form,
  Input,
  Space,
  Tabs,
  Tag,
  Typography,
} from "@/components/ui";
import { Lock, Pencil, Save, ShoppingBag, X } from "lucide-react";
import { useGetIdentity, useOne, useUpdate } from "@refinedev/core";
import { useState, useEffect } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BASE_URL } from "@/constants/api-url";

const { TabPane } = Tabs;

const SUCCESS_ORDER_STATUSES = ["completed", "paid", "success", "delivered", "successful"];

const ProfilePage = () => {
  const { mutate } = useUpdate({ resource: "users" });
  const { form } = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [userOrders, setUserOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const { data: user } = useGetIdentity({});

  const { data, isLoading, isFetching } = useOne({
    resource: "users",
    id: user?.id,
  });

  const userData = data?.data || data || {};

  useEffect(() => {
    setActiveTab("overview");
  }, []);

  useEffect(() => {
    if (!user?.id || activeTab !== "orders") return;
    setOrdersLoading(true);
    fetch(`${BASE_URL}/orders/users/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        const successful = list.filter((o) =>
          SUCCESS_ORDER_STATUSES.includes(String(o?.status ?? "").toLowerCase())
        );
        setUserOrders(successful);
      })
      .catch(() => setUserOrders([]))
      .finally(() => setOrdersLoading(false));
  }, [user?.id, activeTab]);

  const handleEditClick = () => {
    setIsEditing(true);
    setActiveTab("settings");
    form.setFieldsValue({
      username: userData?.username || user?.name || "",
      email: userData?.email || user?.email || "",
      phone: userData?.phone || "",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const handleSave = (values) => {
    mutate(
      {
        id: user?.id,
        values: {
          ...values,
          id: user?.id,
          image: user?.avatar || userData?.image,
        },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  if (isLoading || isFetching) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center">
        <p className="text-lg text-center">Loading profile...</p>
      </div>
    );
  }

  const verified = userData?.verified;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <Card className="overflow-hidden p-0 border-0 shadow-lg">
        <div className="bg-gradient-to-r from-red-900 to-red-700 text-white p-6 w-full">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <Avatar size={96} src={user?.avatar || userData?.image} />
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">{userData?.username || user?.name || "User"}</h2>
              <p className="text-white/80">{userData?.email || user?.email || ""}</p>
              <div className="flex flex-wrap gap-2">
                <Tag color="blue">{userData?.role || "user"}</Tag>
                <Tag color={verified ? "green" : "red"}>
                  {verified ? "Verified" : "Unverified"}
                </Tag>
              </div>
            </div>
            <div className="md:ml-auto">
              {!isEditing && (
                <Button
                  type="default"
                  icon={<Pencil size={16} />}
                  className="bg-white text-red-800 hover:bg-gray-100 border-red-800"
                  onClick={handleEditClick}
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <Tabs
          defaultActiveKey="overview"
          activeKey={activeTab}
          onChange={setActiveTab}
          className="w-full"
        >
          <TabPane tab="Overview" key="overview" tabKey="overview">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="shadow-sm">
                <Typography.Text className="text-xs uppercase text-gray-500">
                  Username
                </Typography.Text>
                <Typography.Title level={4} className="mt-2">
                  {userData?.username || "-"}
                </Typography.Title>
              </Card>
              <Card className="shadow-sm">
                <Typography.Text className="text-xs uppercase text-gray-500">
                  Telephone
                </Typography.Text>
                <Typography.Title level={4} className="mt-2">
                  {userData?.phone || "-"}
                </Typography.Title>
              </Card>
              <Card className="shadow-sm">
                <Typography.Text className="text-xs uppercase text-gray-500">
                  Role
                </Typography.Text>
                <Typography.Title level={4} className="mt-2">
                  {userData?.role || "user"}
                </Typography.Title>
              </Card>
            </div>

            <div className="mt-8 space-y-4">
              <Typography.Title level={5}>Connected Accounts</Typography.Title>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  icon={<FaFacebook className="text-blue-600 text-xl" />}
                  className="flex items-center gap-2 w-full sm:w-auto"
                  type="default"
                  size="large"
                >
                  Connect Facebook
                </Button>
                <Button
                  icon={<FcGoogle className="text-xl" />}
                  className="flex items-center gap-2 w-full sm:w-auto"
                  type="default"
                  size="large"
                >
                  Connect Google
                </Button>
                <Button
                  icon={<Lock size={16} />}
                  className="flex items-center gap-2 w-full sm:w-auto"
                  type="default"
                  size="large"
                >
                  Connect OAuth
                </Button>
              </div>
            </div>
          </TabPane>

          <TabPane tab={<span className="inline-flex items-center gap-2"><ShoppingBag size={16} /> Orders</span>} key="orders" tabKey="orders">
            <div className="py-4">
              {ordersLoading ? (
                <p className="text-gray-500">Loading orders...</p>
              ) : userOrders.length === 0 ? (
                <p className="text-gray-500">No successful orders yet.</p>
              ) : (
                <div className="space-y-4">
                  <Typography.Text className="text-sm text-gray-500">
                    {userOrders.length} successful order(s)
                  </Typography.Text>
                  <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="w-full min-w-[480px] text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                          <th className="px-4 py-3 text-left font-medium text-gray-700">Order #</th>
                          <th className="px-4 py-3 text-left font-medium text-gray-700">Date</th>
                          <th className="px-4 py-3 text-right font-medium text-gray-700">Total</th>
                          <th className="px-4 py-3 text-left font-medium text-gray-700">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userOrders.map((order) => (
                          <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                            <td className="px-4 py-3 font-mono text-gray-800">{order.orderNo ?? order.id}</td>
                            <td className="px-4 py-3 text-gray-600">
                              {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "-"}
                            </td>
                            <td className="px-4 py-3 text-right font-medium">{order.totalAmount ?? "-"}</td>
                            <td className="px-4 py-3">
                              <Tag color="green">{String(order.status ?? "").toLowerCase()}</Tag>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </TabPane>

          <TabPane tab="Settings" key="settings" tabKey="settings">
            {isEditing ? (
              <Form
                layout="vertical"
                className="max-w-lg"
                form={form}
                onFinish={handleSave}
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: "Username is required" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Telephone"
                  name="phone"
                  rules={[{ required: true, message: "Phone is required" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Email is required" },
                    { type: "email", message: "Enter a valid email" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ type: "password", message: "Enter a valid password" }]}
                >
                  <Input.Password placeholder="**********" />
                </Form.Item>

                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Passwords do not match!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="**********" />
                </Form.Item>

                <Space>
                  <Button type="primary" htmlType="submit" icon={<Save size={16} />}>
                    Save Changes
                  </Button>
                  <Button danger onClick={handleCancel} icon={<X size={16} />}>
                    Cancel
                  </Button>
                </Space>
              </Form>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 text-gray-700">
                <div className="rounded-lg border border-gray-100 p-4">
                  <p className="text-xs uppercase text-gray-500">Username</p>
                  <p className="text-lg font-semibold">{userData?.username || "-"}</p>
                </div>
                <div className="rounded-lg border border-gray-100 p-4">
                  <p className="text-xs uppercase text-gray-500">Email</p>
                  <p className="text-lg font-semibold">{userData?.email || "-"}</p>
                </div>
                <div className="rounded-lg border border-gray-100 p-4">
                  <p className="text-xs uppercase text-gray-500">Role</p>
                  <p className="text-lg font-semibold">{userData?.role || "user"}</p>
                </div>
                <div className="rounded-lg border border-gray-100 p-4">
                  <p className="text-xs uppercase text-gray-500">Telephone</p>
                  <p className="text-lg font-semibold">{userData?.phone || "-"}</p>
                </div>
                <div className="rounded-lg border border-gray-100 p-4">
                  <p className="text-xs uppercase text-gray-500">Verified</p>
                  <Tag color={verified ? "green" : "red"}>
                    {verified ? "Yes" : "No"}
                  </Tag>
                </div>
              </div>
            )}
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default ProfilePage;
