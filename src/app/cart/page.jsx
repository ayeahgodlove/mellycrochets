import CartPage from "../../page-components/cart/page";

const url = process.env.NEXTAUTH_URL || "https://mellycrochets.shop";

export const metadata = {
  title: "Shopping Cart",
  description:
    "Review your handcrafted crochet items at MellyCrochets. Complete your order and get unique crochet fashion delivered worldwide.",
  alternates: { canonical: `${url}/cart` },
  robots: { index: true, follow: true },
};

export default function CartPageWrapper() {
  return <CartPage />;
}
