import { Phone, Mail } from "@/icons";

export default function ContactDetails() {
  return (
    <div className="flex flex-col gap-8 pt-8">
      <h2 className="font-extrabold text-2xl font-montserrat tracking-wider pl-8">
        Get in touch directly
      </h2>
      <div className="flex flex-col gap-8 px-8">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold">Solomiia Baranets</h3>
          <p>Founder</p>
          <a href="tel:+447946155779" className="flex items-center gap-2">
            <Phone aria-label="Phone" /> +44 7946 155 779 (UK)
          </a>
          <a
            href="mailto:solomiia@wisdomtrust.org"
            className="flex items-center gap-2"
          >
            <Mail aria-label="Mail" /> solomiia@wisdomtrust.org
          </a>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-xl font-bold">Graham Soper</h4>
          <p>Trustee, The Wisdom Trust</p>
          <a href="tel:+447703583545" className="flex items-center gap-2">
            <Phone aria-label="Phone" />
            +44 7703 583545 (UK)
          </a>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-xl font-bold">General enquiries</h4>
          <p>Trustee, The Wisdom Trust</p>
          <a
            href="mailto:ukrproject2025@gmail.com"
            className="flex items-center gap-2"
          >
            <Mail aria-label="Mail" /> ukrproject2025@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
