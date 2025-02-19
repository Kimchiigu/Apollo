import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/use-auth-client';
import NavbarGuest from './navbar-guest';
import NavbarPatient from './navbar-patient';
import { getRole } from '../../facade/userService';

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchRole = () => {
      setRole(getRole);
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
