import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TestimonialData = [
  {
    id: 1,
    name: "Milon Ahmed",
    text: "Shoplio made my shopping experience smooth, fast and enjoyable. I’ll definitely return again soon!",
    img: "https://i.ibb.co.com/sJWyQc3S/449489881-1929331690825289-4972121263714079550-n.jpg",
  },
  {
    id: 2,
    name: "Tacin Sorker",
    text: "The products arrived quickly, well-packed and in perfect condition. Amazing quality at affordable prices!",
    img: "https://i.ibb.co.com/cMH9yPR/532382222-2312369565850180-8656750669821484160-n.jpg",
  },
  {
    id: 3,
    name: "Mahfujul Hasan",
    text: "Customer service was friendly, responsive and helpful. Shopping here feels easy and stress-free always.",
    img: "https://i.ibb.co.com/wrjKXBsp/518123828-2102011563639577-8667960294346119224-n.jpg",
  },
  {
    id: 4,
    name: "Taposh Barai",
    text: "I love the website’s design, fast checkout and reliable delivery. Shopping feels exciting every time!",
    img: "https://i.ibb.co.com/cXRMNQkf/526709950-1938179066957072-8445666124668316335-n.jpg",
  },
];

const Testimonials = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="py-10 mb-10">
      <div className="container mx-auto px-4">
        {/* header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-primary">
            What our customers are saying
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Reviews
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            Shoplio delivers quality products, fast shipping and great
            service—making shopping experience truly enjoyable.
          </p>
        </div>

        {/* Testimonial cards */}
        <div data-aos="zoom-in">
          <Slider {...settings}>
            {TestimonialData.map((data) => (
              <div key={data.id} className="my-6">
                <div className="flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl dark:bg-gray-800 bg-primary/10 relative">
                  <div className="mb-4 flex justify-center">
                    <img
                      src={data.img}
                      alt={data.name}
                      className="rounded-full w-20 h-20"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="space-y-3 text-center">
                      <p className="text-xs text-gray-500">{data.text}</p>
                      <h1 className="text-xl font-bold text-black/80 dark:text-white">
                        {data.name}
                      </h1>
                    </div>
                  </div>
                  <p className="text-black/20 text-9xl font-serif absolute top-0 right-2 select-none">
                    ,,
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

export default Testimonials;
