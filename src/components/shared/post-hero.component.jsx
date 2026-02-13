const BlogHero = ({ title, description }) => {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16 md:py-24 px-6">
      {/* Background gradient with subtle rounded accent to hint blog identity */}
      <div
        className="absolute inset-0 hero-gradient-bg rounded-br-[40%] rounded-bl-[40%]"
        style={{
          background:
            "linear-gradient(135deg, #fef8f5 0%, #fdf2ed 35%, #fce8e0 70%, #f1e4de 100%)",
        }}
        aria-hidden
      />
      <div
        className="absolute -top-10 left-10 w-48 h-48 rounded-full opacity-35 hero-glow-pulse"
        style={{ background: "radial-gradient(circle, #c9a87c 0%, transparent 70%)" }}
        aria-hidden
      />
      <div
        className="absolute bottom-0 right-8 w-56 h-56 rounded-full opacity-30 hero-glow-pulse"
        style={{ background: "radial-gradient(circle, #82181a 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="relative z-10 text-center max-w-3xl mx-auto p-6 md:p-10 lg:p-12 animate-fade-in-up">
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#1a1a1a] leading-tight mb-4">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-[#3d3d3d] max-w-2xl mx-auto">
          {description}
        </p>
      </div>
    </section>
  );
};

export default BlogHero;
