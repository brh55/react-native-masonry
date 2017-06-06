import { Text, View, TouchableHighlight } from 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import Masonry from '../components/Masonry';
import renderer from 'react-test-renderer';

const brickSet = [
  {
    uri: 'https://cat1.jpg',
    data: {
      id: 1
    }
  },
  {
    data: {
      routeId: 'cat-3',
      id: 2,
    },
    uri: 'http://test.com/cat3.jpg',
    onPress: (brick) => redirect(brick.routeId)
  },
  {
    data: {
      id: 3
    },
    uri: 'http://test.com/cat2.jpg'
  },
  {
    uri: 'http://test.com/cat3.jpg'
  }
];

test('Render masonry correct', () => {
  const masonry = renderer.create(<Masonry bricks={brickSet} columns={3} />).toJSON();
  // First child should the scroll view
  const scrollView = masonry.children[0];
  expect(scrollView.type).toBe('RCTScrollView');

  // Crucial styles for the grid to work
  expect(scrollView.props.contentContainerStyle).toEqual({
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%'
  });
});

test('SNAPSHOT: All functionality should match prev snapshot', () => {
  const tree = renderer.create(<Masonry bricks={brickSet} columns={3} />).toJSON();
  expect(tree).toMatchSnapshot();
});
