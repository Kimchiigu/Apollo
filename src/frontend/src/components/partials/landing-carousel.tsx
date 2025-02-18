import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';

export default function LandingCarousel() {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem className="">
          <img
            src="https://res.cloudinary.com/dqvlnzw9f/image/upload/f_auto,q_auto/v1/Apollo/v9avhod8tqlgu5hljd5j"
            alt=""
          />
        </CarouselItem>
        <CarouselItem className="">
          <img
            src="https://res.cloudinary.com/dqvlnzw9f/image/upload/f_auto,q_auto/v1/Apollo/rojjbwbvqi82sjdmpirx"
            alt=""
          />
        </CarouselItem>
        <CarouselItem className="">
          <img
            src="https://res.cloudinary.com/dqvlnzw9f/image/upload/f_auto,q_auto/v1/Apollo/ct7wcsfnciivvcedcmlq"
            alt=""
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
