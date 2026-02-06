import { format } from "../../lib/format";
import { Typography } from '@/components/ui';

export const getCartSummary = (cartItems) => {
  const data = cartItems && cartItems.length > 0 ? cartItems : [];
  const total = data.reduce((prev, curr) => {
    return prev + curr.total;
  }, 0);

  return (
    <div className="services-text-box px-6 pt-2">
      <div className="cartSummary font-semibold">
        Total amount :
        <Typography.Text style={{ fontWeight: 600, fontSize: 18 }} type="danger">
          {format.number(total)} {data[0]?.currency}
        </Typography.Text>
      </div>
    </div>
  );
};
