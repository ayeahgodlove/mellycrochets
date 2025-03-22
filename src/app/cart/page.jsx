"use client";
import { usePaymentMethod } from "../../hooks/payment-method";
import { useCart } from "../../hooks/cart.hook";
import { DeleteOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Drawer,
  Form,
  Image,
  Input,
  InputNumber,
  Radio,
  Row,
  Space,
  Table,
  Typography,
} from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { format } from "../../lib/format";
import { API_URL_UPLOADS_CROCHETS } from "../../constants/api-url";
import { OrderService } from "../../service/order.service";
import { cartItemAPI } from "../../store/api/cart_item_api";
import { getCartSummary } from "../../components/shared/cart-summary-table.component";

const CheckoutCartBtn = ({ onFinish, cartItems }) => {
  const [checkoutDrawerOpen, setCheckoutDrawerOpen] = useState(false);
  const [method, setMethod] = useState("momo");
  const { setPaymentMethod } = usePaymentMethod();
  const navigator = useRouter();

  const onChange = (event) => {
    event.preventDefault();
    setMethod(event.target.value);
    setPaymentMethod(event.target.value);
  };

  const total = cartItems.reduce((prev, curr) => {
    return prev + curr.total;
  }, 0);

  const totalQtty = cartItems.reduce((prev, curr) => {
    return prev + curr.quantity;
  }, 0);

  const onConfirmOrder = async (data) => {
    const obj = {
      ...emptyOrder,
      orderNo: generateOrderNumber(),
      crochets: cartItems.map((mp) => {
        return {
          crochetId: mp.crochetId,
          qtty: mp.quantity,
          price: mp.price,
        };
      }),
      status: "ORDERED",
      totalAmount: total,
      totalQtty: totalQtty,
      address: data.address,
      cellPhone: data.telephone,
      email: data.email,
      username: data.username,
    };
    try {
      const response = await OrderService.create(obj);

      if (response.success) {
        setCheckoutDrawerOpen(false);
        onFinish();
        message.success("Placing your order!");
        const query = { orderId: response.data.id, method };
        navigator.push(
          `/process-payment?${new URLSearchParams(query).toString()}`
        );
      }
      return response;
    } catch (error) {
      message.error("An error occured!");
      return error;
    }
  };

  return (
    <>
      <Button
        type="primary"
        className="w-inline-block"
        size="large"
        style={{ borderRadius: 50 }}
        onClick={() => {
          setCheckoutDrawerOpen(true);
        }}
      >
        Checkout your cart
      </Button>
      <Drawer
        open={checkoutDrawerOpen}
        onClose={() => setCheckoutDrawerOpen(false)}
        title="Checkout Your Cart"
        styles={{ wrapper: { width: "500px" } }}
      >
        <Space style={{ marginBottom: 20 }}>
          <Radio.Group size="large" onChange={onChange}>
            <Radio value="COD"> Cash On Delivery 💸 </Radio>
            <Radio value="MOMO"> Mobile Money Payment 💸 </Radio>
          </Radio.Group>
        </Space>

        <Form onFinish={onConfirmOrder} layout="vertical">
          <Form.Item
            label="Full name"
            name="username"
            rules={[{ required: true, message: "Please enter your full name" }]}
            style={{ marginBottom: 10 }}
          >
            <Input placeholder="Enter your full name..." />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
            style={{ marginBottom: 10 }}
          >
            <Input placeholder="Enter your email..." />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter your address" }]}
          >
            <Input placeholder="Enter your address..." />
          </Form.Item>

          <Form.Item
            label="Telephone"
            name="telephone"
            rules={[{ required: true, message: "Please enter your telephone" }]}
          >
            <Input placeholder="Enter your telephone..." />
          </Form.Item>

          <Space align="end" style={{ marginTop: 20 }}>
            <Button type="primary" htmlType="submit">
              Confirm Order
            </Button>
          </Space>
        </Form>
      </Drawer>
    </>
  );
};

