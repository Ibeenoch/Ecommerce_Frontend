import React, { useEffect, useState } from 'react'
import pic1 from '../../../images/Apple 2022 MacBook Air Laptop 1.jpg'
import pic2 from '../../../images/Dell AlienWare 1-1.jpg'
import pic3 from '../../../images/Dell Newest Inspiron 15 3511 Laptop, 15.6_ FHD Touchscreen__2.jpg'
import pic4 from '../../../images/s24 ultra6.jpg'
import pic5 from '../../../images/lenovo yoga i7 5.jpg'
import pic6 from '../../../images/Untitled.jpg'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid'

const Carousel = () => {

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 3000); // Change slide every 3 seconds
  
      return () => {
        clearInterval(interval);
      };
    }, []);


    const slides = [pic1, pic2, pic3, pic4, pic5, pic6];

    const goToPreviousSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
      };
    
      const goToNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      };
  
    return (
      <div className="carousel w-full relative bg-orange-500 max-w-screen-lg mt-10 mx-auto overflow-hidden">
        <div
          className="slides flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide} className="w-full flex-shrink-0">
              <img
                src={slide}
                alt=''
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
        
          {/* Previous Button */}
      <button
        className="absolute top-1/2 left-0 transform  -translate-y-1/2 p-6 bg-gray-300 opacity-50 hover:opacity-75 focus:outline-none"
        onClick={goToPreviousSlide}
        aria-label="Previous Slide"
      >
        &lt;
      </button>

      {/* Next Button */}
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 p-6 bg-gray-300 opacity-50 hover:opacity-75 focus:outline-none"
        onClick={goToNextSlide}
        aria-label="Next Slide"
      >
        &gt;
      </button>

      </div>


  )
}

export default Carousel
