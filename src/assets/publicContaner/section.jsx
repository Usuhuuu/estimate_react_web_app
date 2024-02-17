import React, { useEffect, useState } from "react";
import "../CSS/style.css";

const Sect = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Array of slide image paths
  const slides = [
    "/sliderPhoto/slider2.jpg",
    "/sliderPhoto/slider1.png",
    "/sliderPhoto/slider3.jpg",
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % slides.length);
    }, 5000);

    return () => {
      clearInterval(interval); // Clean up the interval on unmount
    };
  }, [currentSlide, slides.length]);
  useEffect(() => {
    const slider = document.querySelector(".PhotoSlider");
    const translateValue = -currentSlide * 100; // Translate by slide index times 100%
    slider.style.transform = `translateX(${translateValue}%)`;
  }, [currentSlide]);
  return (
    <section>
      <div className="PhotoSlider">
        {slides.map((slide, index) => (
          <div key={index} className="slide">
            <img src={slide} alt={`ADPHOTO=${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="entertainmentThings"></div>
      <hr className="herrgui"></hr>
    </section>
  );
};

export default Sect;
