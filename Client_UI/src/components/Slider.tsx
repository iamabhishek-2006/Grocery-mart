import React, { useState, useEffect } from "react";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.jpg";
import img7 from "../assets/img7.jpg";

const Slider = () => {
  const images = [img1, img2, img3, img4, img5, img6, img7];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Next image handler (Infinite Loop)
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Prev image handler (Infinite Loop)
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => prevIndex === 0 ? images.length - 1 : prevIndex - 1);
  };

  // Auto-play feature (Optional: Har 4 second mein change hoga)
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return ( 
    <div className="max-w-7xl mx-auto my-3 p-2 sm:p-0 ">
      {/* Slider Container */}
      <div className="relative h-62.5 sm:h-95 md:h-120 lg:h-107.5 w-full overflow-hidden rounded-2xl shadow-xl bg-black">
        {/* Images Stack */}
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Image */}
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Dark Overlay for Opacity (Aapki req. ke according) */}
            <div className="absolute inset-0 bg-black/30 pointer-events-none" />
            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 text-white">
              <span className="uppercase tracking-[4px] text-sm text-green-300">
                Grocery Mart
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mt-3 leading-tight">
                Fresh Groceries <br />
                Delivered Fast
              </h1>

              <p className="mt-5 max-w-lg text-sm sm:text-lg text-gray-200">
                Fresh fruits, vegetables, dairy products and daily essentials
                delivered at your doorstep.
              </p>

              <button className="mt-8 w-fit bg-green-600 hover:bg-green-700 transition-all duration-300 hover:scale-105  px-4 py-2 sm:px-8 py:3 rounded-lg font-semibold flex items-center gap-2 shadow-xl">
                Shop Now
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}

        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/60 text-white p-2 sm:p-3 rounded-full backdrop-blur-md transition-all duration-200 focus:outline-none"
          aria-label="Previous Slide"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/60 text-white p-2 sm:p-3 rounded-full backdrop-blur-md transition-all duration-200 focus:outline-none"
          aria-label="Next Slide"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Bottom Pagination Dots - Simple & Minimalist */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
          {/* Gap thoda kam kiya hai simple look ke liye */}
          <div className="flex items-center gap-2.5   px-4 py-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                // h-2 w-2 se dots chote ho jayenge (8px)
                className={`h-2 w-2 rounded-full transition-colors duration-300 ease-in-out focus:outline-none ${
                  currentIndex === index
                    ? "bg-white" // Active dot purely white
                    : "bg-white/40 hover:bg-white/70" // Inactive dots translucent white
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;

