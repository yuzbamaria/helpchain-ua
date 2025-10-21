import Footer from "@/components/Footer";
import Image from "next/image";

export default function ThankYou() {
  return (
    <>
      <main className="flex flex-col justify-center items-center font-karla min-h-screen">
        <div className="flex flex-col gap-8 items-center max-w-[626px] px-8 sm:px-2">
          <div className="flex flex-col gap-4 justify-center items-center text-center">
            <h1 className="font-montserrat font-extrabold text-2xl tracking-wider">Thank you!</h1>
            <p className="text-gray-900">
              We’ve received your message and will get back to you as soon as
              possible. In the meantime, thank you for being part of this
              project.
            </p>
          </div>

          <Image
            src="/images/email.png"
            width={220}
            height={163}
            alt="email graphic"
            className="w-full max-w-[220px] h-auto"
            priority
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
