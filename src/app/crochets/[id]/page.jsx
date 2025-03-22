"use client";

import { useCallback, useState } from "react";
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
import { useIsAuthenticated, useNotification } from "@refinedev/core";
import { useCart } from "../../../hooks/cart.hook";

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
  const [loadingAddToCart, setLoadingAddToCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const { open } = useNotification();
  const { data: user } = useIsAuthenticated();
  const { id } = params;
  const {
    data: crochet,
    isFetching,
    isLoading,
  } = crochetAPI.useGetSingleCrochetQuery(id);
  const { addToCart } = useCart();

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

  // Extract available sizes from crochet
  const availableSizes = crochet.sizes.map((size) => size.label);

  // Define all possible sizes
  const allSizes = ["S", "M", "L", "XL", "XXL"];

  // Find the selected size object for price display
  const selectedSizeObj = crochet.sizes.find(
    (size) => size.label === selectedSize
  );


  const handleAddToCart = async () => {
    if (!selectedSize) {
      open?.({
        type: "error",
        message: "Please select a size before adding to cart.",
        key: "notification-key-open",
        placement: "bottomRight",
      });
      // return;
    }
    setLoadingAddToCart(true);

    open?.({
      type: "success",
      message: `${crochet?.name} has been added to cart 👌`,
      key: "notification-key-open",
      placement: "bottomRight",
    });
    if (user?.authenticated) {
      const updatedCartItem = await addToCart(
        crochet ? crochet.id : "",
        selectedSizeObj.id,
        cartQty
      );
      console.log("cart-items", updatedCartItem);
      if (updatedCartItem && updatedCartItem.length > 0) {
        window.location.reload();
      } else {
        open?.({
          type: "error",
          message: `Crochet not added to cart`,
          key: "notification-key-open",
          placement: "bottomRight",
        });
      }
    } else {
      open?.({
        type: "progress",
        message: `Please you need to sigin to continue`,
        key: "notification-key-open",
        placement: "bottomRight",
      });
    }
    setTimeout(() => {
      setLoadingAddToCart(false);
    }, 1500);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
        {/* Car Image & Header */}
        <Card
          bordered={false}
          className="rounded-lg"
          style={{ boxShadow: "none" }}
        >
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
                    {/* Show price when a size is selected */}
                    {selectedSize && selectedSizeObj
                      ? selectedSizeObj.price
                      : crochet.sizes[0].price}
                    XAF
                  </span>
                </p>
              </div>

              {/* Pricing */}
              <div className="mt-8">
                <p className="text-md text-gray-700">
                  <span className="font-semibold">Quantity</span> <br />
                  <span>{crochet.sizes[0].stock} Pieces</span>
                </p>
              </div>

              <div className="mb-8">
                <p className="text-md text-gray-700">
                  <span className="font-semibold">Sizes</span> <br />
                </p>
                <Space>
                  {allSizes.map((size) => {
                    const isAvailable = availableSizes.includes(size);
                    const isActive = selectedSize === size;

                    return (
                      <Button
                        key={size}
                        style={{
                          borderRadius: 50,
                          padding: "0 15px",
                          background: isActive
                            ? "#cb384e"
                            : isAvailable
                            ? "#fdf3f3"
                            : "#e0e0e0",
                          border: isAvailable ? "2px solid #cb384e" : "none",
                          color: isActive ? "white" : "black",
                        }}
                        disabled={!isAvailable}
                        onClick={() => isAvailable && setSelectedSize(size)}
                      >
                        {size}
                      </Button>
                    );
                  })}
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
        <Card
          className="mt-6"
          bordered={false}
          style={{ marginTop: 10, boxShadow: "none" }}
        >
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
            <Descriptions.Item label="Color">{crochet.color}</Descriptions.Item>
            <Descriptions.Item label="Description">
              {crochet.description}
            </Descriptions.Item>
            <Descriptions.Item label="Price">
              {selectedSize && selectedSizeObj
                ? selectedSizeObj.price
                : crochet.sizes[0].price}{" "}
              XAF
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
