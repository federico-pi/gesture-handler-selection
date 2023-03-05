import { Text, TouchableOpacity } from 'react-native';

import { CurrencyCode } from '../../types/crypto-data';

import { styles } from './styles';

interface OptionProps {
  currency: CurrencyCode;
  selected: boolean;
  onPress: (currency: CurrencyCode) => void;
}

export function Currency({ currency, selected, onPress }: OptionProps) {
  if (!currency) {
    return null;
  }

  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.highlight]}
      onPress={() => onPress(currency)}
    >
      <Text style={styles.text}>{currency}</Text>
    </TouchableOpacity>
  );
}
