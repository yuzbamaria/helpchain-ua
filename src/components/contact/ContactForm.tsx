"use client";

import { Help, ArrowRightWhite } from "@/icons";
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

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const url = "/api/contact";
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, reason, message }),
    });
    await res.json();


  }

  function handleSelect(val: string) {
    setReason(val);
  }

  return (
    <div className="flex flex-col gap-8 max-w-[480px] p-8 bg-primary-50 border border-primary-100 rounded-2xl">
      <h2 className="font-montserrat text-2xl font-extrabold tracking-wider">
        OR, send us a message
      </h2>
      <p>For companies, volunteers, or general enquiries</p>
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {/* Name input */}
        <TextInput
          label="Your Name (required)"
          id="name"
          type="text"
          value={name}
          placeholder="e.g. Jane Smith"
          required
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email input */}
        <TextInput
          label="Your Email (required)"
          id="email"
          type="email"
          value={email}
          placeholder="e.g. jane@email.com"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Reason  dropdown input */}
        <SelectInput
          label="What is this about? (required)"
          id="reason"
          value={reason}
          onChange={handleSelect}
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
            className="flex items-center h-11 w-48 gap-2 py-2 px-6 mt-4 bg-primary-500 rounded-lg text-white text-lg hover:bg-primary-700 cursor-pointer"
          >
            Send Message <ArrowRightWhite />
          </button>
        </div>
      </form>
    </div>
  );
}
