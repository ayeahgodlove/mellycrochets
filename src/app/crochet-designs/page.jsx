import Link from "next/link";
import { CrochetTypeRepository } from "../../data/repositories/crochet-type.repository";
import { CrochetRepository } from "../../data/repositories/crochet.repository";
import CrochetTypeHero from "../../components/shared/crochet-type-hero.component";
import CrochetListWrapper from "../../components/pages/home/list-wrapper.component";
import BannerWithSlider from "../../components/pages/shared/banner-with-slider.component";

const crochetTypeRepository = new CrochetTypeRepository();
const crochetRepository = new CrochetRepository();
const baseUrl = process.env.NEXTAUTH_URL || "https://mellycrochets.shop";

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
    default: "Crochet Designs | MellyCrochets Shop",
    template: "%s | MellyCrochets Shop",
  },
  description:
    "Browse all crochet design categories from MellyCrochets, including dresses, tops, accessories, and more handmade creations.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/crochet-designs",
  },
};

export default async function CrochetDesignsIndexPage() {
  const crochetTypes = await crochetTypeRepository.getAll();

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
        eyebrow="Crochet design library"
        title="Buy from"
        highlight="our crochet design categories"
        description="Browse by style, silhouette, or occasion — from cozy pullovers and ruffle hats to beachwear and accessories — and jump straight into the pieces that match your aesthetic."
        primaryLabel="View all crochets"
        primaryHref="/crochets"
        secondaryLabel="Open full shop"
        secondaryHref="/shop"
        slides={slides}
      />

      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 pt-6 pb-12 md:pt-8 md:pb-16">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid gap-5 sm:gap-6 md:gap-7 md:grid-cols-2 xl:grid-cols-3">
            {crochetTypes?.map((type) => (
              <Link
                key={type.id}
                href={`/crochet-designs/${type.slug}`}
                className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-3xl"
              >
                <div className="rounded-3xl border border-rose-100/70 bg-white/90 shadow-sm shadow-rose-50/70 transition-all duration-200 group-hover:shadow-md group-hover:-translate-y-0.5 group-hover:border-rose-200/90">
                  <CrochetTypeHero
                    title={type.name}
                    description={type.description}
                    breadcrumbs={[
                      { title: "Crochet Designs", href: "/crochet-designs" },
                      { title: type.name, href: `/crochet-designs/${type.slug}` },
                    ]}
                    images={[]}
                  />
                </div>
              </Link>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-8 mt-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                  Browse all featured crochets
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  A curated selection of pieces from different design
                  categories, styled for everyday wear and special moments.
                </p>
              </div>
            </div>
            <div className="w-full">
              <CrochetListWrapper />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

