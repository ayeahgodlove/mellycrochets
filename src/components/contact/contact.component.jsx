"use client";
import { FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

const ContactSection = () => {
  return (
    <section className="bg-[#f9f9f9] py-16 px-6 md:px-16">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-left">
          <h2 className="text-3xl font-bold text-[#28041b]">Get in Touch</h2>
          <p className="text-gray-700">
            We are here to assist you with all your crochet orders, custom
            designs, and inquiries.
          </p>
          <div>
            <p className="text-lg font-semibold text-red-950">Location:</p>
            <div className="flex items-center justify-start">
              <FaMapMarkerAlt className="text-xl text-gray-700 mr-2 mb-3" />
              <p className="text-gray-700">Bamenda, Cameroon</p>
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold text-red-950">Phone:</p>
            <div className="flex items-center justify-start">
              <FaPhoneAlt className="text-xl text-gray-700 mr-2 mb-3" />
              <p className="text-gray-700 font-semibold">
                237681077051 / 237640922135
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/237681077051"
            target="_blank"
            className="contact-link"
          >
            <span>Chat on WhatsApp</span>
            <FaWhatsapp size={25} style={{ marginLeft: 5 }} />
          </a>
        </div>

        <div className="bg-white shadow-xl rounded-lg p-8">
          <h3 className="text-2xl font-bold text-[#28041b] mb-4 text-center">
            Send Us a Message
          </h3>
          <p className="text-gray-700 text-center mb-4">
            Have a custom crochet design in mind? Need help choosing a size or
            color? Drop us a message!
          </p>
          <form className="space-y-10">
            <div className="mb-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fdf3f3]"
              />
            </div>

            <div className="mb-5">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fdf3f3]"
              />
            </div>

            <div className="mb-5">
              <textarea
                placeholder="Tell us about your crochet needs (custom orders, sizes, colors, etc.)"
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fdf3f3]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#fdf3f3] text-white font-semibold rounded-md shadow-md hover:bg-[#ffe2e2] transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
