"use client";

import { usePaymentMethod } from "../../hooks/payment-method";
import { useCart } from "../../hooks/cart.hook";
import { CheckCircle, Smartphone, Trash2, ShoppingBag, Plus, Minus, ArrowRight } from "lucide-react";
import {
  Button,
  Card,
  Col,
  Modal,
  Form,
  Image,
  Input,
  message,
  Row,
  Typography,
} from "@/components/ui";
import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "../../lib/format";
import { API_URL, API_URL_UPLOADS_CROCHETS } from "../../constants/api-url";
import { ORDER_STATUS } from "../../constants/constant";
import { useRouter } from "next/navigation";
import { useCurrency } from "../../hooks/currency.hook";
import { useCreate, useGetIdentity } from "@refinedev/core";
import { generateOrderNumber } from "../../utils/order-no";
import CheckoutSkeleton from "../../skeleton/cart.skeleton";

const CheckoutCartBtn = ({ cartItems, total }) => {
  const [checkoutDrawerOpen, setCheckoutDrawerOpen] = useState(false);
  const { setPaymentMethod, paymentMethod } = usePaymentMethod();
  const { currency, convertPrice } = useCurrency();
  const { getCartQuantity, clearCrochet } = useCart();

  const { data: user } = useGetIdentity({});
  const navigation = useRouter();

  const { mutate: mutateOrder } = useCreate({
    resource: "orders",
  });
  const { mutate: mutateMomo } = useCreate({
    resource: "momo",
  });

  const totalQtty = getCartQuantity(cartItems);

  const options = [
    {
      key: "mobile_money",
      label: "Mobile Money",
      icon: <Smartphone className="w-8 h-8 text-blue-600" />,
    },
  ];

  const handleDrawerHandler = () => {
    setCheckoutDrawerOpen(true);
  };

  const onConfirmOrder = async (data) => {
    const payload = {
      userId: user ? user.id : null,
      totalQtty: totalQtty,
      discount: 0,
      totalAmount: total,
      orderNo: generateOrderNumber(),
      username: user ? user.name : data.username,
      address: data.address,
      paymentMethod,
      email: user ? user.email : data.email,
      status: ORDER_STATUS.PENDING,
      items: cartItems.map((item) => {
        return {
          crochetId: item.crochetId,
          qtty: item.quantity,
          amount: item.price,
          colors: item.selectedColors,
        };
      }),
    };
    try {
      mutateOrder(
        {
          values: payload,
        },
        {
          onSuccess: (data) => {
            const { id, totalAmount } = data.data;
            mutateMomo(
              {
                values: {
                  amount: convertPrice(totalAmount),
                  currencyCode: currency,
                  description: `Your order from MellyCrochets`,
                  returnUrl: `${API_URL}/payment-success?orderId=${id}`,
                },
              },
              {
                onSuccess: (data) => {
                  clearCrochet();
                  const { links } = data.data;
                  const { paymentAuthUrl } = links;
                  navigation.push(paymentAuthUrl);
                },
              }
            );
          },
          onError: () => {
            message.error("Failed to place order.");
          },
        }
      );
    } catch (err) {}
  };

  useEffect(() => {}, [paymentMethod]);
  return (
    <>
      <Button
        type="primary"
        size="large"
        className="w-full h-12 text-base font-semibold rounded-lg shadow-sm hover:shadow-md transition-all"
        onClick={handleDrawerHandler}
      >
        Proceed To Checkout
        <ArrowRight className="ml-2 w-5 h-5" />
      </Button>
      <Modal
        open={checkoutDrawerOpen}
        onCancel={() => setCheckoutDrawerOpen(false)}
        title="Complete Your Order"
        width="600px"
        className="max-w-[90vw]"
        footer={null}
      >
        <div className="space-y-6">
          <div className="text-center mb-6">
            <Typography.Text className="text-gray-600 text-sm">
              Select payment method and enter your details to complete your order
            </Typography.Text>
          </div>

          <div>
            <Typography.Text strong className="text-sm text-gray-700 mb-3 block">
              Payment Method
            </Typography.Text>
            <div className="grid grid-cols-1 gap-3">
              {options.map((option) => (
                <Card
                  key={option.key}
                  onClick={() => setPaymentMethod(option.key)}
                  className={`cursor-pointer transition-all duration-200 border-2 p-4 ${
                    paymentMethod === option.key
                      ? "border-red-600 bg-red-50 shadow-md"
                      : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-lg transition-colors ${
                        paymentMethod === option.key ? "bg-red-100" : "bg-gray-100"
                      }`}>
                        {option.icon}
                      </div>
                      <span className="text-base font-medium text-gray-900">
                        {option.label}
                      </span>
                    </div>
                    {paymentMethod === option.key && (
                      <CheckCircle className="w-6 h-6 text-red-600" />
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Form onFinish={onConfirmOrder} layout="vertical" className="space-y-5">
            {!user && (
              <>
                <Form.Item
                  label={<span className="text-sm font-semibold text-gray-700">Full Name</span>}
                  name="username"
                  rules={[
                    { required: true, message: "Please enter your full name" },
                  ]}
                >
                  <Input 
                    size="large" 
                    placeholder="Enter your full name" 
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="text-sm font-semibold text-gray-700">Email Address</span>}
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Please enter a valid email address" },
                  ]}
                >
                  <Input 
                    size="large" 
                    type="email" 
                    placeholder="Enter your email address" 
                  />
                </Form.Item>
              </>
            )}

            <Form.Item
              label={<span className="text-sm font-semibold text-gray-700">Delivery Address</span>}
              name="address"
              rules={[{ required: true, message: "Please enter your delivery address" }]}
            >
              <Input 
                size="large" 
                placeholder="Enter your complete delivery address" 
              />
            </Form.Item>

            <div className="pt-4 border-t border-gray-100">
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                className="w-full h-12 text-base font-semibold rounded-lg"
                disabled={!paymentMethod}
              >
                Confirm Order
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

const CartPage = () => {
  const { removeCrochet, loadCartCrochets, getCartTotal, updateQuantity } = useCart();
  const { currency, getPrice } = useCurrency();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingItems, setUpdatingItems] = useState(new Set());

  const handleRemoveCartItem = async (item) => {
    const feedback = await removeCrochet(item.crochet.id);
    if (feedback) {
      message.success(`${item.crochet.name} has been removed from cart`);
      // Reload cart items
      const items = await loadCartCrochets();
      setCartItems(items);
    } else {
      message.error(`${item.crochet.name} was not removed`);
    }
  };

  const handleQuantityChange = async (item, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveCartItem(item);
      return;
    }

    const itemKey = item.id || `${item.crochetId}-${item.sizeId}`;
    setUpdatingItems((prev) => new Set(prev).add(itemKey));

    try {
      const success = await updateQuantity(
        item.id,
        newQuantity,
        item.crochetId || item.crochet.id,
        item.sizeId,
        item.currency,
        item.selectedColors || item.color
      );

      if (success) {
        // Reload cart items to get updated prices
        const items = await loadCartCrochets();
        setCartItems(items);
      } else {
        message.error("Failed to update quantity");
      }
    } catch (error) {
      message.error("Failed to update quantity");
    } finally {
      setUpdatingItems((prev) => {
        const next = new Set(prev);
        next.delete(itemKey);
        return next;
      });
    }
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      setIsLoading(true);
      const items = await loadCartCrochets();
      setCartItems(items);
      setIsLoading(false);
    };

    fetchCartItems();
  }, []);

  if (isLoading) {
    return <CheckoutSkeleton />;
  }

  const total = getCartTotal(cartItems);
  const currencySymbol = cartItems[0]?.currency || currency;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingBag className="w-8 h-8 text-red-600" />
            <Typography.Title level={2} className="!mb-0">
              Shopping Cart
            </Typography.Title>
          </div>
          <Typography.Text className="text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
          </Typography.Text>
        </div>

        {!!cartItems && cartItems.length > 0 ? (
          <Row gutter={[24, 24]}>
            {/* Cart Items */}
            <Col xs={24} lg={16}>
              <Card className="shadow-sm border-gray-100">
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div
                      key={item.id || index}
                      className="flex flex-col sm:flex-row gap-4 p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors rounded-lg"
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <Link
                          href={`/crochets/${item.crochet.slug}`}
                          className="block relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden bg-gray-100"
                        >
                          <Image
                            src={`${API_URL_UPLOADS_CROCHETS}/${item.crochet.imageUrls[0]}`}
                            alt={item.crochet.name}
                            className="w-full h-full object-cover"
                            preview={false}
                          />
                        </Link>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                          <div className="flex-1">
                            <Link
                              href={`/crochets/${item.crochet.slug}`}
                              className="text-lg font-semibold text-gray-900 hover:text-red-600 transition-colors line-clamp-2"
                            >
                              {item.crochet.name}
                            </Link>
                            {item.selectedColors && (
                              <div className="mt-2 flex items-center gap-2">
                                <span className="text-sm text-gray-500">Color:</span>
                                <div className="flex gap-1">
                                  {Array.isArray(item.selectedColors) ? (
                                    item.selectedColors.map((color, idx) => (
                                      <div
                                        key={idx}
                                        className="w-5 h-5 rounded-full border border-gray-300"
                                        style={{ backgroundColor: color }}
                                        title={color}
                                      />
                                    ))
                                  ) : (
                                    <div
                                      className="w-5 h-5 rounded-full border border-gray-300"
                                      style={{ backgroundColor: item.selectedColors }}
                                      title={item.selectedColors}
                                    />
                                  )}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Remove Button */}
                          <Button
                            type="text"
                            onClick={() => handleRemoveCartItem(item)}
                            className="flex-shrink-0 text-red-600 hover:text-red-700 hover:bg-red-50 p-2"
                            icon={<Trash2 className="w-4 h-4" />}
                          />
                        </div>

                        {/* Quantity and Price */}
                        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600">Quantity:</span>
                            <div className="flex items-center gap-2 border border-gray-200 rounded-lg">
                              <Button
                                type="text"
                                size="small"
                                className="p-1 h-8 w-8 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                                icon={<Minus className="w-4 h-4" />}
                                onClick={() => handleQuantityChange(item, item.quantity - 1)}
                                disabled={updatingItems.has(item.id || `${item.crochetId || item.crochet.id}-${item.sizeId}`) || item.quantity <= 1}
                              />
                              <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <Button
                                type="text"
                                size="small"
                                className="p-1 h-8 w-8 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                                icon={<Plus className="w-4 h-4" />}
                                onClick={() => handleQuantityChange(item, item.quantity + 1)}
                                disabled={updatingItems.has(item.id || `${item.crochetId || item.crochet.id}-${item.sizeId}`)}
                              />
                            </div>
                          </div>

                          <div className="flex flex-col sm:items-end gap-1">
                            <Typography.Text className="text-sm text-gray-500">
                              {format.number(item.price)} {currencySymbol} each
                            </Typography.Text>
                            <Typography.Text strong className="text-lg text-gray-900">
                              {format.number(item.total)} {currencySymbol}
                            </Typography.Text>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>

            {/* Order Summary */}
            <Col xs={24} lg={8}>
              <Card className="shadow-sm border-gray-100 sticky top-4">
                <Typography.Title level={4} className="!mb-6">
                  Order Summary
                </Typography.Title>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900 font-medium">
                      {format.number(total)} {currencySymbol}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900 font-medium">Calculated at checkout</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <Typography.Text strong className="text-base">
                        Total
                      </Typography.Text>
                      <Typography.Text strong className="text-xl text-red-600">
                        {format.number(total)} {currencySymbol}
                      </Typography.Text>
                    </div>
                  </div>
                </div>

                <CheckoutCartBtn cartItems={cartItems} total={total} />

                <Link
                  href="/shop"
                  className="block mt-4 text-center text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  Continue Shopping
                </Link>
              </Card>
            </Col>
          </Row>
        ) : (
          <Card className="shadow-sm border-gray-100">
            <div className="text-center py-12 px-4">
              <div className="mb-6 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                  <ShoppingBag className="w-12 h-12 text-gray-400" />
                </div>
              </div>
              <Typography.Title level={3} className="!mb-3">
                Your cart is empty
              </Typography.Title>
              <Typography.Text className="text-gray-600 mb-6 block">
                Looks like you haven't added anything to your cart yet.
              </Typography.Text>
              <Link href="/shop">
                <Button type="primary" size="large" className="rounded-lg">
                  Start Shopping
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CartPage;
