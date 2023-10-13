import React from "react";
import Navbar from "./header/Navbar";
import Footer from "./footer/Footer";
import Helmet from "react-helmet";
import TopLoadBar from './../../loaders/TopLoadBar';

const Layout = ({
  children,
  pageDescription,
  pageAuthor,
  pageKeywords,
  pageTitle,
}) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={pageDescription} />
        <meta name="author" content={pageAuthor} />
        <meta name="keywords" content={pageKeywords} />
        <title>{pageTitle}</title>
      </Helmet>
      <Navbar/>
      <TopLoadBar/>
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  pageTitle: "WristWorthy - Checkout",
  pageAuthor: "Minnathullah Rahmani",
  pageDescription:
    "An Ecommerce app created for learning development using react",
  pageKeywords: "Ecommerce, WristWorthy, Shopping, Watches, Electronic Gadgets",
};

export default Layout;
