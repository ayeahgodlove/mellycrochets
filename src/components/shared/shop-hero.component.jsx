const ShopHero = ({ title, description }) => {
  return (
    <section className="relative w-full overflow-hidden bg-white pt-12 pb-10 md:pt-16 md:pb-14 px-4 sm:px-6">
      <div
        className="absolute inset-0 hero-gradient-bg"
        style={{
          background:
            "linear-gradient(135deg, #fef8f5 0%, #fdf2ed 40%, #fce8e0 70%, #f5e6e1 100%)",
        }}
        aria-hidden
      />
      <div
        className="absolute -top-10 -left-10 w-52 h-52 rounded-full opacity-40 hero-glow-pulse"
        style={{ background: "radial-gradient(circle, #c9a87c 0%, transparent 70%)" }}
        aria-hidden
      />
      <div
        className="absolute -bottom-16 -right-8 w-60 h-60 rounded-full opacity-35 hero-glow-pulse"
        style={{ background: "radial-gradient(circle, #82181a 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto p-6 md:p-10 lg:p-12">
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#1a1a1a] leading-tight mb-4">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-[#3d3d3d] max-w-2xl mb-2 md:mb-3">
          {description}
        </p>
      </div>
    </section>
  );
};

export default ShopHero;
