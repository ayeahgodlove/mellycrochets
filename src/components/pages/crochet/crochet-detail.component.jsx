"use client";
import React, { useState } from "react";
import {
  Button,
  Card,
  Descriptions,
  Image,
  Input,
  Space,
  Tooltip,
  message,
} from "antd";
import {
  ContactsOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import CustomImage from "../../../components/shared/custom-image.component";
import { useCart } from "../../../hooks/cart.hook";
import { allColors, allSizes } from "../../../constants/constant";
import { API_URL_UPLOADS_CROCHETS } from "../../../constants/api-url";
import { useCurrency } from "../../../hooks/currency.hook";
import { sizeAPI } from "../../../store/api/size_api";
import CrochetDetailSkeleton from "../../../components/crochet-detail.skeleton";
import { ReviewCreate } from "../../../components/review/review-create.component";
import { ReviewList } from "../../../components/review/review-list.component";

const buttonStyles = { width: 35, padding: "0 10px", borderRadius: 0 };
const inputStyles = {
  width: 70,
  height: 40,
  textAlign: "center",
  borderRadius: 0,
};

const CrochetDetail = ({ crochet }) => {
  const [cartQty, setCartQty] = useState(1);
  const [loadingAddToCart, setLoadingAddToCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColors, setSelectedColors] = useState([]);

  const { addToCart } = useCart();
  const { currency, getConvertedPrice } = useCurrency();

  const convertedPrice = getConvertedPrice(
    crochet.priceInCfa,
    crochet.priceInUsd
  );

  const {
    data: sizes,
    isLoading: isLoadingSize,
    isFetching: isFetchingSize,
  } = sizeAPI.useFetchAllSizesQuery(1);

  const isLoadingData = isLoadingSize || isFetchingSize;

  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center min-h-[65vh]">
        <CrochetDetailSkeleton />
      </div>
    );
  }

  const selectedSizeObj = sizes.find((size) => size.label === selectedSize);
  const isSizeDisabled = crochet.crochetType.id === "nW5bJt7YxPqKzMvURoEa";

  const handleAddToCart = async () => {
    const requiresSize = !isSizeDisabled;

    // Validation
    if ((requiresSize && !selectedSize) || !selectedColors) {
      message.warning(
        `Please select ${
          requiresSize ? "a size and color" : "a color"
        } before adding to cart.`
      );
      setLoadingAddToCart(false);
      return;
    } else {
      setLoadingAddToCart(true);

      const updatedCartItem = await addToCart(
        crochet.id,
        requiresSize ? selectedSizeObj.id : null,
        cartQty,
        currency,
        selectedColors
      );

      if (updatedCartItem?.length > 0) {
        message.success(`${crochet.name} has been added to cart 👌`);
        window.location.reload();
      } else {
        message.error(`${crochet.name} has not been added to cart`);
        setLoadingAddToCart(true);
      }

      setTimeout(() => setLoadingAddToCart(false), 1500);
    }
  };

  const text = encodeURIComponent(
    `Hello, I found this beautiful ${crochet.name} on your mellycrochets.shop and I'm interested. I would like to ask a few questions about it.`
  );

  return (
    <>
      <div className="max-w-5xl mx-auto px-6 my-10 bg-white shadow-md rounded-lg">
        <Card
          variant={"borderless"}
          style={{ boxShadow: "none" }}
          className="rounded-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative py-3">
              {crochet.imageUrls?.map((item, i) => (
                <img
                  key={`preload-${i}`}
                  src={`${API_URL_UPLOADS_CROCHETS}/${item}`}
                  alt="preload"
                  style={{ display: "none" }}
                />
              ))}
              <Image.PreviewGroup
                items={crochet.imageUrls?.map(
                  (url) => `${API_URL_UPLOADS_CROCHETS}/${url || "nodata"}`
                )}
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

            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">
                {crochet.name}
              </h1>
              <p className="text-md font-semibold text-gray-700">
                <span className="text-red-700 text-lg">{convertedPrice}</span>
              </p>

              <div className="mb-8">
                <p className="text-md font-semibold text-gray-700">
                  Chose Your Size
                </p>
                <Space wrap>
                  {allSizes.map((size) => {
                    const isActive = selectedSize === size.key;

                    return (
                      <Tooltip
                        title={
                          isSizeDisabled
                            ? "Size selection not applicable for Accessories"
                            : size.description
                        }
                        key={size.key}
                      >
                        <Button
                          key={size.key}
                          style={{
                            borderRadius: 50,
                            padding: "0 15px",
                            background: isActive ? "#cb384e" : "#fdf3f3",
                            border: "2px solid #cb384e",
                            color: isActive ? "white" : "black",
                          }}
                          // onClick={() => setSelectedSize(size.key)}
                          onClick={() =>
                            !isSizeDisabled && setSelectedSize(size.key)
                          }
                        >
                          {size.key}
                        </Button>
                      </Tooltip>
                    );
                  })}
                </Space>
              </div>
              <div className="mb-8">
                <p className="text-md font-semibold text-gray-700">
                  Chose your Colors
                </p>
                <Space wrap>
                  {allColors.map((color) => {
                    const isActive = selectedColors.includes(color);

                    const toggleColor = () => {
                      setSelectedColors(
                        (prev) =>
                          isActive
                            ? prev.filter((c) => c !== color) // remove if already selected
                            : [...prev, color] // add if not selected
                      );
                    };
                    return (
                      <Tooltip title={color} key={color}>
                        <Button
                          key={color}
                          style={{
                            borderRadius: 50,
                            padding: "0 15px",
                            background: isActive ? "#cb384e" : "#fdf3f3",
                            border: "2px solid #cb384e",
                            color: isActive ? "white" : "black",
                          }}
                          onClick={toggleColor}
                        >
                          {color}
                        </Button>
                      </Tooltip>
                    );
                  })}
                </Space>
              </div>

              <div className="mt-4 flex flex-col gap-4">
                <Space style={{ columnGap: 0 }}>
                  <Button
                    onClick={() => setCartQty((prev) => Math.max(0, prev - 1))}
                    style={{
                      ...buttonStyles,
                      borderTopLeftRadius: 15,
                      borderBottomLeftRadius: 15,
                      borderRight: 0,
                    }}
                    size="large"
                  >
                    <MinusOutlined />
                  </Button>
                  <Input
                    size="large"
                    value={cartQty}
                    style={inputStyles}
                    min={0}
                  />
                  <Button
                    size="large"
                    onClick={() => setCartQty((prev) => prev + 1)}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Button
                    type="primary"
                    onClick={handleAddToCart}
                    loading={loadingAddToCart}
                    icon={<PlusOutlined />}
                    style={{ borderRadius: 50 }}
                    size="large"
                  >
                    Place Order
                  </Button>
                  <Button
                    type="dashed"
                    danger
                    icon={<ContactsOutlined />}
                    style={{ borderRadius: 50 }}
                    href={`https://wa.me/237681077051?text=${text}`}
                    target="_blank"
                    size="large"
                  >
                    Contact Seller
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card
          style={{ boxShadow: "none" }}
          className="mt-6"
          variant={"borderless"}
        >
          <Descriptions
            title="Crochet Details"
            bordered
            layout="vertical"
            column={{ xs: 1, sm: 1, md: 2, lg: 4 }}
            size="small"
          >
            <Descriptions.Item label="Crochet Name">
              {crochet.name}
            </Descriptions.Item>
            <Descriptions.Item label="Crochet Design">
              {crochet?.crochetType?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {crochet.description}
            </Descriptions.Item>
            <Descriptions.Item label="Price">
              {convertedPrice}
            </Descriptions.Item>
            {crochet.color && (
              <Descriptions.Item label="Color">
                {crochet.color}
              </Descriptions.Item>
            )}
          </Descriptions>
        </Card>
      </div>
      <section className="bg-[#fdf3f3] py-10 px-4 sm:px-10">
        <div className="max-w-5xl mx-auto">
          <ReviewCreate crochetId={crochet.id} />
          <ReviewList crochetId={crochet.id} />
        </div>
      </section>
    </>
  );
};

export default CrochetDetail;
