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
        <section className="text-white font-karla">
            <div className="flex flex-col gap-20 bg-primary-800 2xl:w-7xl">
                <div className="flex gap-32">
                    <div>
                        <div>{logoLight}</div>
                        <p>Subscribe to our newsletter for the latest updates on features and releases.</p>
                        <div>
                            <form>
                                <input 
                                    type="text"
                                    placeholder="Your Email Here"
                                    required
                                />
                                <input 
                                    type="submit" 
                                    value="Join" 
                                />
                            </form>
                        </div>
                        <p className="text-3">By subscribing, you consent to our Privacy Policy and agree to receive updates.</p>
                    </div>
                    <div className="flex gap-10">
                        <div className="flex flex-col">
                            <p>Useful Links</p>
                            <ul>
                                {usefulLinks.map((link, index) => (
                                    <li key={index}>{link}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col">
                            <p>Connect With Us</p>
                            <ul>
                                {connectWithUs.map((link, index) => (
                                    <li key={index}>{link}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col">
                            <p>Follow Us</p>
                            <ul>
                                {socialLinks.map((resource, index) => (
                                    <li key={index} className="flex">
                                        <span>{resource.icon}</span>{resource.name}
                                    </li>
                                ))}
                                
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div>
                        <p className="text-3.5 font-karla">© 2024 Relume. All rights reserved.</p>
                    </div>
                    <ul className="flex ">
                        <li>Privacy Policy</li>
                        <li>Terms of Service</li>
                        <li>Cookie Settings</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}