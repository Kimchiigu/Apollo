import LandingMain from '../../components/partials/landing-main';
import Navbar from '../../components/partials/navbar';

export default function LandingPage() {
  return (
    <div className="w-screen h-screen bg-background">
      <Navbar></Navbar>
      <LandingMain></LandingMain>
    </div>
  );
}
