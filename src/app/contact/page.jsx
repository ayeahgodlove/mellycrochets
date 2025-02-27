import ContactSection from "../../components/contact/contact.component";
import Footer from "../../components/footer/footer.component";
import AppNavigation from "../../components/nav.component";
import "../../assets/css/globals.css";

export default function Contact() {
  return (
    <div>
      <AppNavigation />
      {/* Hero Section */}
      <section className="bg-gray-950 text-white py-16 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="text-lg mt-4">
            Get in touch for inquiries, consultations, or car purchases.
          </p>
        </div>
      </section>

      {/* Contact Details */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
