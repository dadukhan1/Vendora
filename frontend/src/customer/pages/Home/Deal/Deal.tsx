/** @format */

import DealCard from "./DealCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Deal = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className='py-2'>
      <style>{`
        .deal-slider .slick-track { display: flex !important; gap: 0; }
        .deal-slider .slick-slide { padding: 0 8px; }
        .deal-slider .slick-slide > div { height: 100%; }
      `}</style>

      <div className='deal-slider'>
        <Slider {...settings}>
          {[1, 1, 1, 1, 1, 1, 1].map((_, index) => (
            <div key={index}>
              <DealCard
                deal={{
                  image:
                    "https://images.unsplash.com/photo-1534217466718-ef4950786e24?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  discount: 10,
                }}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Deal;
