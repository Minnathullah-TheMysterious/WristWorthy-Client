import React, { useEffect } from "react";
import Layout from "../../features/layout/Layout";

const PrivacyPolicyPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Layout pageTitle={"WristWorthy - Privacy Policy"}>
      <div className="lg:mx-32 md:mx-16 sm:mx-10 mx-4 mb-16">
        <h1 className="text-center sm:text-3xl text-xl font-serif font-bold my-8">
          Privacy Policy
        </h1>
        <p className="text-center sm:text-xl text-sm font-serif text-green-800">
          At WristWorthy, we are committed to protecting your privacy and
          safeguarding your personal information. This Privacy Policy outlines
          how we collect, use, disclose, and manage your data when you interact
          with our website and services.
        </p>
        <div className="grid grid-cols-2 justify-items-stretch place-items-center gap-4 my-2">
          <div className="col-span-2 sm:col-span-1 justify-self-center">
            <img src="/images/logo512.png" alt="WristWorthy" />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h1 className="text-center text-2xl font-serif font-bold text-blue-800 py-10">
              Information We Collect
            </h1>
            <p className="tracking-wide font-semibold">
              We may collect the following types of information:
            </p>
            <ul className="list-inside sm:list-outside list-disc">
              <li>
                <span className="font-bold">Personal Information: </span> When you create an account
                or place an order, we may collect personal information such as
                your name, email address, shipping address, and phone number.
              </li>
              <li>
                <span className="font-bold">Payment Information: </span> To process orders, we collect
                payment information, including credit card details, which are
                securely processed by our payment service providers.
              </li>
              <li>
                <span className="font-bold">Usage Information: </span> We collect data on how you
                interact with our website, such as your browsing activity, the
                products you view, and your IP address.
              </li>
              <li>
                <span className="font-bold">Communication Information: </span> If you contact us via
                email or other communication channels, we may collect and store
                that correspondence.
              </li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h1 className="text-start sm:font-bold font-semibold sm:text-xl text-lg font-serif text-blue-800">
              How We Use Your Information
            </h1>
            <p className="font-semibold">
              We use your information for the following purposes:
            </p>
            <ul className="list-inside sm:list-outside list-disc">
              <li>To process and fulfill orders.</li>
              <li>
                To provide customer support and respond to your inquiries.
              </li>
              <li>
                To send order updates and promotional emails if you have
                subscribed to our newsletter.
              </li>
              <li>
                To improve our website and services based on user behavior and
                feedback.
              </li>
              <li>To maintain the security of your data and our website.</li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h1 className="text-start sm:font-bold font-semibold sm:text-xl text-lg font-serif text-blue-800">
              Data Security
            </h1>
            <p className="tracking-wide">
              We take your data security seriously. We implement
              industry-standard security measures to protect your information.
              We use secure sockets layer (SSL) technology to encrypt your data
              during transmission.
            </p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h1 className="text-start sm:font-bold font-semibold sm:text-xl text-lg font-serif text-blue-800">
              Cookies and Tracking Technologies
            </h1>
            <p className="tracking-wide">
              We use cookies and other tracking technologies to enhance your
              browsing experience and gather information about how you use our
              website. You can manage your cookie preferences in your browser
              settings.
            </p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h1 className="text-start sm:font-bold font-semibold sm:text-xl text-lg font-serif text-blue-800">
              Sharing Your Information
            </h1>
            <p className="tracking-wide font-semibold">
              We do not sell or rent your personal information to third parties.
              However, we may share your information with:
            </p>
            <ul className="list-inside sm:list-outside list-disc">
              <li>
                Service providers, such as payment processors and shipping
                companies, to fulfill orders.
              </li>
              <li>
                Law enforcement or regulatory authorities when required by law.
              </li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h1 className="text-start sm:font-bold font-semibold sm:text-xl text-lg font-serif text-blue-800">
              Your Choices
            </h1>
            <p className="tracking-wide">
              You have the right to access, correct, or delete your personal
              information. You can also opt out of receiving marketing emails by
              unsubscribing from our newsletter.
            </p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h1 className="text-start sm:font-bold font-semibold sm:text-xl text-lg font-serif text-blue-800">
              Changes to this Policy
            </h1>
            <p className="tracking-wide">
              We may update our Privacy Policy from time to time to reflect
              changes in our practices or for other operational, legal, or
              regulatory reasons. We will notify you of any significant changes.
            </p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h1 className="text-start sm:font-bold font-semibold sm:text-xl text-lg font-serif text-blue-800">
              Contact Us
            </h1>
            <p className="tracking-wide">
              If you have questions or concerns regarding your privacy or our
              Privacy Policy, please contact us at{" "}
              <a
                href="mailto:privacy@wristworthy.com"
                className="text-sky-500 hover:text-sky-700 active:text-sky-500"
              >
                privacy@wristworthy.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicyPage;
