import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { faqs } from "../assets/assets";
import { motion } from "framer-motion";
import { SlideLeft, SlideUp } from "../utils/Animation";

const Terms = () => {
  return (
    <>
      <Navbar />
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-700 mb-4">
            Terms and Conditions
          </h1>
        </div>
        {/* Terms Content */}
        <div>
          {faqs.map((faq) => (
            <motion.div
              variants={SlideLeft(0.3)}
              initial="hidden"
              whileInView="visible"
              key={faq.id}
              className="border border-gray-200 rounded  hover:bg-gray-50 transition-colors duration-200 mb-5"
            >
              <div className="p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4 flex items-start">
                  <span className="text-primary-600 mr-3">{faq.id}.</span>
                  {faq.title}
                </h2>
                <div className="text-gray-600 space-y-4 pl-9">
                  <p className="leading-relaxed">{faq.description1}</p>
                  {faq.description2 && (
                    <p className="leading-relaxed">{faq.description2}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Additional Legal Notice */}
        <motion.div
          variants={SlideUp(0.3)}
          initial="hidden"
          whileInView="visible"
          className="mt-12 bg-blue-50 rounded-lg p-6 border border-blue-100"
        >
          <h3 className="text-lg font-medium text-blue-800 mb-3">
            Legal Notice
          </h3>
          <p className="text-blue-700">
            By using our services, you agree to these terms and conditions in
            full. If you disagree with any part of these terms, please do not
            use our services.
          </p>
        </motion.div>
      </section>
      <Footer />
    </>
  );
};

export default Terms;
