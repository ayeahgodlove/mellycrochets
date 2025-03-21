import { Button } from "antd";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

const buttonStyles = {
  base: {
    padding: 5,
    border: "none",
    color: "white",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    borderRadius: 30,
    cursor: "pointer",
    fontSize: "16px",
  },
  whatsapp: {
    background: "#25D366",
  },
  facebook: {
    background: "#1877F2",
  },
  instagram: {
    background:
      "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
  },
  twitter: {
    background: "#1DA1F2",
  },
  linkedIn: {
    background: "#0077b5",
  },
};

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-gray-950 via-black to-gray-950 text-white pt-12 pb-3 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Social Media */}
        <div>
          <h4 className="text-xl font-semibold mb-3">Social Media Pages</h4>
          <div className="flex gap-4">
            <Button
              href="#"
              shape="circle"
              icon={<FaFacebookF size={24} className="text-blue-500" />}
              style={{
                ...buttonStyles.base,
                ...buttonStyles.facebook,
              }}
            />
            <Button
              href="#"
              shape="circle"
              icon={<FaTwitter size={24} className="text-blue-500" />}
              style={{
                ...buttonStyles.base,
                ...buttonStyles.twitter,
              }}
            />

            <Button
              href="#"
              shape="circle"
              icon={<FaInstagram size={24} className="text-pink-400" />}
              style={{
                ...buttonStyles.base,
                ...buttonStyles.instagram,
              }}
            />

            <Button
              href="#"
              shape="circle"
              icon={<FaLinkedinIn size={24} className="text-blue-400" />}
              style={{
                ...buttonStyles.base,
                ...buttonStyles.linkedIn,
              }}
            />
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-xl font-semibold mb-3">Links</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="footer-link">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="footer-link">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/aftercare" className="footer-link">
                Aftercare
              </Link>
            </li>
            <li>
              <Link href="/crochets" className="footer-link">
                Crochet Listings
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-xl font-semibold mb-3">Contact Us</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <FiMapPin className="text-red-400" />
              <span className="text-lg">Douala, Cameroon</span>
            </li>
            <li className="flex items-center gap-2">
              <FiPhone className="text-green-400" />
              <Link href="tel:+237674757243" className="footer-link">
                +237 681 077 051 /640 922 135
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <FiMail className="text-blue-400" />
              <Link
                href="mailto:info@mellycrochets.org"
                className="footer-link"
              >
                info@mellycrochets.org
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="text-center pt-6">
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} MellyCrochets & Services. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
