import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './src/hooks/use-auth-client';
import AuthPage from './src/pages/auth/auth-page';
import Logout from './src/pages/auth/logout';
import HomePage from './src/pages/home/home-page';
import ChatPage from './src/pages/chat/chat-page';
import TransactionPage from './src/pages/demo/transaction-page';
import LandingPage from './src/pages/landing/landing-page';
import MedicinePage from './src/pages/medicine/medicine-page';
import ChatPageDemo from './src/pages/demo/chat-page-demo';
import ShopPage from './src/pages/shop/shop-page';
import PaymentPage from './src/pages/payment/payment-page';
import ProfilePage from './src/pages/profile/profile-page';
import EditProfilePage from './src/pages/profile/edit-profile-page';
import SettingsPage from './src/pages/setting/settings-page';

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
      path: '/chatdemo',
      element: <>{isAuthenticated ? <ChatPageDemo /> : <Logout />}</>,
    },
    {
      path: '/transaction',
      element: <>{isAuthenticated ? <TransactionPage /> : <Logout />}</>,
    },
    {
      path: '/medicine',
      element: <MedicinePage />,
    },
    {
      path: '/chat',
      element: <ChatPage />,
    },
    {
      path: '/shop',
      element: <ShopPage />,
    },
    {
      path: '/profile',
      element: <ProfilePage />,
    },
    {
      path: '/editprofile',
      element: <EditProfilePage />,
    },
    {
      path: '/settings',
      element: <SettingsPage />,
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
