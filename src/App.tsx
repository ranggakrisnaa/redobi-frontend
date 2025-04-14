import { Toaster } from '@/components/ui/toaster.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './routes';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full min-h-screen">
        <AppRoutes />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
};

export default App;
