import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import { Label } from '../ui/label';

export default function LandingCarousel() {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem className="">
          <div className="flex flex-col items-center justify-center">
            <img
              src="https://res.cloudinary.com/dqvlnzw9f/image/upload/f_auto,q_auto/v1/Apollo/v9avhod8tqlgu5hljd5j"
              alt=""
              className="w-full h-64 object-cover rounded-lg md:w-2/3 xl:w-full xl:h-[50vh] xl:px-16 xl:pt-16 xl:pb-4"
            />
            <Label className="text-lg font-poppins pt-4 text-primary font-bold text-center xl:text-3xl">
              Online Consultation with Doctors
            </Label>
            <Label className="text-center leading-5 md:w-2/3">
              Get medical advice from experienced doctors anytime, anywhere.
            </Label>
          </div>
        </CarouselItem>
        <CarouselItem className="">
          <div className="flex flex-col items-center justify-center">
            <img
              src="https://res.cloudinary.com/dqvlnzw9f/image/upload/f_auto,q_auto/v1/Apollo/zhj1c1tr02ptymiexjag"
              className="w-full h-64 object-cover rounded-lg md:w-2/3 xl:w-full xl:h-[50vh] xl:px-16 xl:pt-16 xl:pb-4"
              alt=""
            />
            <Label className="text-lg font-poppins pt-4 text-primary font-bold text-center xl:text-3xl">
              Online Medicine Purchase
            </Label>
            <Label className="text-center leading-5 md:w-2/3">
              Search and buy medicines easily through a blockchain-based
              e-commerce system. No queues, no hassle—just practical solutions
              for your health needs.
            </Label>
          </div>
        </CarouselItem>
        <CarouselItem className="">
          <div className="flex flex-col items-center justify-center">
            <img
              src="https://res.cloudinary.com/dqvlnzw9f/image/upload/f_auto,q_auto/v1/Apollo/ct7wcsfnciivvcedcmlq"
              className="w-full h-64 object-cover rounded-lg md:w-2/3 xl:w-full xl:h-[50vh] xl:px-16 xl:pt-16 xl:pb-4"
              alt=""
            />
            <Label className="text-lg font-poppins pt-4 text-primary font-bold text-center xl:text-3xl">
              Security and Transparency
            </Label>
            <Label className="text-center leading-5 md:w-2/3">
              We use blockchain technology (Web3) to ensure every transaction is
              secure, transparent and cannot be manipulated. Your trust is our
              priority.
            </Label>
          </div>
        </CarouselItem>
        <CarouselItem className="">
          <div className="flex flex-col items-center justify-center">
            <img
              src="https://res.cloudinary.com/dqvlnzw9f/image/upload/f_auto,q_auto/v1/Apollo/tavegylrouf0s79o7uuz"
              className="w-full h-64 object-cover rounded-lg md:w-2/3 xl:w-full xl:h-[50vh] xl:px-16 xl:pt-16 xl:pb-4"
              alt=""
            />
            <Label className="text-lg font-poppins pt-4 text-primary font-bold text-center xl:text-3xl">
              AI Chatbot
            </Label>
            <Label className="text-center leading-5 md:w-2/3">
              Have a health question? Our AI chatbot is ready to help with fast,
              accurate medical information, 24/7, right from your phone.
            </Label>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
