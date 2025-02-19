export {};

declare global {
  interface Window {
    ic?: {
      plug?: {
        requestConnect: () => Promise<void>;
        isConnected: () => Promise<boolean>;
        agent: {
          getPrincipal: () => Promise<any>;
        };
      };
    };
  }
}
