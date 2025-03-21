import ContactSection from "../../components/contact/contact.component";
import Image from "next/image";
import "../../assets/css/globals.css";

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <div
        className="relative h-[400px] bg-cover bg-center flex items-center justify-center text-center"
        style={{ backgroundImage: "url('/cars/car25.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative z-10 text-white px-6">
          <h1 className="text-4xl font-bold">About EMS</h1>
          <p className="mt-2 text-lg">
            Helping you buy reliable, fairly used cars from abroad with ease.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Company History & Mission */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
            <p className="text-lg text-gray-600 mt-4">
              At EMS, we help customers buy{" "}
              <strong>reliable, fairly used cars from Europe</strong> while
              avoiding the risks and hidden costs of second-hand car purchases.
            </p>
            <h3 className="text-2xl font-semibold text-gray-800 mt-6">
              Challenges We Solve
            </h3>
            <p className="mt-2 text-lg text-gray-600">
              Buying a used car can be tricky hidden defects, overpricing, and
              lack of trust. EMS simplifies this process by{" "}
              <strong>sourcing, inspecting, and delivering</strong> top-quality
              cars at competitive prices.
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src="/cars/bg2.jpg"
              width={500}
              height={300}
              alt="About EMS"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* ContactSection  */}
      <ContactSection />
    </>
  );
}
