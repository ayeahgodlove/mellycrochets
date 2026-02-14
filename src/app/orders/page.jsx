import OrdersPage from "../../page-components/orders/page";

const url = process.env.NEXTAUTH_URL || "https://mellycrochets.shop";

export const metadata = {
  title: "My Orders",
  description:
    "View your MellyCrochets order history and track your handcrafted crochet purchases.",
  alternates: { canonical: `${url}/orders` },
  robots: { index: false, follow: true },
};

export default function OrdersPageWrapper() {
  return <OrdersPage />;
}
