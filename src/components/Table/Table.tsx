import { format, secondsToMilliseconds } from 'date-fns';
import { useEffect, useState } from 'react';
import {
  Button,
  Text,
  View,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { keys } from 'lodash';

import { useCurrentCryptoData } from '../../api/crypto-data';
import { assets } from '../../assets';
import { CurrencyCode } from '../../types/crypto-data';
import { Currency } from '../Currency/Currency';
import { Gradient } from '../Gradient/Gradient';
import { Price } from '../Price/Price';

import { styles } from './styles';

const STALE_TIME_IN_SECONDS = 60;

export function Table() {
  const {
    data: cryptoData,
    isLoading,
    isError,
    refetch,
  } = useCurrentCryptoData({
    staleTime: secondsToMilliseconds(STALE_TIME_IN_SECONDS),
    cacheTime: 0,
  });

  const [counter, setCounter] = useState(STALE_TIME_IN_SECONDS);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('USD');

  useEffect(() => {
    counter > 0 &&
      setTimeout(() => setCounter((prevState) => prevState - 1), 1000);
  }, [counter]);

  useEffect(() => {
    if (isError) {
      Alert.alert(
        'Oops, Something went wrong',
        'Please try again later or contact support'
      );
    }
  }, [isError]);

  return (
    <Gradient containerStyle={styles.container}>
      <View style={styles.info}>
        <View style={styles.titleWrapper}>
          <Image source={assets.bitcoin} style={styles.icon} />
          <Text style={styles.title}>{`${cryptoData?.chartName} Price`}</Text>
        </View>
        <View>
          <Text style={styles.date}>
            {cryptoData?.time.updated &&
              format(new Date(cryptoData.time.updated), 'do MMM yyyy')}
          </Text>
          <Text style={styles.time}>
            {cryptoData?.time.updated &&
              format(new Date(cryptoData.time.updated), 'HH:mm')}
          </Text>
        </View>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.options}>
          {keys(cryptoData?.bpi).map((code) => (
            <Currency
              key={code}
              currency={code as CurrencyCode}
              selected={code === selectedCurrency}
              onPress={(currency: CurrencyCode) =>
                setSelectedCurrency(currency)
              }
            />
          ))}
        </View>
        <View style={styles.placeholder}>
          {isLoading && <ActivityIndicator />}
          {!isLoading && <Price currency={cryptoData?.bpi[selectedCurrency]} />}
        </View>
        <View style={styles.placeholder}>
          {!counter && !isLoading && !isError && (
            <Button
              color={'#7DCFFF'}
              title="Refresh prices"
              onPress={() => {
                setCounter(STALE_TIME_IN_SECONDS);
                refetch();
              }}
            />
          )}
        </View>
      </View>
      <Text style={styles.disclaimer}>{cryptoData?.disclaimer}</Text>
    </Gradient>
  );
}
