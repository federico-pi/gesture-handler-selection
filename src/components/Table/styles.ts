import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 72,
    paddingHorizontal: 28,
    paddingBottom: 40,
  },
  info: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 64,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 26,
    height: 26,
    marginRight: 8,
  },
  title: {
    fontSize: 24,
    color: '#fefefe',
  },
  date: {
    textAlign: 'right',
    fontSize: 16,
    color: '#fefefe',
  },
  time: {
    textAlign: 'right',
    fontSize: 13,
    color: '#fefefe',
  },
  wrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  options: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 36,
  },
  placeholder: {
    width: '100%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disclaimer: {
    fontSize: 11,
    color: '#fefefe',
  },
});
