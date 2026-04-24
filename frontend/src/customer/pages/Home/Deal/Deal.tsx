/** @format */

import DealCard from "./DealCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppSelector } from "../../../../Redux Toolkit/store";

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
  const { homeCategories } = useAppSelector((store) => store.homeCategory);
  console.log(homeCategories);

  return (
    <div className='py-2'>
      <style>{`
        .deal-slider .slick-track { display: flex !important; gap: 0; }
        .deal-slider .slick-slide { padding: 0 8px; }
        .deal-slider .slick-slide > div { height: 100%; }
      `}</style>

      <div className='deal-slider'>
        <Slider {...settings}>
          {homeCategories?.deals?.map((deal, index) => (
            <div key={index}>
              <DealCard
                deal={{
                  image: deal.category.image,
                  discount: deal.discount,
                  name: deal.category.name,
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
