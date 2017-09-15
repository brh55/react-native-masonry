import { Text, View, TouchableHighlight } from 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import Masonry, {
  _insertIntoColumn,
  assignObjectColumn,
  assignObjectIndex,
} from '../components/Masonry';
import renderer from 'react-test-renderer';

import {
  brickSet,
  minimumBricks,
} from './mocks/masonryMock';


test('Render masonry correct', () => {
  const masonry = renderer.create(<Masonry bricks={brickSet} columns={3} />).toJSON();
  // First child should the scroll view
  const scrollView = masonry.children[0];
  expect(scrollView.type).toBe('RCTScrollView');

  // Crucial styles for the grid to work
  expect(scrollView.props.contentContainerStyle).toEqual({
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%'
  });
});

test('SNAPSHOT: All functionality should match prev snapshot', () => {
  const tree = renderer.create(<Masonry bricks={brickSet} columns={3} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('PRIVATE FUNC: _insertIntoColumn sorts bricks according to index of bricks array and columns', () => {
  const nColumns = 2;
  const assignedBricks = minimumBricks
  .map((brick, index) => assignObjectColumn(nColumns, index, brick))
  .map((brick, index) => assignObjectIndex(index, brick));

  const expectedData = [
    [assignedBricks[0], assignedBricks[2]], //column 0
    [assignedBricks[1], assignedBricks[3]] //column 1
  ];

  //when
  let expectedSorted = [];
  assignedBricks.forEach((brick) => {
    expectedSorted = _insertIntoColumn(brick, expectedSorted, true);
  });

  //then
  expect(expectedSorted).toEqual(expectedData);
});
