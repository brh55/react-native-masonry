import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  masonry__container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%'
  },
  masonry__column: {
    // Might be able to disregard
    flexDirection: 'column'
  }
});

export default styles;
