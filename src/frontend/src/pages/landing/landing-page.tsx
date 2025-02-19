import Footer from '../../components/partials/footer';
import LandingMain from '../../components/partials/landing-main';
import Navbar from '../../components/partials/navbar';

export default function LandingPage() {
  return (
    <div className="w-screen min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="flex-1">
        <LandingMain />
      </div>

      <Footer />
    </div>
  );
}
