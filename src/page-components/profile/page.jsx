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
import { Lock, Pencil, Save, X } from "lucide-react";
import { useGetIdentity, useOne, useUpdate } from "@refinedev/core";
import { useState, useEffect } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const { TabPane } = Tabs;

const ProfilePage = () => {
  const { mutate } = useUpdate({ resource: "users" });
  const { form } = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const { data: user } = useGetIdentity({});

  const { data, isLoading, isFetching } = useOne({
    resource: "users",
    id: user?.id,
  });

  const userData = data?.data || data || {};

  useEffect(() => {
    // Set default tab to overview on mount
    setActiveTab("overview");
  }, []);

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
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="Overview" key="overview">
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

          <TabPane tab="Settings" key="settings">
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
