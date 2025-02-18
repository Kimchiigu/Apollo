import { Label } from '../ui/label';
import { motion } from 'framer-motion';
import LandingCarousel from './landing-carousel';

export default function LandingMain() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <motion.div
        className="flex flex-col gap-4 bg-background p-4 rounded-lg"
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
        className="flex flex-col gap-4 bg-background p-4 rounded-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <LandingCarousel></LandingCarousel>
      </motion.div>

      <motion.div
        className="flex flex-col gap-4 bg-background p-4 rounded-lg"
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
          runs with full trust.
          <br /> <br />
          Our mission is to provide easy access to health services for everyone,
          ensuring fast, safe, and reliable medical consultations.
        </Label>
      </motion.div>
    </div>
  );
}
