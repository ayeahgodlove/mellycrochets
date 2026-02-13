import CrochetTypeHero from "../../components/shared/crochet-type-hero.component";
import CrochetListWrapper from "../../components/pages/home/list-wrapper.component";
import ShopFilter from "../../components/pages/shop/shop-filter.component";

const ShopPage = ({ title, description, filterParams, heroImages = [] }) => {
  return (
    <div>
      <CrochetTypeHero
        title={title}
        description={description}
        breadcrumbs={[{ title: "Shop", href: "/shop" }]}
        images={heroImages}
      />
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 pt-6 pb-10 md:pt-8 md:pb-12" data-aos="fade-up">
        <div className="max-w-7xl mx-auto space-y-6">
          <ShopFilter />
          <CrochetListWrapper
            key={[filterParams?.name ?? "", filterParams?.crochetTypeId ?? ""].join("|")}
            filterParams={filterParams ?? {}}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
