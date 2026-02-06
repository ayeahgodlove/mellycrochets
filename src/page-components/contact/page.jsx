import ContactSection from "../../components/contact/contact.component";
import "../../assets/css/globals.css";

const ContactPage = ({ t }) => {
  return (
    <div>
      <div className="relative w-full bg-gray-100 py-20 px-6 flex flex-col items-center text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-200 opacity-80"></div>

        <div className="relative z-10 text-center max-w-3xl p-6 md:p-12 lg:p-16 animate-fade-in-up">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            {t("heroTitle")}
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mb-6">
            {t("heroDescription")}
          </p>
        </div>
      </div>

      <ContactSection />
    </div>
  );
};

export default ContactPage;
