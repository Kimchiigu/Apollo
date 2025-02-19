import { useAuth } from '../../hooks/use-auth-client';
import RegisterForm from './register';
import Logout from './logout';

export default function AuthPage() {
  const { isAuthenticated } = useAuth();

  return <>{isAuthenticated ? <RegisterForm /> : <Logout />}</>;
}
