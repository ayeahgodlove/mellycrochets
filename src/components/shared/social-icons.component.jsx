import React from "react";
import {
  FaWhatsapp,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";

const SocialIcons = () => {
  return (
    <div className="social-links pt-15 pb-20 md:pb-30">
      <h1 className="heading1 font-playfair text-black">Let&apos;s Connect Via</h1>
      <div className="icons">
        <a
          href="https://wa.me/your-number"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp
            className="social-icon whatsapp"
            style={{
              padding: 5,
              border: "none",
              background: "#25D366",
              color: "white",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              borderRadius: 30,
            }}
          />
        </a>
        <a
          href="https://instagram.com/your-profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram
            className="social-icon instagram"
            style={{
              padding: 5,
              border: "none",
              background:
                "linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)",
              color: "white",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              borderRadius: 30,
            }}
          />
        </a>
        <a
          href="https://twitter.com/your-profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaXTwitter
            className="social-icon twitter"
            style={{
              padding: 5,
              border: "none",
              background: "white",
              borderRadius: 30,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              color: "black", // X logo is always black
            }}
          />
        </a>
        <a href="mailto:your-email@gmail.com">
          <BiLogoGmail
            className="social-icon gmail"
            style={{
              padding: 5,
              border: "none",
              background: "white",
              borderRadius: 30,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              backgroundClip: "padding-box",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundImage:
                "linear-gradient(45deg, #ea4335, #4285f4, #fbbc05, #34a853)",
            }}
          />
        </a>
        <a
          href="https://www.tiktok.com/@your-profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTiktok
            className="social-icon tiktok"
            style={{
              padding: 5,
              border: "none",
              background: "white",
              borderRadius: 30,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              backgroundClip: "padding-box",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundImage: "linear-gradient(45deg, #69C9D0, #EE1D52)",
            }}
          />
        </a>
      </div>
    </div>
  );
};

export default SocialIcons;
