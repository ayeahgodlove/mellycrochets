"use client";
import React, { useState } from "react";
import {
  Button,
  Image,
  Input,
  Space,
  Tooltip,
  message,
} from "@/components/ui";
import { MessageCircle, Minus, Plus, Package } from "lucide-react";
import CustomImage from "../../../components/shared/custom-image.component";
import { useCart } from "../../../hooks/cart.hook";
import { allColors, allSizes } from "../../../constants/constant";
import { API_URL_UPLOADS_CROCHETS } from "../../../constants/api-url";
import { useCurrency } from "../../../hooks/currency.hook";
import { sizeAPI } from "../../../store/api/size_api";
import CrochetDetailSkeleton from "../../../components/crochet-detail.skeleton";
import { ReviewCreate } from "../../../components/review/review-create.component";
import { ReviewList } from "../../../components/review/review-list.component";
import ShareButton from "@/components/shared/share.component";
import { cn } from "@/lib/utils";

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
    if ((requiresSize && !selectedSize) || selectedColors.length < 1) {
      message.warning(
        `Please select ${
          requiresSize && !selectedSize ? "a size and color" : "a color"
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
      {/* Main Product Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-6 md:p-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-50">
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
                    height="100%"
                    className="w-full h-full object-cover"
                    src={`${API_URL_UPLOADS_CROCHETS}/${
                      crochet.imageUrls[0] || "nodata"
                    }`}
                    alt={crochet.name}
                    preview
                  />
                </Image.PreviewGroup>
              </div>
              <div>
                <CustomImage imageList={crochet.imageUrls} />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      {crochet.name}
                    </h1>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">
                      {crochet?.crochetType?.name}
                    </p>
                  </div>
                  <ShareButton
                    title="Check this out on MellyCrochets!"
                    text="I found this beautiful handmade crochet item you might love."
                  />
                </div>
              </div>

              {/* Price */}
              <div className="py-4 border-y border-gray-100">
                <p className="text-3xl font-bold text-red-800">
                  {convertedPrice}
                </p>
              </div>

              {/* Size Selection */}
              {!isSizeDisabled && (
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                    Choose Your Size
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {allSizes.map((size) => {
                      const isActive = selectedSize === size.key;
                      return (
                        <Tooltip
                          title={size.description}
                          key={size.key}
                        >
                          <button
                            type="button"
                            onClick={() => setSelectedSize(size.key)}
                            className={cn(
                              "px-4 py-2 rounded-full text-sm font-medium transition-all",
                              "border-2",
                              isActive
                                ? "bg-red-800 text-white border-red-800 shadow-md"
                                : "bg-white text-gray-700 border-gray-300 hover:border-red-300 hover:text-red-800"
                            )}
                          >
                            {size.key}
                          </button>
                        </Tooltip>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  Choose Your Colors
                </p>
                <div className="flex flex-wrap gap-2">
                  {allColors.map((color) => {
                    const isActive = selectedColors.includes(color);
                    const toggleColor = () => {
                      setSelectedColors(
                        (prev) =>
                          isActive
                            ? prev.filter((c) => c !== color)
                            : [...prev, color]
                      );
                    };
                    return (
                      <Tooltip title={color} key={color}>
                        <button
                          type="button"
                          onClick={toggleColor}
                          className={cn(
                            "px-4 py-2 rounded-full text-sm font-medium transition-all",
                            "border-2",
                            isActive
                              ? "bg-red-800 text-white border-red-800 shadow-md"
                              : "bg-white text-gray-700 border-gray-300 hover:border-red-300 hover:text-red-800"
                          )}
                        >
                          {color}
                        </button>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  Quantity
                </p>
                <div className="flex items-center gap-0 w-fit border border-gray-200 rounded-lg overflow-hidden">
                  <Button
                    type="text"
                    onClick={() => setCartQty((prev) => Math.max(1, prev - 1))}
                    className="h-12 w-12 rounded-none border-0 hover:bg-gray-50"
                    disabled={cartQty <= 1}
                  >
                    <Minus size={18} />
                  </Button>
                  <Input
                    type="number"
                    min={1}
                    value={cartQty}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value) || 1;
                      setCartQty(Math.max(1, newValue));
                    }}
                    className="w-20 h-12 text-center border-0 border-x border-gray-200 rounded-none focus:ring-0"
                  />
                  <Button
                    type="text"
                    onClick={() => setCartQty((prev) => prev + 1)}
                    className="h-12 w-12 rounded-none border-0 hover:bg-gray-50"
                  >
                    <Plus size={18} />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  type="primary"
                  onClick={handleAddToCart}
                  loading={loadingAddToCart}
                  size="lg"
                  className="flex-1 h-12 rounded-lg font-semibold bg-red-800 hover:bg-red-900 text-white shadow-md hover:shadow-lg transition-all"
                  icon={<Plus size={18} />}
                >
                  Place Order
                </Button>
                <Button
                  type="default"
                  href={`https://wa.me/237681077051?text=${text}`}
                  target="_blank"
                  size="lg"
                  className="flex-1 h-12 rounded-lg font-semibold border-2 border-red-300 text-red-800 hover:bg-red-50 hover:border-red-900 transition-all bg-white"
                  icon={<MessageCircle size={18} className="text-red-800" />}
                >
                  Contact Seller
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg border-0 overflow-hidden">
          <div className="bg-gradient-to-r from-red-900 to-red-800 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Package size={24} />
              Product Details
            </h2>
          </div>
          <div className="p-6 md:p-8 bg-white">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-2 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Crochet Name</dt>
                <dd className="text-lg font-bold text-gray-900">{crochet.name}</dd>
              </div>
              <div className="space-y-2 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Crochet Design</dt>
                <dd className="text-lg font-bold text-gray-900">{crochet?.crochetType?.name}</dd>
              </div>
              <div className="space-y-2 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors md:col-span-2">
                <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</dt>
                <dd className="text-base text-gray-700 leading-relaxed">{crochet.description}</dd>
              </div>
              <div className="space-y-2 p-4 rounded-lg bg-red-50 border border-red-100">
                <dt className="text-xs font-semibold text-red-600 uppercase tracking-wider">Price</dt>
                <dd className="text-2xl font-bold text-red-800">{convertedPrice}</dd>
              </div>
              {crochet.color && (
                <div className="space-y-2 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Color</dt>
                  <dd className="text-lg font-bold text-gray-900">{crochet.color}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <ReviewCreate crochetId={crochet.id} />
          <ReviewList crochetId={crochet.id} />
        </div>
      </section>
    </>
  );
};

export default CrochetDetail;
