import { FaFacebookF, FaTwitter } from "react-icons/fa";

<footer className="bg-gradient-to-b from-[#1c1c1c] to-[#111] text-gray-300">
  <div className="max-w-7xl mx-auto px-6 py-20">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

      {/* ABOUT */}
      <div>
        <img
          src="/assets/Image/khfoodImage/khfood_logo.png"
          alt="KH Food"
          className="w-36 mb-6"
        />

        <p className="text-sm leading-relaxed text-gray-400">
          K H Food became a company in Orange County, California in 1991.
          With a vision to become the highest quality peanut company in California.
        </p>

        <div className="flex gap-4 mt-6">
          <FaFacebookF className="text-lg cursor-pointer hover:text-primary transition" />
          <FaTwitter className="text-lg cursor-pointer hover:text-primary transition" />
        </div>
      </div>

cc
      {/* QUICK LINKS */}
      <div>
        <h3 className="text-primary font-semibold text-lg mb-6">Quick Links</h3>
        <ul className="space-y-3 text-sm">
          {[
            "Home",
            "FAQs",
            "About Us",
            "Wholesale",
            "Contact Us",
            "Store Locator",
          ].map((item) => (
            <li key={item}>
              <a
                href="#"
                className="hover:text-primary transition hover:pl-1 inline-block"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* CONTACT */}
      <div>
        <h3 className="text-primary font-semibold text-lg mb-6">Contact Us</h3>

        <p className="text-sm mb-3">(714) 639-1201</p>
        <p className="text-sm mb-3">contact@khfood.com</p>
        <p className="text-sm leading-relaxed">
          585 Yorbit Rd.<br />
          La Puente, CA 91744
        </p>
      </div>

      {/* SUBSCRIBE */}
      <div>
        <h3 className="text-primary font-semibold text-lg mb-6">Subscribe</h3>

        <p className="text-sm mb-4 text-gray-400">
          Enter your email to receive updates and offers.
        </p>

        <div className="flex overflow-hidden rounded-md shadow-md">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 py-3 text-sm text-gray-800 outline-none"
          />
          <button className="bg-green-500 px-5 flex items-center justify-center hover:bg-green-600 transition">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2.94 2.94l14.12 7.06-14.12 7.06L3 12l9-2-9-2 0-5.06z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>

  {/* BOTTOM BAR */}
  <div className="border-t border-gray-700 bg-[#0d0d0d]">
    <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
      <p>
        © 1991–2025 K H Food Corp. All rights reserved.
      </p>
      <p>
        Managed by{" "}
        <a href="#" className="text-primary font-medium hover:underline">
          CODIFIED
        </a>
      </p>
    </div>
  </div>
</footer>
