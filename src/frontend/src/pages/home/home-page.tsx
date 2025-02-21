import { backend_service_user } from '@/declarations/backend_service_user';
import { useAuth } from '../../hooks/use-auth-client';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomePatient from '../../components/partials/home/home-patient';
import HomeDoctor from '../../components/partials/home/home-doctor';
import LandingPage from '../landing/landing-page';

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const { identity } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('Stranger');
  const [role, setRole] = useState('Patient');

  // //TODO
  // useEffect(() => {
  //   const fetchUsername = async () => {
  //     if (identity) {
  //       try {
  //         const name = await backend_service_user.getName(
  //           identity.getPrincipal(),
  //         );
  //         setUsername(name);
  //       } catch (error) {
  //         console.error('Error fetching username:', error);
  //         setUsername('Unknown User');
  //       }
  //     }
  //   };

  //   //TODO
  //   const fetchRole = () => {
  //     setRole('Patient');
  //   };

  //   fetchUsername();
  // }, [identity]);

  return (
    <div className="w-full h-full">
      {isAuthenticated ? (
        role === 'Patient' ? (
          <HomePatient />
        ) : (
          <HomeDoctor />
        )
      ) : (
        <LandingPage />
      )}
    </div>
  );
}
