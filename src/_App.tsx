import { StatusBar } from 'expo-status-bar';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Table } from './components/Table/_Table';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Gradient } from './components/Gradient/Gradient';
import { StyleSheet } from 'react-native';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/** 3 */}
      <GestureHandlerRootView style={styles.container}>
        <StatusBar style="light" />
        <Gradient containerStyle={styles.container}>
          <Table />
        </Gradient>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
