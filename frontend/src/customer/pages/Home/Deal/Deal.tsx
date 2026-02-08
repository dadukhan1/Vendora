/** @format */

import DealCard from "./DealCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Deal = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  return (
    <div className='py-5 lg:px-20 '>
      <div className='slider-container'>
        <Slider {...settings}>
          {[1, 1, 1, 1, 1, 1, 1].map((item, index) => (
            <div key={index} className='flex flex-row w-60'>
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
