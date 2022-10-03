import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Planner from './components/Planner'

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Planner />
    </QueryClientProvider>
  );
}
