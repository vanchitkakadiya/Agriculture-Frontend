//components/support/SocialLinks.tsx
// import {
//     Facebook,
//     Instagram,
//     Linkedin,
//     Youtube,
// } from "lucide-react";
import {
    FaFacebookF,
    FaInstagram,
    FaYoutube,
    FaLinkedinIn,
} from "react-icons/fa";

const SocialLinks = () => {

    return (
        <div
            className="
            bg-white
            border
            rounded-3xl
            p-6
        "
        >

            <h3
                className="
                font-bold
                text-2xl
                mb-5
            "
            >
                Follow Us
            </h3>

            <div
                className="
                flex
                gap-4
            "
            >

                <a
                    href="#"
                    className="
                    w-12
                    h-12
                    rounded-full
                    bg-[#e8e6cf]
                    flex
                    items-center
                    justify-center
                "
                >
                    <FaFacebookF/>
                </a>

                <a
                    href="#"
                    className="
                    w-12
                    h-12
                    rounded-full
                    bg-[#e8e6cf]
                    flex
                    items-center
                    justify-center
                "
                >
                    <FaInstagram/>
                </a>

                <a
                    href="#"
                    className="
                    w-12
                    h-12
                    rounded-full
                    bg-[#e8e6cf]
                    flex
                    items-center
                    justify-center
                "
                >
                    <FaYoutube/>
                </a>

                <a
                    href="#"
                    className="
                    w-12
                    h-12
                    rounded-full
                    bg-[#e8e6cf]
                    flex
                    items-center
                    justify-center
                "
                >
                    <FaLinkedinIn/>
                </a>

            </div>

        </div>
    );
};

export default SocialLinks;