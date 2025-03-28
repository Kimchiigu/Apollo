import { ActorProvider, AgentProvider } from '@ic-reactor/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import { canisterId, idlFactory } from '@/declarations/backend';
import './index.scss';
import LoadingAnimation from './src/components/partials/util/loading-animation';
import { AuthProvider } from './src/hooks/use-auth-client';
import { Toaster } from './src/components/ui/toaster';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <AgentProvider withProcessEnv> */}
    {/* <ActorProvider idlFactory={idlFactory} canisterId={canisterId}> */}
    <AuthProvider>
      <LoadingAnimation>
        <App />
        <Toaster />
      </LoadingAnimation>
    </AuthProvider>
    {/* </ActorProvider> */}
    {/* </AgentProvider> */}
  </React.StrictMode>,
);
