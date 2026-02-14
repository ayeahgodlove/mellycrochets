import ProfilePage from "../../page-components/profile/page";

const url = process.env.NEXTAUTH_URL || "https://mellycrochets.shop";

export const metadata = {
  title: "My Account",
  description:
    "Manage your MellyCrochets account, addresses, and preferences. Handcrafted crochet fashion from Cameroon.",
  alternates: { canonical: `${url}/profile` },
  robots: { index: false, follow: true },
};

export default function IndexPage() {
  return <ProfilePage />;
}
