import PaymentSuccessPage from "../../page-components/payment-success/page";

const url = process.env.NEXTAUTH_URL || "https://mellycrochets.shop";

export const metadata = {
  title: "Payment Successful",
  description:
    "Your payment was successful. Thank you for shopping at MellyCrochets – your handcrafted crochet order is confirmed.",
  alternates: { canonical: `${url}/payment-success` },
  robots: { index: false, follow: true },
};

export default function PaymentSuccessPageWrapper() {
  return <PaymentSuccessPage />;
}
