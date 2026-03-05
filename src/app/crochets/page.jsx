import { getTranslations } from "next-intl/server";
import { CrochetRepository } from "../../data/repositories/crochet.repository";
import CrochetListWrapper from "../../components/pages/home/list-wrapper.component";
import BannerWithSlider from "../../components/pages/shared/banner-with-slider.component";

const baseUrl = process.env.NEXTAUTH_URL || "https://mellycrochets.shop";
const crochetRepository = new CrochetRepository();

function buildHeroSlides(crochets, url) {
  if (!Array.isArray(crochets) || crochets.length === 0) return [];
  const uploadsBase = `${url}/uploads/crochets`;

  return crochets
    .slice(0, 8)
    .map((c) => {
      const urls = c.imageUrls;
      const arr = Array.isArray(urls)
        ? urls
        : typeof urls === "string"
        ? [urls]
        : [];
      const first = arr[0];
      if (!first) return null;
      const imgUrl = first.startsWith("http") ? first : `${uploadsBase}/${first}`;
      return {
        url: imgUrl,
        alt: c.name || "MellyCrochets product",
      };
    })
    .filter(Boolean);
}

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Crochets | MellyCrochets Shop",
    template: "%s | MellyCrochets Shop",
  },
  description:
    "Explore all crochet pieces from MellyCrochets, including dresses, tops, hats, beachwear, accessories, and more handmade creations.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/crochets",
  },
};

export default async function CrochetsIndexPage() {
  const t = await getTranslations("shop");

  let slides = [];
  try {
    const crochets = await crochetRepository.getAll();
    slides = buildHeroSlides(crochets || [], baseUrl);
  } catch {
    // Fallback to default image handled inside BannerWithSlider
  }

  return (
    <main className="min-h-screen bg-white">
      <BannerWithSlider
        eyebrow="Signature crochet collection"
        title="Buy handcrafted"
        highlight="crochet pieces online"
        description="Explore our full range of handcrafted crochet clothing and accessories — from everyday staples to statement designs — curated with the MellyCrochets aesthetic in mind."
        primaryLabel="Shop crochets"
        primaryHref="/crochets"
        secondaryLabel="Browse by design"
        secondaryHref="/crochet-designs"
        slides={slides}
      />

      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 pt-6 pb-12 md:pt-8 md:pb-16">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="border border-slate-100 rounded-3xl bg-white/80 shadow-sm shadow-slate-100/60">
            <div className="px-4 sm:px-6 md:px-7 pt-4 pb-2 border-b border-slate-100/80 flex items-baseline justify-between gap-3">
              <div>
                <h2 className="text-sm sm:text-base font-semibold text-slate-900">
                  {t("heroTitle")}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  {t("heroDescription")}
                </p>
              </div>
            </div>
            <div className="px-3 sm:px-4 md:px-6 pb-6 pt-4">
              <CrochetListWrapper />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

