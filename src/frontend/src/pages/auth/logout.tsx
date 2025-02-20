import { useAuth } from '../../hooks/use-auth-client';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="bg-background p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 font-poppins">Logged Out</h1>
        <p className="text-muted-foreground font-poppins">
          Sorry, but you're not authenticated yet :(
        </p>
        <div className="flex flex-row gap-4 w-full pt-4 justify-center">
          <Button
            variant={'default'}
            onClick={login}
            className="w-full font-poppins"
          >
            Log in
          </Button>
          <Button
            variant={'outline'}
            onClick={() => navigate('/')}
            className="w-full font-poppins"
          >
            Back to Landing Page
          </Button>
        </div>
      </div>
    </div>
  );
}
