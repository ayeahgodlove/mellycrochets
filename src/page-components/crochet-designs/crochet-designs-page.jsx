import CrochetList from "../../components/crochet/crochet-list.component";
import CrochetTypeHero from "../../components/shared/crochet-type-hero.component";

const CrochetDesignsPage = ({ crochetType }) => {
  return (
    <>
      <CrochetTypeHero
        title={crochetType.name}
        description={crochetType.description}
        breadcrumbs={[
          { title: "Crochet Designs", href: "/shop" },
          { title: crochetType.name, href: "#" },
        ]}
      />
      <div className="w-full px-10 pb-10">
        <CrochetList crochets={crochetType?.crochets} />
      </div>
    </>
  );
};

export default CrochetDesignsPage;
