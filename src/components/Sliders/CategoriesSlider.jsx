import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Stack, Typography } from "@mui/material";
import { RiseLoader } from "react-spinners";
import usecatergories from "./../../Hooks/usecatergories";
const CategoriesSlider = () => {
  const { data, isLoading, isError, error } = usecatergories();

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  if (isError) {
    return (
      <>
        <div></div>
      </>
    );
  }
  if (isLoading) {
    return (
      <>
        <div></div>
      </>
    );
  }
  return (
    <div>
      <Slider {...settings}>
        {data?.data.map((catergory, index) => (
          <div></div>
        ))}
      </Slider>
    </div>
  );
};

export default CategoriesSlider;