export default function CartPage() {
  const navigator = useRouter();
  //   const [cartItems, setCartItems] = useState([]);
  const [isDeleting, setDeleting] = useState(false);

  const { addToCard, removeItem, loadCartItems } = useCart();
  const {
    data: cartItems,
    isLoading,
    isFetching,
  } = cartItemAPI.useFetchAllCartItemsQuery(1);

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
        <p className="text-lg text-center">Details loading...</p>
      </div>
    );
  }

  const handleCheckoutSubmit = () => {
    message.success("Your order has been placed successfully.");
    navigator.push("/thank-you");
  };
  const handleCartEvent = (data) => {
    console.log("Cart Event Received:", data);
    // setCartItems(data); // Update the cartItems state with the received data
  };

  const handleRemoveCartItem = async (item) => {
    setDeleting(true);
    try {
      await removeItem(item.id);
      const cartItems = await loadCartItems();
      //   setCartItems(cartItems);
    } catch (error) {}
    setDeleting(false);
  };

  return (
    <>
      <Row
        gutter={[16, 18]}
        align={"middle"}
        justify={"center"}
        style={{ margin: "2rem 0" }}
      >
        {!!cartItems && cartItems.length > 0 ? (
          <Col xs={22} md={18}>
            <h2 style={{ textAlign: "center" }}>
              🥰 Just a minute to finish your checkout.
            </h2>
            <div className="checkoutForm">
              <Table
                dataSource={cartItems}
                pagination={false}
                rowKey={(data) => data.id}
                columns={[
                  {
                    title: "No",
                    dataIndex: "no",
                    render(value, record, index) {
                      return (
                        <span key={record.id}>
                          {format.twoChar((index + 1).toString())}
                        </span>
                      );
                    },
                  },

                  {
                    title: "Image",
                    dataIndex: "image",
                    render: (value, record, index) => {
                      return (
                        <Avatar
                          src={`${API_URL_UPLOADS_CROCHETS}/${record.crochet.imageUrls[0]}`}
                          size={"large"}
                          alt={record.crochet.name}
                        />
                      );
                    },
                  },
                  {
                    title: "Name",
                    dataIndex: "name",
                    width: "8rem",
                    render: (value, record, index) => record.crochet?.name,
                  },
                  {
                    title: "Quantity",
                    dataIndex: "quantity",
                    width: 120,
                    render: (value, record) => {
                      return (
                        <InputNumber
                          defaultValue={value}
                          min={0}
                          style={{ width: "65px" }}
                          onChange={(value) => {
                            const item = cartItems.find((item) => {
                              return item.id === record.id
                                ? {
                                    ...item,
                                    quantity: value,
                                    total: item.price * value,
                                    price: item.price,
                                  }
                                : item;
                            });
                            addToCard(
                              `${item?.crochetId}`,
                              Number(item?.quantity)
                            );
                          }}
                        />
                      );
                    },
                  },
                  {
                    title: "Price",
                    dataIndex: "price",
                    render: (value, record) => {
                      return `${format.number(value)} XAF`;
                    },
                    align: "right",
                  },
                  {
                    title: "Total",
                    dataIndex: "total",
                    render: (value, record) => {
                      return `${format.number(value)} XAF`;
                    },
                    align: "right",
                  },
                  {
                    title: "Action",
                    key: "action",
                    fixed: "left",
                    width: 80,
                    render: (_, record) => (
                      <Button
                        type="link"
                        onClick={() => handleRemoveCartItem(record)}
                        style={{ borderRadius: 50 }}
                      >
                        <DeleteOutlined style={{ color: "red" }} />
                      </Button>
                    ),
                  },
                ]}
              />
              <Typography.Paragraph>
                {getCartSummary(cartItems)}
              </Typography.Paragraph>
              <CheckoutCartBtn
                cartItems={cartItems}
                onFinish={() => handleCheckoutSubmit()}
              />
            </div>
          </Col>
        ) : (
          <Col xs={22} md={16} style={{ textAlign: "center" }}>
            <h2>
              👋 Your shopping cart is empty. How about adding some items to it?{" "}
              <br /> Return <Link href="/"> home page</Link>.
            </h2>
            <Image
              src={"./icons/shopping.svg"}
              alt="Shopping with us"
              style={{ width: "280px", maxWidth: "80%" }}
            />
          </Col>
        )}
      </Row>
    </>
  );
}
