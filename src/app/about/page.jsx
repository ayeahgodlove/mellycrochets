import ContactSection from "../../components/contact/contact.component";
import Image from "next/image";
import "../../assets/css/globals.css";

export default function About() {
  return (
    <>
      <section class="bg-[#fcf8f8] text-gray-700">
        {/* <!-- Hero Section --> */}
        <div class="text-center py-16 px-6 max-w-4xl mx-auto">
          <h1 class="text-4xl font-bold mb-4 text-red-700">
            About MellyCrochets
          </h1>
          <p class="text-lg leading-relaxed">
            Handcrafted crochet pieces made with love, passion, and a touch of
            warmth — from our hooks to your home.
          </p>
        </div>

        {/* <!-- Our Story --> */}
        <div class="max-w-5xl mx-auto px-6 py-12">
          <h2 class="text-2xl font-semibold text-red-950 mb-4">Our Story</h2>
          <p class="text-base leading-relaxed">
            MellyCrochets began with a simple passion for yarn and a dream to
            share handmade joy with the world. From cozy blankets to adorable
            baby booties, each piece tells a story woven with care.
          </p>
        </div>

        {/* <!-- Our Mission --> */}
        <div class="bg-white py-12 px-6">
          <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 class="text-2xl font-semibold text-red-950 mb-4">
                Our Mission
              </h2>
              <p class="text-base leading-relaxed">
                We aim to celebrate the art of crochet, promote slow fashion,
                and bring warmth and charm to everyday life through handcrafted
                pieces.
              </p>
            </div>
            <img
              src="/mellycrochets/ten.jpg"
              alt="Mission"
              class="rounded-xl shadow-lg"
              style={{
                height: 400,
                width: "100%",
                objectFit: "cover",
                backgroundPosition: "top"
              }}
            />
          </div>
        </div>

        {/* <!-- Meet the Maker --> */}
        <div class="py-12 px-6 max-w-5xl mx-auto">
          <h2 class="text-2xl font-semibold text-red-950 mb-4">
            Meet the Maker
          </h2>
          <div class="flex flex-col md:flex-row gap-8 items-center">
            <img
              src="/mellycrochets/five.jpg"
              alt="Founder"
              class="w-48 h-48 rounded-full object-cover shadow-md"
            />
            <p class="text-base leading-relaxed">
              Hi, I&rsquo;m Melly — the heart and hands behind MellyCrochets. Crochet
              is more than a craft to me; it&rsquo;s a connection to tradition,
              creativity, and community. I started this shop to share my love of
              handmade treasures and create pieces that warm both homes and
              hearts.
            </p>
          </div>
        </div>

        {/* <!-- What Makes Us Special --> */}
        <div class="bg-red-100 py-12 px-6">
          <div class="max-w-5xl mx-auto">
            <h2 class="text-2xl font-semibold text-red-950 mb-6 text-center">
              What Makes Us Special
            </h2>
            <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div class="bg-white p-6 rounded-lg shadow">
                <h3 class="text-lg font-semibold text-red-700 mb-2">
                  Handmade With Love
                </h3>
                <p class="text-sm">
                  Every item is carefully crocheted by hand — no machines, just
                  heart and soul.
                </p>
              </div>
              <div class="bg-white p-6 rounded-lg shadow">
                <h3 class="text-lg font-semibold text-red-700 mb-2">
                  Sustainable Materials
                </h3>
                <p class="text-sm">
                  We use eco-friendly yarn and packaging to protect our planet.
                </p>
              </div>
              <div class="bg-white p-6 rounded-lg shadow">
                <h3 class="text-lg font-semibold text-red-700 mb-2">
                  Custom Orders
                </h3>
                <p class="text-sm">
                  Looking for something unique? We craft personalized crochet
                  gifts just for you.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Testimonials --> */}
        <div class="py-12 px-6 max-w-5xl mx-auto">
          <h2 class="text-2xl font-semibold text-red-950 mb-6 text-center">
            What Our Customers Say
          </h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-white p-6 rounded-lg shadow">
              <p class="text-sm italic">
                "Absolutely love my handmade crochet tote bag! You can feel the
                quality and care."
              </p>
              <span class="block mt-2 text-sm font-semibold text-red-700">
                – Sarah M.
              </span>
            </div>
            <div class="bg-white p-6 rounded-lg shadow">
              <p class="text-sm italic">
                "Perfect baby blanket. Soft, beautiful, and arrived so quickly!"
              </p>
              <span class="block mt-2 text-sm font-semibold text-red-700">
                – Emma T.
              </span>
            </div>
          </div>
        </div>

        {/* <!-- Call to Action --> */}
        <div class="text-center py-12 px-6">
          <h2 class="text-2xl font-semibold text-red-950 mb-4">
            Ready to Cozy Up?
          </h2>
          <p class="text-base mb-6">
            Explore our handmade collection and bring home something special
            today.
          </p>
          <a
            href="/crochets"
            class="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full transition"
          >
            Shop Now
          </a>
        </div>
      </section>

      {/* ContactSection  */}
      <ContactSection />
    </>
  );
}
