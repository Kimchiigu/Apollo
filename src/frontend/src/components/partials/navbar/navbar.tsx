import { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/use-auth-client';
import NavbarGuest from './navbar-guest';
import NavbarPatient from './navbar-patient';
import NavbarDoctor from './navbar-doctor';

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const [role, setRole] = useState('');

  //TODO
  useEffect(() => {
    const fetchRole = () => {
      setRole('Patient');
    };

    fetchRole();
  });

  return (
    <div>
      {isAuthenticated ? (
        role === 'Patient' ? (
          <NavbarPatient />
        ) : (
          <NavbarDoctor />
        )
      ) : (
        <NavbarGuest />
      )}
    </div>
  );
}
