export default function HeroSection({
  heroInit,
  heroMiddle,
  heroLast,
  description,
}) {
  return (
    <section className="relative flex items-center justify-center h-[70vh] md:h-screen bg-white z-0">
      <div className="relative z-10 text-center p-6 md:p-12 lg:p-16 animate-fade-in-up">
        <h1 className="text-5xl font-extrabold md:text-7xl text-[#101828]">
          {heroInit} <span className="text-[#82181a]">{heroMiddle}</span>{" "}
          {heroLast}
        </h1>
        <p className="mt-4 text-lg md:text-2xl max-w-2xl mx-auto text-[#101828]">
          {description}
        </p>
        {/* <p>
          Check out our <a href="/shop">shop</a> for more crochet items.
        </p> */}
      </div>
    </section>
  );
}
