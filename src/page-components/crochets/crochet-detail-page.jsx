import CrochetTypeHero from "../../components/shared/crochet-type-hero.component";
import { TrustBadge } from "../../components/shared/payment.component";
import CrochetDetail from "../../components/pages/crochet/crochet-detail.component";

const CrochetDetailPage = ({ crochet }) => {
  return (
    <>
      <CrochetTypeHero
        title={crochet.name}
        description={crochet.description}
        breadcrumbs={[
          { title: "Shop", href: "/shop" },
          { title: crochet.name, href: "#" },
        ]}
      />

      <CrochetDetail crochet={crochet} />

      <TrustBadge />
    </>
  );
};

export default CrochetDetailPage;
