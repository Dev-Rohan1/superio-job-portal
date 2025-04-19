import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { testimonials } from "../assets/assets";

const Testimonials = () => {
  return (
    <section className="mt-28 mb-28">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-700 mb-2">
          {" "}
          Testimonials From Our Customers
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Hear from those who found success with our platform
        </p>
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true, // Added for better UX
        }}
        pagination={{
          clickable: true,
          bulletClass:
            "swiper-pagination-bullet !bg-gray-300 !opacity-100 !w-2.5 !h-2.5 !mx-1.5",
          bulletActiveClass: "!bg-blue-600 !w-3 !h-3",
          renderBullet: (index, className) => {
            return `<span class="${className}" role="button" aria-label="Go to testimonial ${
              index + 1
            }"></span>`;
          },
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
        className="!pb-12"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white p-6 rounded-xl h-full flex flex-col border border-gray-200 m-1">
              {" "}
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                {testimonial.title}
              </h3>
              <blockquote className="text-gray-600 mb-6 flex-grow text-sm sm:text-base">
                {" "}
                {testimonial.description}
              </blockquote>
              <div className="flex items-center mt-auto">
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name}, ${testimonial.position}`} // Improved alt text
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover mr-4" // Responsive image size
                  loading="lazy" // Added lazy loading
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150?text=User";
                    e.target.alt = "Default user placeholder";
                  }}
                />
                <div>
                  <h4 className="font-medium text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {" "}
                    {testimonial.position}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
