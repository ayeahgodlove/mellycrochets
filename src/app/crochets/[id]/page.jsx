"use client";

import { useState } from "react";
import { API_URL_UPLOADS_CROCHETS } from "../../../constants/api-url";
import { crochetAPI } from "../../../store/api/crochet_api";
import {
  ContactsOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  ColorPicker,
  Descriptions,
  Image,
  Input,
  Space,
} from "antd";
import SpinnerList from "../../../components/spinner-list";
import CustomImage from "../../../components/shared/custom-image.component";

const buttonStyles = {
  width: 35,
  padding: "0 10px",
  borderRadius: 0,
};

const inputStyles = {
  width: 70,
  height: 33,
  textAlign: "center",
  borderRadius: 2,
};

export default function IndexPage({ params }) {
  const [cartQty, setCartQty] = useState(1);
  const [loadingCheckOut, setLoadingCheckOut] = useState(false);
  const [loadingAddToCart, setLoadingAddToCart] = useState(false);

  const { id } = params;
  const {
    data: crochet,
    isFetching,
    isLoading,
  } = crochetAPI.useGetSingleCrochetQuery(id);

  const handleAddToCart = () => {
    setLoadingAddToCart(true);

    message.success(`${data?.name} has been added to cart 👌`);
    if (data) {
      let addedItems = Array.from({ length: cartQty }, () => data);
    }
    setTimeout(() => {
      setLoadingAddToCart(false);
    }, 1500);
  };

  if (isLoading || isFetching) {
    return (
      <div
        style={{
          minHeight: "65vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SpinnerList />
      </div>
    );
  }
  return (
    <>
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
        {/* Car Image & Header */}
        <Card bordered={false} className="rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative py-3">
              <Image.PreviewGroup
                items={crochet.imageUrls?.map((med) => {
                  return `${API_URL_UPLOADS_CROCHETS}/${med || "nodata"}`;
                })}
              >
                <Image
                  width="100%"
                  height={350}
                  className="rounded-lg object-cover"
                  src={`${API_URL_UPLOADS_CROCHETS}/${
                    crochet.imageUrls[0] || "nodata"
                  }`}
                  alt={crochet.name}
                />
              </Image.PreviewGroup>

              <div className="mt-5">
                <CustomImage imageList={crochet.imageUrls} />
              </div>
            </div>

            <div className="">
              <div className="">
                <h1
                  className="text-3xl font-bold text-gray-800 mb-0"
                  style={{ marginBottom: 3 }}
                >
                  {crochet.name}
                </h1>
                <p className="text-md font-semibold text-gray-700">
                  <span className="text-red-500">
                    {crochet.price}
                    XAF
                  </span>
                </p>
              </div>

              {/* Pricing */}
              <div className="mt-8">
                <p className="text-md text-gray-700">
                  <span className="font-semibold">Quantity</span> <br />
                  <span>{crochet.stock} Pieces</span>
                </p>
              </div>

              <div className="mb-8">
                <p className="text-md text-gray-700">
                  <span className="font-semibold">Sizes</span> <br />
                </p>
                <Space>
                  <Button
                    style={{
                      borderRadius: 50,
                      padding: "0 15px",
                      background: "#fdf3f3",
                      border: "2px solid #cb384e",
                    }}
                  >
                    S
                  </Button>
                  <Button
                    style={{
                      borderRadius: 50,
                      padding: "0 15px",
                      background: "#fdf3f3",
                    }}
                  >
                    M
                  </Button>
                  <Button
                    style={{
                      borderRadius: 50,
                      padding: "0 15px",
                      background: "#fdf3f3",
                    }}
                  >
                    L
                  </Button>
                  <Button
                    style={{
                      borderRadius: 50,
                      padding: "0 15px",
                      background: "#fdf3f3",
                    }}
                  >
                    Xl
                  </Button>
                  <Button
                    style={{
                      borderRadius: 50,
                      padding: "0 15px",
                      background: "#fdf3f3",
                    }}
                  >
                    XXl
                  </Button>
                </Space>
              </div>

              <div className="divide-y divide-amber-950"></div>
              <p className="text-gray-600 text-lg">{crochet.description}</p>

              {/* Action Buttons */}
              <div className="mt-4 flex flex-col gap-4">
                <Space style={{ columnGap: 0 }}>
                  <Button
                    onClick={() => setCartQty(cartQty > 0 ? cartQty - 1 : 0)}
                    className="updownQty"
                    style={{
                      ...buttonStyles,
                      borderTopLeftRadius: 15,
                      borderBottomLeftRadius: 15,
                      borderRight: 0,
                    }}
                  >
                    <MinusOutlined />
                  </Button>
                  <Input
                    value={cartQty}
                    style={inputStyles}
                    min={0}
                    className="cartQty"
                  />
                  <Button
                    onClick={() => setCartQty(cartQty + 1)}
                    className="updownQty"
                    style={{
                      ...buttonStyles,
                      borderTopRightRadius: 15,
                      borderBottomRightRadius: 15,
                      borderLeft: 0,
                    }}
                  >
                    <PlusOutlined />
                  </Button>
                </Space>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 align-items-center">
                  <Button
                    type="primary"
                    onClick={handleAddToCart}
                    loading={loadingAddToCart}
                    icon={<PlusOutlined />}
                    iconPosition="end"
                    style={{
                      borderRadius: 50,
                    }}
                    // block
                  >
                    Add To cart
                  </Button>
                  <Button
                    type="dashed"
                    danger
                    icon={<ContactsOutlined />}
                    iconPosition="end"
                    style={{
                      borderRadius: 50,
                    }}
                  >
                    Contact Seller
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Car Specifications */}
        <Card className="mt-6" bordered={false} style={{ marginTop: 10 }}>
          <Descriptions
            column={{ xs: 1, sm: 1, md: 2, lg: 3 }}
            title={`Crochet Details`}
            bordered
            layout="vertical"
          >
            <Descriptions.Item label="Crochet Name">
              {crochet.name}
            </Descriptions.Item>
            <Descriptions.Item label="Crochet Type">
              {crochet?.crochetType?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Color">
              <ColorPicker value={crochet.color.toLowerCase()} />
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {crochet.description}
            </Descriptions.Item>
            <Descriptions.Item label="Price">
              {crochet.price} XAF
            </Descriptions.Item>
            <Descriptions.Item label="Quantity">
              {crochet.stock}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </>
  );
}
