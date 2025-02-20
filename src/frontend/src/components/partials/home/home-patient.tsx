import Footer from '../footer/footer';
import Navbar from '../navbar/navbar';
import HomePatientMain from './home-patient-main';

export default function HomePatient() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-screen w-full h-full">
        <HomePatientMain></HomePatientMain>
      </div>
      <Footer></Footer>
    </div>
  );
}
