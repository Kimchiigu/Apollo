import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/use-auth-client';
import NavbarGuest from './navbar-guest';
import NavbarPatient from './navbar-patient';

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const [role, setRole] = useState('');

  //TODO
  useEffect(() => {
    const fetchRole = () => {
      setRole('Patient');
    };
  });

  return (
    <div>
      {isAuthenticated ? (
        role === 'Patient' ? (
          <NavbarPatient />
        ) : (
          //   <NavbarDoctor />
          <NavbarPatient />
        )
      ) : (
        <NavbarGuest />
      )}
    </div>
  );
}
