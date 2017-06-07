import React from 'react';
import { Text } from 'react-native';

const MOCK = [
  {
    uri: 'http://test1.jpg',
    height: 200,
    width: 100,
    gutter: 4,
    data: {
      caption: 'Test'
    },
    onPress: () => null,
    renderHeader: (data) => <Text>Test</Text>
  },
  {
    uri: 'http://test2.jpg',
    height: 200,
    width: 100,
    gutter: 4
  }
];

export default MOCK;
