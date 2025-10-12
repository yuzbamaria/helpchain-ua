"use client";

import { Phone, Mail, Help, ArrowRightWhite, CheckMark } from "@/icons";
import TextInput from "@/components/ui/TextInput";
import SelectInput from "@/components/ui/SelectInput";
import { useState } from "react";

const selectReasons = [
  "I want to hire or collaborate",
  "I want to volunteer",
  "I have a general question",
  "I have feedback or ideas",
  "Press / Media enquiry",
];

export default function ContactUs() {
  const [name, setName] = useState("");
  const [nameFocused, setNameFocused] = useState(false);

  const [email, setEmail] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);

  const [message, setMessage] = useState("");
  const [messageFocused, setMessageFocused] = useState(false);

  return (
    <main className="p-6 font-karla">
      <div>
        <p>Let's connect</p>
        <p>
          Whether you’re here to offer opportunities, ask a question, or support
          our mission — we’re here to listen.Fill in the form or contact us
          directly. Together, we can build something meaningful.
        </p>
      </div>
      <div>
        <p>Get in touch directly</p>
        <div>
          <p>Solomiia Baranets</p>
          <p>Founder</p>
          <p>
            <span>
              <Phone />
            </span>{" "}
            +44 7946 155 779 (UK)
          </p>
          <p>
            <span>
              <Mail />
            </span>{" "}
            solomiia@wisdomtrust.org
          </p>
        </div>
        <div>
          <p>Graham Soper</p>
          <p>Trustee, The Wisdom Trust</p>
          <p>
            <span>
              <Phone />
            </span>{" "}
            +44 7703 583545 (UK)
          </p>
        </div>
        <div>
          <p>General enquiries</p>
          <p>Trustee, The Wisdom Trust</p>
          <p>
            <span>
              <Mail />
            </span>{" "}
            ukrproject2025@gmail.com
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-8 p-8 bg-primary-50 border border-primary-100 rounded-2xl">
        <p className="font-montserrat text-2xl font-extrabold tracking-wider">
          OR, send us a message
        </p>
        <p>For companies, volunteers, or general enquiries</p>
        <form action="" className="flex flex-col gap-4">
          {/* Name input */}
          <TextInput
            label="Your Name (required)"
            type="text"
            value={name}
            placeholder="e.g. Jane Smith"
            required
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setNameFocused(true)}
          />

          {/* Email input */}
          <TextInput
            label="Your Email (required)"
            type="email"
            value={email}
            placeholder="e.g. jane@email.com"
            required
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setEmailFocused(true)}
          />

          {/* Reason  dropdown input */}
          <SelectInput
            label="What is this about? (required)"
            placeholder="Select a reason"
            options={selectReasons}
            name="reason"
          />

          {/* Message input */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="" className="flex items-center gap-1.5">
              Your Message (required) <Help />
            </label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-11 border border-gray-300 rounded-lg py-3 px-4 text-gray-500 font-medium bg-white"
              placeholder="Tell us a bit more about how we can help"
            />
          </div>
          <button
            type="submit"
            className="flex items-center h-11 w-48 gap-2 py-2 px-6 mt-4 bg-primary-500 rounded-lg text-white text-lg"
          >
            Send Message <ArrowRightWhite />
          </button>
        </form>
      </div>
    </main>
  );
}
