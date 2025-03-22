import ContactSection from "../../components/contact/contact.component";
import Image from "next/image";
import "../../assets/css/globals.css";
import { FiFacebook, FiInstagram, FiX } from "react-icons/fi";
import { RiTiktokFill } from "react-icons/ri";

export default function About() {
  return (
    <>
      <section className="bg-[#fcf8f8] text-gray-700">
        {/* Hero Section */}
        <div className="text-center py-16 px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-red-700">About MellyCrochets</h1>
          <p className="text-lg leading-relaxed">
            MellyCrochets ETS is a fashion-forward crochet brand that creates
            timeless, eco-friendly, and biodegradable fashion using natural wool
            and cotton. Our mission is to craft high-quality, long-lasting, and
            recyclable pieces that bring warmth, beauty, and sustainability to
            wardrobes of all age groups and genders.
          </p>
        </div>

        <section className="bg-gray-50 py-10 px-6 md:px-12">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Connect With Us</h2>
            <p className="text-gray-600 mb-6">
              Follow us online to stay updated with new arrivals, behind-the-scenes, and all things handmade.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-6">
              <a href="https://www.instagram.com/mellycrochets_" target="_blank" className="flex items-center gap-3 text-pink-600 hover:underline">
                <FiInstagram size={22} /> @mellycrochets_
              </a>
              <a href="https://facebook.com/MellycrochetsETS" target="_blank" className="flex items-center gap-3 text-blue-700 hover:underline">
                <FiFacebook size={22} /> Mellycrochets ETS
              </a>
              <a href="https://tiktok.com/@mellycrochets_" target="_blank" className="flex items-center gap-3 text-black hover:underline">
                <RiTiktokFill size={22} /> @mellycrochets_
              </a>
              <a href="https://x.com/mellycrochets" target="_blank" className="flex items-center gap-3 text-gray-800 hover:underline">
                <FiX size={22} /> @mellycrochets
              </a>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <div className="bg-white py-12 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-semibold text-red-950 mb-4">Our Mission</h2>
              <p className="text-base leading-relaxed">
                Our mission is to promote sustainable fashion through handcrafted crochet designs made from
                biodegradable and eco-friendly materials. We strive to produce fashionable, long-lasting pieces that
                not only elevate your style but also support a greener planet. Every product is a blend of tradition,
                creativity, and conscious living.
              </p>
            </div>
            <Image
              src="/mellycrochets/ten.jpg"
              alt="Mission"
              width={500}
              height={400}
              className="rounded-xl shadow-lg object-cover"
            />
          </div>
        </div>

        {/* Meet the Maker Section */}
        <div className="py-12 px-6 max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-red-950 mb-4">Meet the Maker</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <Image
              src="/mellycrochets/five.jpg"
              alt="Founder"
              width={192}
              height={192}
              className="w-48 h-48 rounded-full object-cover shadow-md"
            />
            <p className="text-base leading-relaxed">
              Behind every stitch is a story, and behind every design is a maker with a dream. Our founder — a
              passionate artisan with years of experience — leads the creative process at MellyCrochets ETS. Her
              journey from childhood hobbyist to full-time entrepreneur embodies the dedication, love, and craftsmanship
              that go into every MellyCrochets product. Her passion has also extended beyond production — she has
              trained over 15 individuals in the art of crocheting, with at least four of them launching their own
              crochet businesses.
            </p>
          </div>
        </div>

        {/* Customer Testimonials */}
        <div className="py-12 px-6 max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-red-950 mb-6 text-center">What Our Customers Say</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-sm italic">&quot;Absolutely love my handmade crochet tote bag! You can feel the quality and care.&quot;</p>
              <span className="block mt-2 text-sm font-semibold text-red-700">– Sarah M.</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-sm italic">&quot;Perfect baby blanket. Soft, beautiful, and arrived so quickly!&quot;</p>
              <span className="block mt-2 text-sm font-semibold text-red-700">– Emma T.</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-12 px-6">
          <h2 className="text-2xl font-semibold text-red-950 mb-4">Ready to Cozy Up?</h2>
          <p className="text-base mb-6">Explore our handmade collection and bring home something special today.</p>
          <a href="/crochets" className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full transition">
            Shop Now
          </a>
        </div>
      </section>
      <ContactSection />
    </>
  );
}
