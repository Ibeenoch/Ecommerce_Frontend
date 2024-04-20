import React, { useEffect, useState } from "react";
import pic1 from "../../../images/nike air2.png";
import pic2 from "../../../images/OPPO Find N2 Flip Dual-SIM 256GB ROM + 8GB RAM__3.jpg";
import pic3 from "../../../images/T-shirt 2.png";
import pic4 from "../../../images/s24 ultra6.jpg";
import pic5 from "../../../images/lenovo yoga i7 5.jpg";
import pic6 from "../../../images/T-shirt 1.png";
import pic7 from "../../../images/Samsung s24 ultra.jpg";
import pic8 from "../../../images/apple watch2 .png";
import pic9 from "../../../images/ps5 3.png";
import "./Carousel.css";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const Carousel: React.FC = () => {
  const images = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [numImagesToShow, setNumImagesToShow] = useState(3);

  // Update the number of images to show based on the window size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setNumImagesToShow(3);
      } else if (window.innerWidth >= 768) {
        setNumImagesToShow(2);
      } else {
        setNumImagesToShow(1);
      }
    };

    // Add event listener
    window.addEventListener("resize", handleResize);
    // Initial call
    handleResize();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + numImagesToShow) % images.length
    );
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - numImagesToShow + images.length) % images.length
    );
  };

  return (
    <div className="carousel">
      <button onClick={handlePrevious} className="carousel-button p-4">
        <ChevronLeftIcon
          className="bg-red-400"
          width={30}
          height={35}
          fill="white"
          color="white"
        />
      </button>

      <div className="carousel-images">
        {images
          .slice(currentIndex, currentIndex + numImagesToShow)
          .map((image, index) => (
            <div key={index} className="carousel-image">
              <img src={image} alt={`Carousel ${index}`} />
            </div>
          ))}
      </div>

      <button onClick={handleNext} className="carousel-button p-4">
        <ChevronRightIcon
          className="bg-red-400"
          width={30}
          height={35}
          fill="white"
          color="white"
        />
      </button>
    </div>
  );
};

export default Carousel;
