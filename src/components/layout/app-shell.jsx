"use client";

import { usePathname } from "next/navigation";
import AppNavigation from "../nav.component";
import Footer from "../footer/footer.component";
import PrivacyConsent from "../privacy-policy/privacy-policy.component";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

const ContactItems = () => (
  <>
    <span className="hidden sm:flex items-center gap-1.5 shrink-0">
      <FiMapPin className="shrink-0" size={12} aria-hidden />
      Bamenda, Cameroon
    </span>
    <a
      href="tel:+237681077051"
      className="flex items-center gap-1.5 hover:text-white transition-colors shrink-0"
    >
      <FiPhone className="shrink-0" size={12} aria-hidden />
      +237 681 077 051 / 640 922 135
    </a>
    <a
      href="mailto:mellycrochets25@gmail.com"
      className="flex items-center gap-1.5 hover:text-white transition-colors shrink-0 sm:break-all"
    >
      <FiMail className="shrink-0" size={12} aria-hidden />
      mellycrochets25@gmail.com
    </a>
  </>
);

const TopContactBar = () => (
  <div
    className="w-full bg-[#82181a] text-white/95 px-4 py-1.5 text-xs"
    role="complementary"
    aria-label="Contact information"
  >
    <div className="max-w-7xl mx-auto hidden sm:flex flex-wrap items-center justify-center gap-x-4 gap-y-1 sm:gap-x-6">
      <ContactItems />
    </div>
    <div className="sm:hidden overflow-hidden w-full">
      <div className="inline-flex whitespace-nowrap animate-hero-marquee gap-6 py-0.5 will-change-transform">
        <ContactItems />
        <span className="text-white/60 shrink-0" aria-hidden> • </span>
        <ContactItems />
        <span className="text-white/60 shrink-0" aria-hidden> • </span>
      </div>
    </div>
  </div>
);

const AppShell = ({ children }) => {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full">
        <TopContactBar />
        <AppNavigation />
      </header>
      <div className="pt-24">
        {children}
        <Footer />
        <PrivacyConsent />
      </div>
    </>
  );
};

export default AppShell;
