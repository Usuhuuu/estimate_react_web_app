import { useEffect, useState } from "react";
import "../CSS/style.css";
import { publicPath } from "../../App";

const Sect = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { url: `${publicPath("sliderPhoto/slider2.jpg")}` },
    { url: `${publicPath("sliderPhoto/slider1.png")}` },
    { url: `${publicPath("sliderPhoto/slider3.jpg")}` },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % slides.length);
    }, 5000);

    return () => {
      clearInterval(interval);
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
            <img src={slide.url} alt={`ADPHOTO=${index + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Sect;
