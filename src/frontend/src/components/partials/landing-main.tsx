import { Label } from '../ui/label';
import { motion } from 'framer-motion';
import LandingCarousel from './landing-carousel';

export default function LandingMain() {
  return (
    <div className="p-4 flex flex-col gap-4 xl:px-16">
      <motion.div
        className="flex flex-col gap-4 bg-background p-4 rounded-lg lg:hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Label className="font-poppins text-4xl font-bold text-primary">
          The Complete Health Solution
        </Label>

        <Label className="font-poppins text-foreground leading-6">
          Revolutionizing healthcare with blockchain technology. Consult with
          doctors, buy medicines safely, and manage your health in one trusted
          platform.
        </Label>
      </motion.div>

      <motion.div
        className="hidden lg:flex flex-col gap-4 p-4 rounded-lg relative bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dqvlnzw9f/image/upload/f_auto,q_auto/v1/Apollo/okw6mgcaqxolmtbsepwt')",
          minHeight: '50vh',
          backgroundSize: '110%',
          backgroundPosition: '60% center',
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="absolute inset-0 flex flex-col items-start justify-center text-center w-2/5 pl-12">
          <Label className="font-poppins text-5xl font-bold text-primary text-left">
            The Complete Health Solution
          </Label>
          <Label className="font-poppins text-foreground max-w-2xl text-left text-xl mt-4">
            Revolutionizing healthcare with blockchain technology. Consult with
            doctors, buy medicines safely, and manage your health in one trusted
            platform.
          </Label>
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col gap-4 bg-background p-4 rounded-lg lg:hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <LandingCarousel></LandingCarousel>
      </motion.div>

      <motion.div
        className="flex flex-col gap-4 bg-background p-4 rounded-lg lg:hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
      >
        <Label className="font-poppins text-4xl font-bold text-primary">
          About Us
        </Label>

        <Label className="font-poppins text-foreground leading-6">
          We present innovative health solutions with blockchain technology
          (Web3) to provide online doctor consultation and drug sales services.
          With a secure and transparent system, we ensure that every transaction
          runs with full trust. Our mission is to provide easy access to health
          services for everyone, ensuring fast, safe, and reliable medical
          consultations.
        </Label>
      </motion.div>

      <div className="hidden lg:flex flex-row gap-8 items-center justify-center">
        <motion.div
          className="flex flex-col gap-4 bg-background p-16 rounded-lg w-1/2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
        >
          <Label className="font-poppins text-5xl font-bold text-primary">
            About Us
          </Label>

          <Label className="font-poppins text-foreground leading-6 text-lg">
            We present innovative health solutions with blockchain technology
            (Web3) to provide online doctor consultation and drug sales
            services. With a secure and transparent system, we ensure that every
            transaction runs with full trust. Our mission is to provide easy
            access to health services for everyone, ensuring fast, safe, and
            reliable medical consultations.
          </Label>
        </motion.div>

        <motion.div
          className="hidden lg:flex flex-col gap-4 bg-background p-4 rounded-lg w-1/2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <LandingCarousel></LandingCarousel>
        </motion.div>
      </div>
    </div>
  );
}
