import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RiseLoader } from "react-spinners";
import useBrands from "../../Hooks/Brands/useBrands";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";

const BrandSlider = () => {
  const { data, isLoading, isError, error } = useBrands();
  console.log(data);

  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 6,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (isError) {
    return (
      <>
        <div><Error /></div>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <div>
          <Loading />
        </div>
      </>
    );
  }

  return (
    <div className="section p-section bg-inherit overflow-hidden container">
      <div className="container-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Brands</h2>
        <div className="row category-section">
          <Slider {...settings}>
            {data?.brands?.map((brand) => (
              <div key={brand._id} className="p-2">
                <div className=" border rounded-lg p-4 shadow-md h-20 flex flex-col items-center">
                  <img
                    src={brand.image.
                      secure_url}
                    alt={brand.name}
                    className="w-full h-full object-contain mb-3"
                  />
                 
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default BrandSlider;
