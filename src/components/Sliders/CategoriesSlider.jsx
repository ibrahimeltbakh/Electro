import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RiseLoader } from "react-spinners";
import useCategories from "../../Hooks/category/usecatergories";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";

const CategoriesSlider = () => {
  const { data, isLoading, isError, error } = useCategories();
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
    <div className="container section p-section bg-inherit overflow-hidden">
      <div className="container-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Categories</h2>
        <div className="row category-section">
          <Slider {...settings}>
            {data?.categories?.map((category) => (
              <div key={category._id} className="p-2 ">
                <div className="category-card  rounded-lg p-4 shadow-md bg-inherit flex flex-col items-center ">
                  <img
                    src={category.image.
                      secure_url}
                    alt={category.name}
                    className="w-full h-full rounded-lg object-contain mb-3"
                  />
                  <p variant="h6" className=" bg-amber-200  w-full  text-center font-semibold text-amber-950">
                    {category.name}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default CategoriesSlider;
