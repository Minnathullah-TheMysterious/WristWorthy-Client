import React, { useEffect } from "react";
import Layout from "../../features/layout/Layout";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Layout pageTitle={"WristWorthy - Contact Us"}>
      <div className="lg:mx-32 md:mx-16 sm:mx-10 mx-4 mb-16">
        <h1 className="text-center sm:text-3xl text-xl font-serif font-bold my-8">
          Contact WristWorthy
        </h1>
        <p className="text-center sm:text-xl text-sm font-serif text-green-800">
          Have a question, comment, or just want to chat? We'd love to hear from
          you! Here are the ways you can get in touch with WristWorthy:
        </p>
        <div className="grid grid-cols-2 justify-items-stretch place-items-center gap-4 my-2">
          <div className="col-span-2 sm:col-span-1 justify-self-center">
            <img src="/images/logo512.png" alt="WristWorthy" />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h1 className="text-center text-2xl font-serif font-bold text-blue-800 py-10">
              Customer Support
            </h1>
            <p className="tracking-wide font-semibold">
              Our dedicated customer support team is here to assist you with any
              inquiries or issues you may have. We pride ourselves on providing
              a swift and helpful response to your concerns.
            </p>
            <p className="my-3">
              <span className="font-bold">Email: </span>
              <a
                href="mailto:support@wristworthy.com"
                className="text-sky-500 hover:text-sky-700 active:text-sky-500"
              >
                support@wristworthy.com
              </a>
            </p>
            <p className="my-3">
              <span className="font-bold">Phone: </span>
              <span>+1-123-456-7890</span>
            </p>
            <p>
              <span className="font-bold">Working Hours: </span>
              <span>Monday - Friday, 9:00 AM - 5:00 PM (IST)</span>
            </p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h1 className="text-start sm:font-bold font-semibold sm:text-xl text-lg font-serif text-blue-800">
              Visit Our Company
            </h1>
            <p className="tracking-wide">
              If you're in the area or passing through, we welcome you to visit
              our Company. See our collection up close, try on your favorite
              pieces, and enjoy a personalized shopping experience.
            </p>
            <p className="my-3">
              <span className="font-bold">Address: </span>
              <Link
                to="https://www.google.co.in/maps/place/Royal+function+hall/@17.9245565,79.046242,17.82z/data=!4m6!3m5!1s0x3bcca2cb7620da83:0x5baa4b5757001ea2!8m2!3d17.9243423!4d79.0467357!16s%2Fg%2F11f5db_cwm?entry=ttu"
                target="_blank"
                className="text-sky-500 hover:text-sky-700 active:text-sky-500"
              >
                5-16, Maddur, Siddipet, Hyderabad
              </Link>
            </p>
            <p>
              <span className="font-bold">Working Hours: </span>
              <span>Monday - Saturday, 10:00 AM - 6:00 PM</span>
            </p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h1 className="text-start sm:font-bold font-semibold sm:text-xl text-lg font-serif text-blue-800">
              Social Media
            </h1>
            <p className="tracking-wide">
              Stay connected with WristWorthy on social media to get the latest
              updates, exclusive offers, and be a part of our vibrant community.
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
              <Link
                to={"https://www.facebook.com/profile.php?id=100082452596728"}
                target="_blank"
              >
                <BsFacebook className="cursor" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
