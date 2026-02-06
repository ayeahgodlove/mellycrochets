import { Button, Card } from "@/components/ui";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative w-full bg-gray-100 py-20 px-6 flex flex-col items-center text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-200 opacity-80"></div>
        <div className="relative z-10 text-center max-w-3xl p-6 md:p-12 lg:p-16 animate-fade-in-up">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mb-6">
            Your privacy is important to us. This Privacy Policy explains how we
            collect, use, and protect your information when you use our website.
          </p>
        </div>
      </div>

      <div className="flex justify-center px-4 py-12">
        <Card className="w-full max-w-3xl shadow-lg rounded-2xl p-6 sm:p-10">
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              1. Information We Collect
            </h2>
            <p className="text-gray-700">
              We may collect basic information such as your name, email address,
              and purchase details.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-700">
              <li>Process and track your purchases</li>
              <li>Improve our services and user experience</li>
              <li>Send occasional promotional or product-related emails</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              3. Data Protection
            </h2>
            <p className="text-gray-700">
              We are committed to keeping your information safe and secure. Your
              personal data is stored securely and is only used for the purposes
              listed above.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              4. No Data Sharing
            </h2>
            <p className="text-gray-700">
              We do <strong>not sell, trade, or share</strong> your personal
              information with any third parties.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              5. Email Communication
            </h2>
            <p className="text-gray-700">
              By purchasing from us or subscribing to our updates, you agree to
              receive promotional emails. You can unsubscribe at any time by
              clicking the link in the email.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              6. Changes to This Policy
            </h2>
            <p className="text-gray-700">
              We may update this Privacy Policy occasionally. Any changes will
              be posted on this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              7. Contact Us
            </h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy, feel free to
              contact us via email or WhatsApp.
            </p>
            <Button
              href="/"
              type="primary"
              size="large"
              style={{ borderRadius: 30 }}
            >
              Back to Home
            </Button>
          </section>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
