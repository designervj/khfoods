"use client";

import React from "react";
import { Montserrat } from "next/font/google";
import { Activity, Phone, MapPin, Mail, Smartphone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

/**
 * Put your two hero images in /public/images/ and update these paths:
 *  /public/images/hero-left.png
 *  /public/images/hero-right.png
 */
const HERO_LEFT_IMG = "/images/hero-left.png";
const HERO_RIGHT_IMG = "/images/hero-right.png";

export default function Page() {
    return (
        <div className={montserrat.className}>
            <section className="relative w-full overflow-hidden pt-[120px]"
                style={{ backgroundImage: "url('/assets/Image/bg-banner.png')", backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                <div className="mx-auto flex min-h-[260px] max-w-7xl items-center justify-center px-5 py-14 sm:px-6 md:min-h-[320px] md:py-20">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-black md:text-5xl">
                            CONTACT US
                        </h1>
                        <div className="mt-3 flex items-center justify-center gap-2 text-sm text-black/70">
                            <span className="hover:text-black">Home</span>
                            <span className="text-black/40">›</span>
                            <span className="text-black">Contact Us</span>
                        </div>
                    </div>
                </div>

                {/* <div className="h-[1px] w-full bg-black/10" /> */}
            </section>


            <section id="contact" className="bg-white">
                <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 md:py-20">
                    <form className="mx-auto mt-10  bg-">
                        <div className="grid gap-5 md:grid-cols-2">
                            <PillField label="Your name">
                                <Input
                                    placeholder="Your Name"
                                    className="h-12 rounded-none border-transparent bg-black/5 px-5 text-[13px] shadow-none focus-visible:ring-0"
                                />
                            </PillField>

                            <PillField label="Contact Number">
                                <Input
                                    placeholder="Mobile Number"
                                    className="h-12 rounded-none border-transparent bg-black/5 px-5 text-[13px] shadow-none focus-visible:ring-0"
                                />
                            </PillField>

                            <PillField label="Your email">
                                <Input
                                    type="email"
                                    placeholder="Enter a valid email address"
                                    className="h-12 rounded-none border-transparent bg-black/5 px-5 text-[13px] shadow-none focus-visible:ring-0"
                                />
                            </PillField>

                            <PillField label="Subject">
                                <Input
                                    placeholder="Subject"
                                    className="h-12 rounded-none border-transparent bg-black/5 px-5 text-[13px] shadow-none focus-visible:ring-0"
                                />
                            </PillField>

                            <div className="md:col-span-2">
                                <PillField label="Your message (optional)">
                                    <Textarea
                                        placeholder="Type your message..."
                                        className="min-h-[180px] rounded-none border-transparent bg-black/5 px-5 py-4 text-[13px] shadow-none focus-visible:ring-0"
                                    />
                                </PillField>
                            </div>
                        </div>

                        <Button
                            type="button"
                            className="mt-6 h-12 w-full rounded-none bg-[#e6b27f] font-semibold tracking-[0.25em] text-black hover:bg-[#e6b27f]/90"
                        >
                            SUBMIT
                        </Button>
                    </form>
                </div>

                {/* INFO STRIP (same layout as screenshot, filled with your old details) */}
                <div className="bg-[#dcdcdc]  mx-auto">
                    <div className="border-x-[14px] ">
                        <div className="mx-auto max-w-7xl px-5 pb-14 pt-16 sm:px-6 md:pb-16 md:pt-16">
                            <div className="grid gap-10 md:grid-cols-3 mt-[40px]">


                                <InfoBlock
                                    icon={<Phone className="h-7 w-7 text-black" />}
                                    title="PHONE (LANDLINE)"
                                    lines={["(714) 639 - 1201", "Fax: (714) 639 - 1211"]}
                                />

                                <InfoBlock
                                    icon={<MapPin className="h-7 w-7 text-black" />}
                                    title="OUR OFFICE LOCATION"
                                    lines={["585 Yorbita Rd.", "La Puente, CA 91744", "United States"]}
                                />
                                <InfoBlock
                                    icon={<Mail className="h-7 w-7 text-black" />}
                                    title="EMAIL ADDRESS"
                                    lines={["contact@khfood.com"]}
                                />
                            </div>

                            {/* extra row for email (optional, keeps same style) */}

                        </div>
                    </div>
                </div>

                {/* FULL MAP */}
                <div id="map" className="bg-white">
                    <div className="mx-auto pt-12 ">
                        <div className="overflow-hidden rounded-none border bg-[#f6f7f8] shadow-sm">
                            <iframe
                                title="Map"
                                className="h-[420px] w-full"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                src="https://www.google.com/maps?q=585%20Yorbita%20Rd,%20La%20Puente,%20CA%2091744&output=embed"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

/* ----------------------- small components ----------------------- */

function PillField({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-2">
            <div className="text-xs font-semibold text-black/70">{label}</div>
            {children}
        </div>
    );
}

function InfoBlock({
    icon,
    title,
    lines,
}: {
    icon: React.ReactNode;
    title: string;
    lines: string[];
}) {
    return (
        <div className="relative pt-10 text-center">
            <div className="absolute left-1/2 top-0 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full  bg-[#e6b27f] shadow-sm ring-1 ring-black/10">
                {icon}
            </div>

            <div className="text-base font-extrabold tracking-wide text-black pt-4">
                {title}
            </div>

            <div className="mt-3 space-y-1 text-sm text-black/70">
                {lines.map((t) => (
                    <div key={t}>{t}</div>
                ))}
            </div>
        </div>
    );
}
