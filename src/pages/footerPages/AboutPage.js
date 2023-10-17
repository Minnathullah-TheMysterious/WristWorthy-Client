import React, { useEffect } from "react";
import Layout from "../../features/layout/Layout";
import { Link } from "react-router-dom";

const AboutPage = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, []);

  return (
    <Layout pageTitle={"WristWorthy - About Us"}>
      <div className="lg:mx-32 md:mx-16 sm:mx-10 mx-4 mb-16">
        <h1 className="text-center sm:text-3xl text-xl font-serif font-bold my-8">
          About WristWorthy
        </h1>
        <p className="text-center sm:text-xl text-sm font-serif text-green-800">
          At WristWorthy, we're not just a store; we're a passion for style and
          self-expression. We believe that your wrist deserves nothing but the
          best, and that's exactly what we offer - the best in wristwear.
        </p>
        <div className="grid grid-cols-2 justify-items-stretch place-items-center gap-4 my-2">
          <div className="col-span-2 sm:col-span-1 justify-self-center">
            <img src="/images/logo512.png" alt="WristWorthy" />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h1 className="text-center text-2xl font-serif font-bold text-blue-800 py-10">
              Our Story
            </h1>
            <p className="tracking-wide font-semibold">
              WristWorthy was founded with a simple yet ambitious goal in mind:
              to bring high-quality, stylish, and affordable wristwear to
              fashion enthusiasts around the world. Our journey began in 2023,
              and since then, we've been committed to curating a collection that
              speaks to the diverse tastes and preferences of our valued
              customers.
            </p>
          </div>
          <div className="col-span-2">
            <h1 className="text-center sm:font-bold font-semibold font-serif sm:text-3xl text-2xl text-blue-800 border-b-4">
              What Makes Us Unique
            </h1>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h1 className="text-start sm:font-bold font-semibold sm:text-xl text-lg font-serif text-blue-800">
              Quality & Craftsmanship
            </h1>
            <p className="tracking-wide">
              We take pride in the quality of our products. Every piece of
              wristwear you find at WristWorthy has been carefully crafted and
              sourced to meet our stringent standards. We work with skilled
              artisans and trusted suppliers to ensure that our products not
              only look great but also stand the test of time.
            </p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h1 className="text-start sm:font-bold font-semibold sm:text-xl text-lg font-serif text-blue-800">
              Style & Diversity
            </h1>
            <p className="tracking-wide">
              Our collection is as diverse as our customers. From classic
              elegance to contemporary trends, we offer a wide range of
              wristwear, including watches, bracelets, and more. We believe in
              the power of accessories to elevate your style and make a
              statement. That's why we continually update our catalog to keep up
              with the latest fashion trends.
            </p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h1 className="text-start sm:font-bold font-semibold sm:text-xl text-lg font-serif text-blue-800">
              Customer-Centric Approach
            </h1>
            <p className="tracking-wide">
              At WristWorthy, our customers are at the heart of everything we
              do. We're dedicated to providing an exceptional shopping
              experience. Our customer support team is always ready to assist,
              and we value your feedback. Your satisfaction is our priority.
            </p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h1 className="text-start sm:font-bold font-semibold sm:text-xl text-lg font-serif text-blue-800">
              Sustainability
            </h1>
            <p className="tracking-wide">
              We care about the environment, and that's why we strive to be
              environmentally responsible. We make conscious efforts to reduce
              our carbon footprint and minimize waste in our operations. We're
              committed to sustainable practices because we believe in a better
              future.
            </p>
          </div>
          <div className="col-span-2">
            <h1 className="text-center sm:font-bold font-semibold font-serif sm:text-3xl text-2xl text-blue-800">
              Join Our WristWorthy Community
            </h1>
            <p className="tracking-wide">
              We invite you to explore our extensive collection of wristwear and
              become a part of the WristWorthy community. Connect with us on
              social media, share your wristwear stories, and be inspired by the
              diversity of styles and personalities that make up our brand.
              Thank you for choosing WristWorthy. We look forward to being a
              part of your wrist's journey. If you have any questions,
              suggestions, or just want to say hello, don't hesitate to{" "}
              <Link
                to={"/contact-us"}
                className="text-sky-500 hover:text-blue-500 active:text-sky-500"
              >
                contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
