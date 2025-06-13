import { logoLight } from "@/icons/LogoLight"
import { youtube } from "@/icons/Youtube";
import { instagram } from "@/icons/Instagram";
import { xIcon } from "@/icons/X";
import { facebook } from "@/icons/Facebook";
import { linkedin } from "@/icons/Linkedin";

const usefulLinks = ["About Us", "Contact Us", "Careers", "Blog Posts", "Support Center"];
const connectWithUs = ["Newsletter", "Events", "Resources", "Community", "FAQs"];
const socialLinks = [
    {
        name: "YouTube",
        icon: youtube
    }, 
    {
        name: "Instagram",
        icon: instagram
    }, 
    {
        name: "xIcon",
        icon: xIcon
    },
    {
        name: "Facebook",
        icon: facebook
    },
    {
        name: "LinkedIn",
        icon: linkedin
    }
];

export default function Footer() {
    return (
        <section className="flex justify-center text-white font-roboto">
            <div className="flex flex-col gap-20 bg-primary-800 2xl:w-[1280px] p-10">
                <div className="flex gap-20">
                    <div className="flex flex-col gap-6">
                        <div>{logoLight}</div>
                        <p>Subscribe to our newsletter for the latest updates on features and releases.</p>
                        <div>
                            <form className="flex gap-4">
                                <input 
                                    type="text"
                                    placeholder="Your Email Here"
                                    className="w-[405px] rounded-sm p-3 border border-primary-400 placeholder-white"
                                    required
                                />
                                <input 
                                    type="submit" 
                                    value="Join"
                                    className="w-[79px] rounded-sm border border-primary-400 px-6 py-3" 
                                />
                            </form>
                        </div>
                        <p className="text-xs">By subscribing, you consent to our Privacy Policy and agree to receive updates.</p>
                    </div>
                    <div className="flex gap-20 pr-10">
                        <div className="flex flex-col gap-4">
                            <p className="text-base font-semibold">Useful Links</p>
                            <ul className="flex flex-col gap-3">
                                {usefulLinks.map((link, index) => (
                                    <li key={index} className="font-normal text-sm py-2">{link}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col gap-4">
                            <p className="text-base font-semibold">Connect With Us</p>
                            <ul className="flex flex-col gap-3">
                                {connectWithUs.map((link, index) => (
                                    <li key={index} className="font-normal text-sm py-2">{link}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col gap-4">
                            <p className="text-base font-semibold">Follow Us</p>
                            <ul className="flex flex-col gap-3">
                                {socialLinks.map((resource, index) => (
                                    <li key={index} className="flex items-center font-normal text-sm py-2 gap-3">
                                        <span>{resource.icon}</span>{resource.name}
                                    </li>
                                ))}
                                
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between border-t-[2px] border-primary-700 pt-8">
                    <div>
                        <p className="text-3.5 font-karla">© 2024 Relume. All rights reserved.</p>
                    </div>
                    <ul className="flex gap-6">
                        <li>Privacy Policy</li>
                        <li>Terms of Service</li>
                        <li>Cookie Settings</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}