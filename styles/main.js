import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  masonry__container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%'
  },
  masonry__column: {
    // Might be able to disregard
    flexDirection: 'column'
  }
});
