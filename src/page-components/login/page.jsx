"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { ThemedTitleV2 } from "@/components/refine";
import { Button, Space, Form, Input, Typography, message } from "@/components/ui";
import Link from "next/link";
import "../../assets/css/globals.css";
import { FaLock } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const t = useTranslations("login");
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: redirect,
    });

    setLoading(false);
    if (response?.ok) {
      message.success("Login Successful!");
      router.push(redirect);
      router.refresh();
    } else {
      message.error("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-1 justify-center items-center py-10 md:py-30">
      <Space
        direction="vertical"
        align="center"
        className="bg-white p-8 shadow-lg rounded-lg"
      >
        <ThemedTitleV2
          collapsed={false}
          wrapperStyles={{
            fontSize: "22px",
            marginBottom: "24px",
          }}
          icon={null}
          text={t("title")}
        />

        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          className="w-xs sm:w-sm md:w-md lg:w-lg xl:w-xl"
          size="large"
        >
          <Form.Item
            label={t("emailLabel")}
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Enter a valid email!" },
            ]}
          >
            <Input
              size="large"
              placeholder="Enter your email"
              disabled={loading}
            />
          </Form.Item>

          <Form.Item
            label={t("passwordLabel")}
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              size="large"
              placeholder="Enter your password"
              prefix={<FaLock />}
              disabled={loading}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            size="large"
            loading={loading}
            disabled={loading}
          >
            {t("loginBtn")}
          </Button>
        </Form>

        <Space className="flex flex-col items-center justify-center">
          <Button
            icon={<FcGoogle />}
            className="w-xs sm:w-sm md:w-md lg:w-lg xl:w-xl"
            onClick={() => signIn("auth0", { callbackUrl: redirect })}
            size="large"
          >
            {t("socialAuth")}
          </Button>
        </Space>

        <Typography.Text>
          {t("register")}{" "}
          <Link href="/register" style={{ color: "#1890ff" }}>
            {t("registerBtn")}
          </Link>
        </Typography.Text>
      </Space>
    </div>
  );
};

export default LoginPage;
