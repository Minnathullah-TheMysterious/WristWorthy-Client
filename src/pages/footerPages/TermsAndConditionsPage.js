import React, { useEffect } from "react";
import Layout from "../../features/layout/Layout";
import { Link } from "react-router-dom";

const TermsAndConditionsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Layout pageTitle={"WristWorthy - Terms & Conditions"}>
      <div className="lg:mx-32 md:mx-16 sm:mx-10 mx-4 mb-16">
        <h1 className="text-center sm:text-3xl text-xl font-serif font-bold my-8">
          Terms and Conditions
        </h1>
        <p className="text-center sm:text-xl text-sm font-serif text-green-800">
          Welcome to WristWorthy! By accessing and using our website and
          services, you agree to comply with and be bound by the following terms
          and conditions. Please read these terms carefully.
        </p>
        <div className="grid grid-cols-2 justify-items-stretch place-items-center gap-4 my-2">
          <div className="col-span-2 sm:col-span-1 justify-self-center">
            <img src="/images/logo512.png" alt="WristWorthy" />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h1 className="text-center text-2xl font-serif font-bold text-blue-800 py-10">
              Use of the Website
            </h1>
            <ul className="list-inside sm:list-outside list-disc">
              <li>
                You must be at least 18 years old to create an account and make
                purchases on our website.
              </li>
              <li>
                You are responsible for maintaining the confidentiality of your
                account and password.
              </li>
              <li>
                You agree not to use our website for any illegal or unauthorized
                purpose.
              </li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h1 className="text-start sm:font-bold font-semibold sm:text-xl text-lg font-serif text-blue-800">
              Product Information
            </h1>
            <ul className="list-inside sm:list-outside list-disc">
              <li>
                We make every effort to ensure that product descriptions,
                pricing, and availability are accurate.
              </li>
              <li>
                We reserve the right to modify or discontinue products without
                prior notice.
              </li>
              <li>
                We cannot guarantee that the colors you see on your device will
                accurately represent the actual colors of our products.
              </li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h1 className="text-start sm:font-bold font-semibold sm:text-xl text-lg font-serif text-blue-800">
              Order Acceptance
            </h1>
            <ul className="list-inside sm:list-outside list-disc">
              <li>
                Your receipt of an order confirmation does not signify our
                acceptance of your order. We reserve the right to accept or
                decline orders.
              </li>
              <li>
                We may refuse service to anyone for any reason at any time.
              </li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h1 className="text-start sm:font-bold font-semibold sm:text-xl text-lg font-serif text-blue-800">
              Pricing and Payment
            </h1>
            <ul className="list-inside sm:list-outside list-disc">
              <li>
                Prices for our products are subject to change without notice.
              </li>
              <li>
                We accept various payment methods, including credit cards, and
                use secure payment processing.
              </li>
              <li>
                You agree to provide current, complete, and accurate purchase
                and account information.
              </li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h1 className="text-start sm:font-bold font-semibold sm:text-xl text-lg font-serif text-blue-800">
              Intellectual Property
            </h1>
            <ul className="list-inside sm:list-outside list-disc">
              <li>
                All content, including logos, images, text, and product designs,
                are the intellectual property of WristWorthy.
              </li>
              <li>
                You may not use our content for any purpose without our express
                written permission.
              </li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h1 className="text-start sm:font-bold font-semibold sm:text-xl text-lg font-serif text-blue-800">
              Privacy
            </h1>
            <ul className="list-inside sm:list-outside list-disc">
              <li>
                Your use of our website is also governed by our{" "}
                <Link to={"/privacy-policy"}>Privacy Policy</Link>.
              </li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h1 className="text-start sm:font-bold font-semibold sm:text-xl text-lg font-serif text-blue-800">
              Limitation of Liability
            </h1>
            <ul className="list-inside sm:list-outside list-disc">
              <li>
                We are not liable for any direct, indirect, special, incidental,
                or consequential damages resulting from your use of our website
                or products.
              </li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h1 className="text-start sm:font-bold font-semibold sm:text-xl text-lg font-serif text-blue-800">
              Changes to Terms
            </h1>
            <ul className="list-inside sm:list-outside list-disc">
              <li>
                We may update our terms and conditions from time to time to
                reflect changes in our practices or for other operational,
                legal, or regulatory reasons.
              </li>
              <li>
                Your continued use of the website following any changes
                constitutes acceptance of those changes.
              </li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h1 className="text-start sm:font-bold font-semibold sm:text-xl text-lg font-serif text-blue-800">
              Contact Us
            </h1>
            <p className="tracking-wide">
              If you have questions or concerns regarding our terms and
              conditions, please contact us at{" "}
              <a
                href="mailto:terms@wristworthy.com"
                className="text-sky-500 hover:text-sky-700 active:text-sky-500"
              >
                terms@wristworthy.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsAndConditionsPage;
