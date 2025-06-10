"use client";
import HeartIcon from "@/icons/HeartIcon";
import CheckIcon from "@/icons/CheckIcon";

import Link from "next/link";
import { ArrowRight } from 'lucide-react';

const cards = [
  {
    title: "Connect",
    subtitle: "Find jobs in the UK",
    image: "/images/conect.png",
    items: [
      "AI-powered job matching",
      "Build CV & interview support point",
      "Work permit & sponsorship guidance",
    ],
    button: "Find Jobs",
  },
  {
    title: "Help",
    subtitle: "Get UK qualifications",
    image: "/images/help.png",
    items: [
      "Training & certification support",
      "Training & certification support",
      "English courses for employment",
    ],
    button: "Explore Training",
  },
  {
    title: "Support",
    subtitle: "Start your business",
    image: "/images/support.png",
    items: [
      "Business registration help",
      "Funding & mentorship",
      "Networking opportunities",
    ],
    button: "Start Your Business",
  },
];

export default function WhatWeDo() {
  return (
    <section className="bg-white py-5 px-6 md:py-10 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-2xl font-montserrat font-bold text-black mb-6">
          What We Do
        </p>
        <p className="max-w-2xl mx-auto text-center justify-center font-karla mb-3 text-primary-900">
          We are a dedicated platform helping Ukrainians find employment,
          training, and business opportunities in the UK. Whether you are looking for a job, offering employment, or want to
          support our initiative, we connect people to the right resources.
        </p>

        <div className="grid gap-8 md:grid-cols-3 text-left">
          {cards.map((card, index) => (
            <div key={index} className="flex flex-col justify-between h-full overflow-hidden p-4">
              <div className="relative h-48">
                <img
                  src={`${card.image}`}
                  alt={card.title}
                  className="w-full h-full object-cover rounded-lg "
                />
                <div className="absolute bottom-3 left-3 bg-white text-primary-400 p-2 rounded flex items-center gap-1 text-sm font-extrabold font-montserrat">
                  <HeartIcon className="w-4 h-4 text-accent-500" />
                  {card.title}
                </div>
              </div>

              <div className="pt-6">
                <p className="text-lg font-karla font-semibold text-black">{card.subtitle}</p>
                <ul className="space-y-2 mb-6">
                  {card.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 font-karla">
                      <CheckIcon className="w-4 h-4 text-accent-500 mt-1" />
                      <span className="text-sm text-black">{item}</span>
                    </li>
                  ))}
                </ul>          
              </div>

              <Link
                href="/some-where"
                className="flex w-full justify-end gap-2 text-primary-500 font-karla font-semibold text-sm items-center hover:text-primary-700 transition duration-200"
              >
                {card.button}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
