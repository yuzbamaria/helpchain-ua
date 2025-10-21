import Footer from "@/components/Footer";
import ContactDetails from "@/components/contact/ContactDetails";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactUs() {
  return (
    <>
      <main className="px-6 font-karla my-20">
        <div className="flex flex-col gap-20 md:items-center">
          <div className="flex flex-col items-center justify-center gap-4 text-center max-w-[676px]">
            <h1 className="text-4xl font-extrabold font-montserrat tracking-wider">
              Let's connect
            </h1>
            <p className="text-xl">
              Whether you’re here to offer opportunities, ask a question, or
              support our mission — we’re here to listen. Fill in the form or
              contact us directly. Together, we can build something meaningful.
            </p>
          </div>

          <div className="flex flex-col items-center gap-16 md:flex-row md:items-start md:justify-center">
            <ContactDetails />
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
