"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function extractTexts(node: any, result: string[] = []): string[] {
  if (!node) return result;

  // If this node has text
  if (node.type === "text" && node.text) {
    result.push(String(node.text));
  }

  // If this node has children
  if (node.children && Array.isArray(node.children)) {
    node.children.forEach((child: any) => extractTexts(child, result));
  }

  return result;
}

export default function Hero() {
  const [data, setData] = useState<any | null>(null);
  const [aboutData, setAboutData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetch("/api/pages?where[slug][equals]=home&depth=2");
        const res = await data.json();

        if (res) {
          setData(res.docs[0].hero);
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);


  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/pages?where[slug][equals]=about&depth=2");
        const json = await res.json();
        if (json?.docs?.length) {
          setAboutData(json.docs[0]);
        }
      } catch (error) {
        console.error("About fetch error", error);
      }
    })();
  }, []);

  let text: string[] = [];

  if (data) {
    text = extractTexts(data.richText.root);
  }

 const subtitle = text?.[0] || "KHFOOD PRESENTS";
 const title = text?.[1] || "BEST PEANUTS ON EARTH";


 let aboutText: string[] = [];
 if (aboutData?.richText?.root) {
    aboutText = extractTexts(aboutData.richText.root);
 }


 const since = aboutText?.[0] || "SINCE 1990";
 const aboutTitle1 = aboutText?.[1] || "A LITTLE STORY";
 const aboutTitle2 = aboutText?.[2] || "ABOUT US";
 const aboutDescription = aboutText?.[3] || "For nearly three decades, our vision for our peanuts stands the same.";
 const aboutButton = aboutText?.[4] || "KNOW MORE";

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="relative w-full md:h-[100svh] h-[100svh] overflow-hidden font-sans">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="./assets/Image/khfoodImage/IMG_5385.mov" // better to use local video
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark Overlay - Increased opacity slightly to make white text pop like the image */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* CENTER TEXT CONTAINER (New wrapper to center both texts together) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-full px-4 z-20">
        {/* --- NEW: SUBTITLE WITH LINES --- */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }} // Slight delay before title starts
          className="flex items-center gap-3 sm:gap-6 mb-2 sm:mb-4 opacity-90"
        >
          {/* Left Line */}
          <div className="h-[1px] w-12 sm:w-24 bg-white"></div>

          <p className="text-white uppercase tracking-[0.2em] text-xs sm:text-sm md:text-base font-semibold text-center whitespace-nowrap">
            {subtitle}
          </p>

          {/* Right Line */}
          <div className="h-[1px] w-12 sm:w-24 bg-white"></div>
        </motion.div>

        {/* --- MODIFIED MAIN TITLE --- */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          // Updated classes for solid white, bold text like the image
          className="
            text-[42px] sm:text-[60px] md:text-[80px] lg:text-[100px]
            font-extrabold 
            text-white 
            uppercase
            whitespace-nowrap
            leading-none
            text-center
          "
          // REMOVED THE WEBKIT STROKE STYLE
        >
          {title}
        </motion.h1>
      </div>

      {/* Bottom Content (Unchanged) */}
      <div
        className="
          absolute bottom-8 sm:bottom-12 md:bottom-16
          w-full px-5 sm:px-10
          flex flex-col md:flex-row
          gap-6 md:gap-0
          justify-between items-start md:items-end
          z-20
        "
      >
        {/* Left Title (Empty placeholder as in your original code) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-white max-w-lg"
        ></motion.div>

        {/* Right Button (Unchanged) */}
        <motion.a
          href="#shop"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="
            bg-white text-black
            px-5 sm:px-6 py-2.5 sm:py-3
            rounded-md shadow font-semibold
            flex items-center gap-2
            hover:bg-gray-100 transition
            text-sm sm:text-base
          "
        >
          SHOP NOW
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </motion.a>
      </div>
    </section>
  );
}
