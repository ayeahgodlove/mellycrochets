import CrochetList from "../../components/crochet/crochet-list.component";
import CrochetTypeHero from "../../components/shared/crochet-type-hero.component";

const baseUrl = process.env.NEXTAUTH_URL || "";

/** Collect all crochet image URLs in this category for hero slides */
function collectCategoryHeroImages(crochets) {
  if (!Array.isArray(crochets)) return [];
  const urls = [];
  for (const c of crochets) {
    const list = c?.imageUrls || [];
    for (const u of list) {
      if (u) urls.push(`${baseUrl}/uploads/crochets/${u}`);
    }
  }
  return urls;
}

const CrochetDesignsPage = ({ crochetType }) => {
  const images = collectCategoryHeroImages(crochetType?.crochets);
  return (
    <>
      <CrochetTypeHero
        title={crochetType.name}
        description={crochetType.description}
        breadcrumbs={[
          { title: "Crochet Designs", href: "/shop" },
          { title: crochetType.name, href: "#" },
        ]}
        images={images}
      />
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 pt-6 pb-10 md:pt-8 md:pb-12">
        <CrochetList crochets={crochetType?.crochets} />
      </div>
    </>
  );
};

export default CrochetDesignsPage;
