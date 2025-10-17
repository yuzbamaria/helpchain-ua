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
    <main className="px-6 font-karla my-20">
      <div className="flex flex-col gap-20">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-4xl font-extrabold font-montserrat tracking-wider">
            Let's connect
          </p>
          <p className="text-xl">
            Whether you’re here to offer opportunities, ask a question, or
            support our mission — we’re here to listen. Fill in the form or
            contact us directly. Together, we can build something meaningful.
          </p>
        </div>

        <div className="flex flex-col gap-16 ">
          {/* Contact details */}
          <div className="flex flex-col gap-8 pt-8">
            <p className="font-extrabold text-2xl font-montserrat tracking-wider pl-8">
              Get in touch directly
            </p>
            <div className="flex flex-col gap-8 px-8">
              <div className="flex flex-col gap-2">
                <h4 className="text-xl font-bold">Solomiia Baranets</h4>
                <p>Founder</p>
                <p className="flex items-center gap-2">
                  <Phone /> +44 7946 155 779 (UK)
                </p>
                <p className="flex items-center gap-2">
                  <Mail /> solomiia@wisdomtrust.org
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-xl font-bold">Graham Soper</h4>
                <p>Trustee, The Wisdom Trust</p>
                <p className="flex items-center gap-2">
                  <Phone />
                  +44 7703 583545 (UK)
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-xl font-bold">General enquiries</h4>
                <p>Trustee, The Wisdom Trust</p>
                <p className="flex items-center gap-2">
                  <Mail />
                  ukrproject2025@gmail.com
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-8 max-w-[480px] p-8 bg-primary-50 border border-primary-100 rounded-2xl">
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
        </div>
      </div>
    </main>
  );
}
