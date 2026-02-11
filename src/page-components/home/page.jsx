import HeroSection from "../../components/app-hero/text-hero.component";
import GallerySection from "../../components/pages/home/gallery.component";
import CrochetListWrapper from "../../components/pages/home/list-wrapper.component";
import ViewMoreButton from "../../components/pages/home/view-more-button.component";
import SignupPrompt from "../../components/signup/signup.component";

const HomePage = ({ t }) => {
  return (
    <>
      <HeroSection
        heroInit={t("heroInit")}
        heroMiddle={t("heroMiddle")}
        heroLast={t("heroLast")}
        description={t("heroDescription")}
        primaryCtaLabel={t("heroPrimaryCta")}
        secondaryCtaLabel={t("heroSecondaryCta")}
      />

      <section id="listing" className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 py-8 md:py-12" data-aos="fade-up">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {t("listing")}
              </h2>
              <p className="text-base md:text-lg text-gray-600">
                {t("message")}
              </p>
            </div>
            <div className="flex-shrink-0">
              <ViewMoreButton text={t("view-more")} href="/shop" />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 pb-12 md:pb-20" data-aos="fade-up">
        <div className="max-w-7xl mx-auto">
          <CrochetListWrapper />
        </div>
      </section>

      <GallerySection
        title={t("crochetaftercare")}
        subSummary={t("subSummary")}
        buttonText={t("btn")}
        summary={t("summary")}
      />

      <SignupPrompt />
    </>
  );
};

export default HomePage;
