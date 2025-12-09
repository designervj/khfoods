import Link from "next/link";
import { getLocale } from "next-intl/server";

import { CMSLink } from "@/components/Link";
import { LocaleSwitch } from "@/components/LocaleSwitch/LocaleSwitch";
import { Logo } from "@/components/Logo/Logo";
import RichText from "@/components/RichText";
import { type Locale } from "@/i18n/config";
import { CurrencySelector } from "@/stores/Currency/CurrencySelector";
import { getCachedGlobal } from "@/utilities/getGlobals";

import type { Footer, ShopSetting } from "@/payload-types";
import { FaFacebookF, FaTwitter } from "react-icons/fa";

export async function Footer() {
  const locale = (await getLocale()) as Locale;
  const footerData: Footer = await getCachedGlobal("footer", locale, 1)();
  const shopSettings: ShopSetting = await getCachedGlobal("shopSettings", locale, 1)();
  const navItems = footerData?.navItems ?? [];

  
  return (
    // <footer className="1 mt-auto border-t border-border bg-black text-white dark:bg-card">
    //   <div className="container flex flex-col gap-8 py-8 md:flex-row md:justify-between">
    //     <Link className="flex items-center" href="/">
    //       <Logo /> 

         
    //     </Link>

    //     <div className="flex flex-col-reverse items-start gap-4 md:flex-row md:items-center">
    //       <CurrencySelector currencyOptions={shopSettings.availableCurrencies} />
    //       <LocaleSwitch />
    //       <nav className="flex flex-col gap-4 md:flex-row">
    //         {navItems.map(({ link }, i) => {
    //           return <CMSLink className="text-white" key={i} {...link} />;
    //         })}
    //       </nav>
    //     </div>
    //   </div>
    //   {footerData.attribution ? (
    //     <div className="flex border-t p-4 text-xs">
    //       <div className="container">
    //         <RichText data={footerData.attribution} />
    //       </div>
    //     </div>
    //   ) : null}
    // </footer>

    <footer className=" ">
      <div className=" mx-auto  bg-darker">
         <div className="max-w-7xl px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mx-auto py-20">
        {/* COLUMN 1 — ABOUT */}
        <div>
          <img
            src="/assets/Image/khfoodImage/khfood_logo.png"
            alt="KH FOOD"
            className="w-32 mb-6"
          />

          <p className="text-gray-300 leading-relaxed text-sm">
            K H Food became a company in Orange County, California in 1991.
            They had the vision to become the highest quality peanut company in California.
          </p>

          <div className="flex gap-4 mt-5">
            <FaFacebookF className="text-white text-xl cursor-pointer hover:text-primary" />
            <FaTwitter className="text-white text-xl cursor-pointer hover:text-primary" />
          </div>
        </div>

        {/* COLUMN 2 — QUICK LINKS */}
        <div>
          <h3 className="text-primary text-lg font-semibold mb-5">QUICK LINKS</h3>

          <ul className="space-y-3 text-gray-300 text-sm">
            <li><a href="#" className="hover:text-primary">Home</a></li>
            <li><a href="#" className="hover:text-primary">FAQS</a></li>
            <li><a href="#" className="hover:text-primary">About Us</a></li>
            <li><a href="#" className="hover:text-primary">Wholesale</a></li>
            <li><a href="#" className="hover:text-primary">Contact Us</a></li>
            <li><a href="#" className="hover:text-primary">STORE LOCATOR</a></li>
          </ul>
        </div>

        {/* COLUMN 3 — CONTACT */}
        <div>
          <h3 className="text-primary text-lg font-semibold mb-5">CONTACT US</h3>

          <p className="text-gray-300 text-sm mb-3">(714)639-1201</p>

          <p className="text-gray-300 text-sm mb-3">contact@khfood.com</p>

          <p className="text-gray-300 text-sm">
            585 Yorbit Rd.<br />La Puente, CA 91744
          </p>
        </div>

        {/* COLUMN 4 — SUBSCRIBE */}
        <div>
          <h3 className="text-primary text-lg font-semibold mb-5">SUBSCRIBE</h3>

          <p className="text-gray-300 text-sm mb-4">
            Enter your email address for our mailing list to keep yourself updated.
          </p>

          <div className="flex">
            <input
              type="text"
              placeholder="Your email address"
              className="px-4 py-2 w-full outline-none text-gray-800"
            />
            <button className="bg-green-500 px-5 flex items-center justify-center">
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

      {/* Bottom strip */}
      <div className="border-t border-gray-700 py-6 bg-[#171717]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between text-white font-semibold text-sm">

          <p>© 1991–2025 K H Food Corp. All rights reserved. KH logo is a trademark of KH Food Corp.</p>

          <p>
            Managed by <span className="text-white font-semibold"><a href="#" className="text-primary">CODIFIED</a></span>
          </p>

        </div>
      </div>
    </footer>
    
  );
}
