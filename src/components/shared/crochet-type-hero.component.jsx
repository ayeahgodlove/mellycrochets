import { Breadcrumb } from "@/components/ui";

const CrochetTypeHero = ({ title, description, breadcrumbs }) => {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16 md:py-20 px-6">
      {/* Background gradient + orbs, consistent with main hero language */}
      <div
        className="absolute inset-0 hero-gradient-bg"
        style={{
          background:
            "linear-gradient(135deg, #fef8f5 0%, #fdf2ed 40%, #fce8e0 75%, #f5e6e1 100%)",
        }}
        aria-hidden
      />
      <div
        className="absolute -top-8 left-4 w-40 h-40 rounded-full opacity-40 hero-glow-pulse"
        style={{ background: "radial-gradient(circle, #c9a87c 0%, transparent 70%)" }}
        aria-hidden
      />
      <div
        className="absolute -bottom-12 right-4 w-48 h-48 rounded-full opacity-30 hero-glow-pulse"
        style={{ background: "radial-gradient(circle, #82181a 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="relative z-10 text-center max-w-3xl mx-auto p-6 md:p-10 lg:p-12 animate-fade-in-up">
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#1a1a1a] mb-4">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-[#3d3d3d] max-w-2xl mx-auto mb-6">
          {description}
        </p>
        <Breadcrumb
          items={[
            {
              title: "Home",
              href: "/",
            },
            ...(breadcrumbs || []).map((item) => ({
              title: item.title,
              href: item.href,
            })),
          ]}
          style={{ display: "flex", justifyContent: "center" }}
        />
      </div>
    </section>
  );
};

export default CrochetTypeHero;
