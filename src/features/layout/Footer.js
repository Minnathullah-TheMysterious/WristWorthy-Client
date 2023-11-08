import React from "react";
import { BsTwitter, BsInstagram, BsWhatsapp, BsFacebook } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gray-950 text-white">
      <div className="grid py-3 px-2 space-y-8 ">
        <div className="col-span-12">
          <div className="flex flex-col justify-center items-center">
            <p className="sm:text-2xl font-thin">
              Making the world a better place by providing shops at the door
              step
            </p>
            <div className="mt-5 flex space-x-4 sm:space-x-8 justify-center text-2xl sm:text-3xl">
              <Link to={"https://twitter.com/ultimaterahmani"} target="_blank">
                <BsTwitter className="cursor" />
              </Link>
              <Link
                to={"https://www.instagram.com/mystery_minnat_556"}
                target="_blank"
              >
                <BsInstagram className="cursor" />
              </Link>
              <Link to={"/contact"}>
                <BsWhatsapp className="cursor" />
              </Link>
              <Link
                to={"https://www.facebook.com/profile.php?id=100082452596728"}
                target="_blank"
              >
                <BsFacebook className="cursor" />
              </Link>
            </div>
          </div>
        </div>

        <div className="col-span-6  flex justify-center">
          <div>
            <h2 className="font-serif font-bold">Company</h2>
            <div className=" space-y-3">
              <p></p>
              <p className="cursor">
                <Link to={"/contact"}>Contact</Link>
              </p>
              <p className="cursor">
                <Link to={"/about"}>About</Link>
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-6  flex justify-center">
          <div>
            <h2 className="font-serif font-bold">Legal</h2>
            <div className=" space-y-3">
              <p></p>
              <p className="cursor">
                <Link to={"/terms-conditions"}>Terms & Conditions</Link>
              </p>
              <p className="cursor">
                <Link to={"/privacy-policy"}>Privacy Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-10" />
      <p className="px-2 py-2">© 2023 WristWorthy, Inc. All rights reserved.</p>
    </div>
  );
};

export default Footer;
