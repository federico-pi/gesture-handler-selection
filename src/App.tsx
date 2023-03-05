import { StatusBar } from 'expo-status-bar';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Table } from './components/Table/Table';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
      <Table />
    </QueryClientProvider>
  );
}
