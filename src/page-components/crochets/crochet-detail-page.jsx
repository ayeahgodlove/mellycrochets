import CrochetTypeHero from "../../components/shared/crochet-type-hero.component";
import { TrustBadge } from "../../components/shared/payment.component";
import CrochetDetail from "../../components/pages/crochet/crochet-detail.component";

const baseUrl = process.env.NEXTAUTH_URL || "";

const CrochetDetailPage = ({ crochet }) => {
  const images = (crochet?.imageUrls || []).map((u) => `${baseUrl}/uploads/crochets/${u}`).filter(Boolean);
  return (
    <>
      <CrochetTypeHero
        title={crochet.name}
        description={crochet.description}
        breadcrumbs={[
          { title: "Shop", href: "/shop" },
          { title: crochet.name, href: "#" },
        ]}
        images={images}
      />

      <CrochetDetail crochet={crochet} />

      <TrustBadge />
    </>
  );
};

export default CrochetDetailPage;
