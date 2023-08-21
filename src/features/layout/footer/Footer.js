import React from "react";
import { BsTwitter, BsInstagram, BsWhatsapp, BsFacebook } from "react-icons/bs";

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
              <BsTwitter  className="cursor"/>
              <BsInstagram  className="cursor"/>
              <BsWhatsapp  className="cursor"/>
              <BsFacebook  className="cursor"/>
            </div>
          </div>
        </div>

        <div className="col-span-6 md:col-span-3  flex justify-center">
          <div>
            <h2 className="font-serif font-bold">Solutions</h2>
            <div className=" space-y-3">
              <p></p>
              <p className="cursor">Marketing</p>
              <p className="cursor">Analytics</p>
              <p className="cursor">Commerce</p>
              <p className="cursor">Insights</p>
            </div>
          </div>
        </div>

        <div className="col-span-6 md:col-span-3  flex justify-center">
          <div>
            <h2 className="font-serif font-bold">Support</h2>
            <div className=" space-y-3">
              <p></p>
              <p className="cursor">Pricing</p>
              <p className="cursor">Documentation</p>
              <p className="cursor">Guide</p>
              <p className="cursor">API Status</p>
            </div>
          </div>
        </div>

        <div className="col-span-6 md:col-span-3  flex justify-center">
          <div>
            <h2 className="font-serif font-bold">Company</h2>
            <div className=" space-y-3">
              <p></p>
              <p className="cursor">About</p>
              <p className="cursor">Blog</p>
              <p className="cursor">Jobs</p>
              <p className="cursor">Press</p>
              <p className="cursor">Partners</p>
            </div>
          </div>
        </div>

        <div className="col-span-6 md:col-span-3  flex justify-center">
          <div>
            <h2 className="font-serif font-bold">Legal</h2>
            <div className=" space-y-3">
              <p></p>
              <p className="cursor">Claim</p>
              <p className="cursor">Privacy</p>
              <p className="cursor">Terms</p>
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
