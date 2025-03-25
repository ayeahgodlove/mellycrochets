import React from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";

const AppHero = () => {
  return (
    <div className="flex justify-center lg:items-center  h-[60vh] lg:h-[80vh] lg:min-h-screen lg:pb-30 bg-gray-100">
      {/* Main Content */}
      <div className="relative w-full max-w-4xl lg:py-16">
        {/* Floating Icons */}
        <div className="hidden md:block absolute w-full h-full pointer-events-none">
          <img
            src="/photos/icon3.jpg"
            alt="Decoration"
            className="absolute top-[10%] left-[20%] w-12 h-12 md:w-16 md:h-16 rounded-full shadow-lg z-[2]"
          />
          <img
            src="/photos/icon2.png"
            alt="Decoration"
            className="absolute top-[3%] right-[10%] w-12 h-12 md:w-16 md:h-16 rounded-full shadow-lg z-[2]"
          />
          <img
            src="/photos/icon1.png"
            alt="Decoration"
            className="absolute bottom-[40%] left-[-10%] w-12 h-12 md:w-16 md:h-16 rounded-full shadow-lg z-[2]"
          />
          <img
            src="/photos/icon4.jpg"
            alt="Decoration"
            className="absolute bottom-[5%] right-[70%] w-12 h-12 md:w-16 md:h-16 rounded-full shadow-lg z-[2]"
          />
        </div>

        {/* Crochet Image Carousel */}
        <div className="mx-auto rounded-lg">
          <Swiper
            direction="horizontal"
            spaceBetween={30}
            slidesPerView={1}
            speed={1200}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            // pagination={{ clickable: true }}
            navigation={{
              nextEl: ".featured-next__active",
              prevEl: ".featured-prev__active",
            }}
            // pagination={{ el: ".featured-pagination__active", clickable: true }}
            modules={[Navigation, Pagination]}
            className="w-full h-[50vh] lg:h-[80vh] rounded-lg"
          >
            <SwiperSlide className="flex justify-center">
              <div className="bg-[#fee9e9dd] rounded-full mt-10">
                <img
                  src="/photos/image5.png"
                  alt="Crochet Cardigan"
                  className="w-[300px] lg:w-[600px] h-[400px] lg:h-full object-contain lg:object-contain rounded-lg"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex justify-center">
              <div className="bg-[#fee9e9dd] rounded-full mt-10">
                <img
                  src="/photos/image2.png"
                  alt="Crochet Cardigan"
                  className="w-[300px] lg:w-[600px] h-[400px] lg:h-full object-contain lg:object-contain rounded-lg"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex justify-center">
              <div className="bg-[#fee9e9dd] rounded-full mt-10">
                <img
                  src="/photos/image3.png"
                  alt="Crochet Cardigan"
                  className="w-[300px] lg:w-[600px] h-[400px] lg:h-full object-contain lg:object-contain rounded-lg"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex justify-center">
              <div className="bg-[#fee9e9dd] rounded-full mt-10">
                <img
                  src="/photos/image4.png"
                  alt="Crochet Cardigan"
                  className="w-[300px] lg:w-[600px] h-[400px] lg:h-full object-contain lg:object-contain rounded-lg"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex justify-center">
              <div className="bg-[#fee9e9dd] rounded-full mt-10">
                <img
                  src="/photos/image1.png"
                  alt="Crochet Cardigan"
                  className="w-[300px] lg:w-[600px] h-[400px] lg:h-full object-contain lg:object-contain rounded-lg"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="absolute bottom-[40%] w-full z-[2] px-2 flex items-center justify-between text-center space-x-4 mt-6">
          <button className="featured-prev__active bg-[#fdf3f3] p-2 rounded-full hover:bg-red-200 hover:text-white">
            <FaRegArrowAltCircleLeft size={25} />
          </button>
          <div className="pagination featured-pagination__active" />
          <button className="featured-next__active bg-[#fdf3f3] p-2 rounded-full hover:bg-red-200 hover:text-white">
            <FaRegArrowAltCircleRight size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppHero;
