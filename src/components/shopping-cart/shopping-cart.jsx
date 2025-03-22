import { Avatar, Badge, Button, List, Popover, Space, Typography } from "antd";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useState } from "react";
import Link from "next/link";
import { API_URL_UPLOADS_CROCHETS } from "../../constants/api-url";
import { useRouter } from "next/navigation";

const ShoppingCart = ({ cartCount = 1, cartItems }) => {
  const [popovervisible, setPopovervisible] = useState(false);
  const navigator = useRouter();
  const handleCheckoutSubmit = () => {
    navigator.push("/cart");
    setPopovervisible(false);
  };

  const CartHolder = () => {
    return (
      <div className="cartHolder">
        <List
          itemLayout="horizontal"
          dataSource={cartItems}
          style={{
            width: "400px",
            maxWidth: "80vw",
            maxHeight: "50vh",
            overflowY: "auto",
          }}
          size="large"
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`${API_URL_UPLOADS_CROCHETS}/${item.crochet.imageUrls[0]}`}
                    size={"large"}
                    alt={item.crochet.name}
                  />
                }
                title={
                  <Link href={`/store/${item.crochetId}`}>
                    {item.crochet.name}
                  </Link>
                }
                description={
                  <Typography.Text type="danger" strong>
                    {item.quantity * item.price}
                  </Typography.Text>
                }
              />
              <Button
                className="removeCartItem"
                icon={<DeleteOutlined style={{ color: "red" }} />}
                onClick={() => handleRemoveCartItem(item)}
              />
            </List.Item>
          )}
        />

        <Space style={{ justifyContent: "flex-end"}}>
          <Button
            type="primary"
            onClick={() => handleCheckoutSubmit()}
            className="checkOutBtn"
            // block
            style={{
              borderRadius: 50,
            }}
          >
            Checkout
          </Button>
        </Space>
      </div>
    );
  };

  const handlePopoverChange = (newOpen) => {
    setPopovervisible(newOpen);
  };

  return (
    <>
      <Popover
        placement="bottomRight"
        title={"Your Cart"}
        content={<CartHolder />}
        trigger="click"
        open={popovervisible}
        onOpenChange={handlePopoverChange}
      >
        <Badge count={cartCount} style={{ color: "#ddd" }}>
          <ShoppingCartOutlined className="shoppingCardIcon" />
        </Badge>
      </Popover>
    </>
  );
};

export default ShoppingCart;
