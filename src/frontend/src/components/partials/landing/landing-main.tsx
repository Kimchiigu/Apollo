import { Label } from '../../ui/label';
import { motion } from 'framer-motion';
import { Button } from '../../ui/button';
import {
  ArrowRight,
  MessageSquare,
  PlusCircle,
  ShieldCheck,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LandingMain() {
  const navigate = useNavigate();

  return (
    <>
      <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center bg-background text-foreground">
        <div
          className="absolute inset-0 lg:block hidden blur-sm"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dqvlnzw9f/image/upload/f_auto,q_auto/v1/Apollo/k807xrjgtqtp8ma87ua7')",
            backgroundSize: '110%',
            backgroundPosition: '70% center',
            backgroundRepeat: 'no-repeat',
            opacity: 1,
          }}
        ></div>

        <div className="container px-4 md:px-6 mx-auto flex flex-col items-center text-center relative z-10">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-color-2 font-poppins">
              Apollo: Healthcare, Anytime, Anywhere
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl font-poppins">
              Secure consultations, online pharmacy, and AI-powered health
              assistance - all powered by blockchain technology.
            </p>
          </div>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
            <Button
              variant={'secondary'}
              className="w-full sm:w-auto font-poppins lg:text-xl lg:p-6"
              onClick={() => navigate('/login')}
            >
              Get Started
            </Button>
            <Button
              variant={'outline'}
              className="w-full sm:w-auto text-primary font-poppins lg:text-xl lg:p-6"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/10 dark:bg-secondary/20 flex justify-center">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 font-poppins text-primary">
            Key Features
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 text-center">
            <div className="flex flex-col items-center">
              <MessageSquare className="h-12 w-12 mb-4 text-secondary" />
              <h3 className="text-lg font-bold text-foreground font-poppins">
                Online Consultations
              </h3>
              <p className="text-md text-muted-foreground font-poppins">
                Connect with healthcare professionals from anywhere, at any
                time.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <PlusCircle className="h-12 w-12 mb-4 text-secondary" />
              <h3 className="text-lg font-bold text-foreground font-poppins">
                Online Pharmacy
              </h3>
              <p className="text-md text-muted-foreground font-poppins">
                Order medications securely and have them delivered to your
                doorstep.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="h-12 w-12 text-secondary mb-4" />
              <h3 className="text-lg font-bold text-foreground font-poppins">
                Blockchain Security
              </h3>
              <p className="text-md text-muted-foreground font-poppins">
                Enhanced security and transparency for all your health
                transactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center bg-background text-foreground">
        <div className="container px-4 md:px-6 mx-auto flex flex-col items-center text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary font-poppins">
              Experience the Future of Healthcare
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl font-poppins">
              Join thousands of users who trust HealthChain for their healthcare
              needs.
            </p>
          </div>
          <Button
            className="font-poppins w-full sm:w-auto inline-flex h-10 items-center justify-center rounded-md bg-secondary px-8 text-sm font-medium text-secondary-foreground shadow transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary disabled:pointer-events-none disabled:opacity-50 mt-8"
            onClick={() => navigate('/login')}
          >
            Sign Up Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </>
  );
}
