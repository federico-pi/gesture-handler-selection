import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import axios from 'axios';
import { CurrentCryptoData } from '../types/crypto-data';

const getCurrentCryptoData = async () => {
  try {
    const response = await axios.get<CurrentCryptoData>(
      'https://api.coindesk.com/v1/bpi/currentprice.json'
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export function useCurrentCryptoData(
  options?: Omit<
    UseQueryOptions<
      Promise<CurrentCryptoData | undefined>,
      unknown,
      CurrentCryptoData,
      [string]
    >,
    'queryKey' | 'queryFn'
  >
): UseQueryResult<CurrentCryptoData> {
  return useQuery(['crypto-data'], getCurrentCryptoData, { ...options });
}
