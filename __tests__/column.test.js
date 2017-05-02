import React from 'react';
import { TouchableHighlight, Image } from 'react-native';
import renderer from 'react-test-renderer';

import {
  Column,
  _resizeByColumns,
  _renderBricks,
  _getImageTag,
  _getTouchableUnit
} from  '../components/Column';

const mock = [
  {
    uri: 'http://test1.jpg',
    height: 200,
    width: 100,
    gutter: 4,
    onPress: () => null,
  },
  {
    uri: 'http://test2.jpg',
    height: 200,
    width: 100,
    gutter: 4
  }
];

test('PRIVATE FUNC: Resize dimensions per columns', () => {
  expect(_resizeByColumns({ height: 100, width: 400}, 2)).toEqual({gutter: 7.5, height: 91.87499999999999, width: 367.49999999999994});
  expect(_resizeByColumns({ height: 100, width: 400}, 4)).toEqual({gutter: 7.5, height: 45, width: 180});
});

test('PRIVATE FUNC: Render bricks properly', () => {
  const bricks = _renderBricks(mock);
  expect(bricks.length).toBe(2);
  expect(bricks[1]).toEqual(
  	<Image key='http://test2.jpg' source={{ uri: 'http://test2.jpg' }} resizeMethod="auto" style={{ width: 100, height: 200, marginTop: 4 }} />
  );
  // Should be a touchable highlight instead
  expect(bricks[0]).not.toEqual(
       <Image key='http://test1.jpg' source={{ uri: 'http://test1.jpg' }} resizeMethod="auto" style={{ width: 100, height: 200, marginTop: 4 }} />
  );
});
