import { Avatar, Badge, Button, List, Popover, Typography } from "antd";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useState } from "react";
import Link from "next/link";

const ShoppingCart = ({ cartCount = 5 }) => {
  const [popovervisible, setPopovervisible] = useState(false);

  const CartHolder = () => {
    return (
      <div className="cartHolder">
        <List
          itemLayout="horizontal"
          style={{
            width: "400px",
            maxWidth: "80vw",
            maxHeight: "50vh",
            overflowY: "auto",
          }}
          size="large"
        >
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`/mellycrochets/product-jpeg-1000x1000.jpg`}
                  size={"large"}
                  alt={"product-jpeg-1000x1000"}
                />
              }
              title={<Link href={`#`}>Crochet Material</Link>}
              description={
                <Typography.Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius,
                  sint.
                </Typography.Text>
              }
            />
            <Button
              className="removeCartItem"
              icon={<DeleteOutlined style={{ color: "red" }} />}
            />
          </List.Item>
        </List>
        <Button type="primary" className="checkOutBtn">
          Checkout
        </Button>
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
        <Badge count={cartCount || 0} style={{ color: "#ddd" }}>
          <ShoppingCartOutlined className="shoppingCardIcon" />
        </Badge>
      </Popover>
    </>
  );
};

export default ShoppingCart;
