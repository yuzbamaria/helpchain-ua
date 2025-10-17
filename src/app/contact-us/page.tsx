"use client";

import { Phone, Mail, Help, ArrowRightWhite, CheckMark } from "@/icons";
import TextInput from "@/components/ui/TextInput";
import SelectInput from "@/components/ui/SelectInput";
import MessageInput from "@/components/ui/MessageInput";
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
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

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
          />

          {/* Email input */}
          <TextInput
            label="Your Email (required)"
            type="email"
            value={email}
            placeholder="e.g. jane@email.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Reason  dropdown input */}
          <SelectInput
            label="What is this about? (required)"
            placeholder="Select a reason"
            options={selectReasons}
            name="reason"
          />

          {/* Message input */}
          <MessageInput
            label="Your Message (required)"
            name="text"
            icon={<Help />}
            value={message}
            rows={5}
            cols={50}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="Tell us a bit more about how we can help"
          />
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="flex items-center h-11 w-48 gap-2 py-2 px-6 mt-4 bg-primary-500 rounded-lg text-white text-lg"
            >
              Send Message <ArrowRightWhite />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
