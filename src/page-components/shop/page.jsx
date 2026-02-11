import ShopHero from "../../components/shared/shop-hero.component";
import CrochetListWrapper from "../../components/pages/home/list-wrapper.component";
import ShopFilter from "../../components/pages/shop/shop-filter.component";

const ShopPage = ({ title, description, filterParams }) => {
  return (
    <div>
      <ShopHero title={title} description={description} />
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 py-8 md:py-12" data-aos="fade-up">
        <div className="max-w-7xl mx-auto space-y-6">
          <ShopFilter />
          <CrochetListWrapper filterParams={filterParams ?? {}} />
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
