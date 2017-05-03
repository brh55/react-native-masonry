import Masonry from '../components/Masonry';
import { Text, View } from 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const brickSet = [
  {
    id: 1,
    uri: 'https://cat1.jpg'
  },
  {
    id: 2,
    routeId: 'cat-3',
    uri: 'http://test.com/cat3.jpg',
    onPress: (brick) => redirect(brick.routeId)
  },
  {
    id: 3,
    uri: 'http://test.com/cat2.jpg'
  },
  {
    id: 4,
    uri: 'http://test.com/cat3.jpg'
  }
];

test('MAIN: Render masonry correct', () => {
 const masonry = renderer.create(
  <Masonry
    bricks={brickSet}
   columns={3} />).toJSON();
  // First child should the scroll view
  const scrollView = masonry.children[0];
  expect(scrollView.type).toBe('RCTScrollView');

  // Crucial styles for the grid to work
  expect(scrollView.props.contentContainerStyle).toEqual(
    {
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'row',
      width: '100%'
    });
});

// Ignore for now, until we can resolve jest issues
// test('SNAPSHOT: All functionality should match prev snapshot', () => {
//   const tree = renderer.create(
//       <Masonry
//     bricks={brickSet}
//     columns={3} />
//   ).toJSON();
//   expect(tree).toMatchSnapshot();
// });
