import OrderItemsPage from "../../../page-components/orders/order-items-page";

const url = process.env.NEXTAUTH_URL || "https://mellycrochets.shop";

export const metadata = {
  title: "Order Details",
  description:
    "View details of your MellyCrochets order. Handcrafted crochet fashion from Cameroon.",
  alternates: { canonical: `${url}/orders` },
  robots: { index: false, follow: true },
};

export default function OrderItemsPageWrapper({ params }) {
  return <OrderItemsPage params={params} />;
}
