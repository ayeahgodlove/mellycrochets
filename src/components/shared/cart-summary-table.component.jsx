import { Typography } from "antd";

export const getCartSummary = (cartItems) => {
  const data = cartItems && cartItems.length > 0 ? cartItems : [];
  const total = data.reduce((prev, curr) => {
    return prev + curr.total;
  }, 0);

  const totalQtty = data.reduce((prev, curr) => {
    return prev + curr.quantity;
  }, 0);

  return (
    <div style={{ margin: "2.5rem 0 1rem 0" }} className="services-text-box">
      <div className="cartSummary font-semibold">
        Total amount :
        <Typography.Text style={{ fontWeight: 600 }} type="danger">
          {" "}
          {parseFloat(total.toString()).toFixed(0)} XAF
        </Typography.Text>
      </div>
    </div>
  );
};
