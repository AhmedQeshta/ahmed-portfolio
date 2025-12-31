'use client';
import Slider from 'react-slick';
import { IWorkSlider } from '@/features/works/types/work';
import Card from '@/features/works/components/ui/Card';
import Arrow from '@/features/works/components/ui/Arrow';
import { useSlider } from '@/features/works/hooks/useSlider';

export default function WorkSlider({ works }: IWorkSlider) {
  const { sliderRef, updateSlideFocus } = useSlider(works);

  const sliderSettings = {
    dots: true,
    infinite: works.length > 1,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
    prevArrow: <Arrow />,
    nextArrow: <Arrow isNext={true} />,
    centerMode: false,
    afterChange: updateSlideFocus, // Update focus after each slide change
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
          dots: true,
          afterChange: updateSlideFocus,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
          dots: true,
          afterChange: updateSlideFocus,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          dots: true,
          centerMode: true,
          centerPadding: '30px',
          afterChange: updateSlideFocus,
        },
      },
    ],
  };

  return (
    <div className="relative px-10 md:px-12 lg:px-16 -mx-4 md:-mx-8 lg:-mx-12 xl:-mx-16 pb-14">
      <div className="mx-2 md:mx-6">
        <Slider ref={sliderRef} {...sliderSettings} className="overflow-visible">
          {works.map((work) => (
            <div key={work._id} className="px-2 md:px-3 lg:px-4">
              <Card work={work} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
