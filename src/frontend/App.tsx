import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './src/hooks/use-auth-client';
import AuthPage from './src/pages/auth/auth-page';
import Logout from './src/pages/auth/logout';
import HomePage from './src/pages/home/home-page';
import ChatPage from './src/pages/demo/chat-page';
import TransactionPage from './src/pages/demo/transaction-page';
import LandingPage from './src/pages/landing/landing-page';

function App() {
  const { isAuthenticated } = useAuth();

  const routes = [
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/login',
      element: <AuthPage />,
    },
    {
      path: '/logout',
      element: <Logout />,
    },
    {
      path: '/home',
      element: <>{isAuthenticated ? <HomePage /> : <Logout />}</>,
    },
    {
      path: '/chat',
      element: <>{isAuthenticated ? <ChatPage /> : <Logout />}</>,
    },
    {
      path: '/transaction',
      element: <>{isAuthenticated ? <TransactionPage /> : <Logout />}</>,
    },
  ];

  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
