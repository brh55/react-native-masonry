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
  // gutter 3
  expect(_resizeByColumns({ height: 100, width: 400}, {width: 300, height: 300}, 3)).toEqual({gutter: 3, height: 24.625, width: 98.5});
  expect(_resizeByColumns({ height: 100, width: 400}, {width: 400, height: 300}, 2)).toEqual({gutter: 4, height: 49.5, width: 198});
  expect(_resizeByColumns({ height: 100, width: 400}, {width: 700, height: 300}, 4)).toEqual({gutter: 7, height:  42.875, width: 171.5});
});

test('PRIVATE FUNC: Render bricks properly', () => {
  const bricks = _renderBricks(mock);
  expect(bricks.length).toBe(2);
  expect(bricks[1]).toEqual(
  	<Image key='http://test2.jpg' source={{ uri: 'http://test2.jpg' }} resizeMethod="auto" style={{ width: 100, height: 200, marginTop: 4 }} />
  );
  // Should be a touchable highlight instead, first brick has no margin top
  expect(JSON.stringify(bricks[0])).toEqual(JSON.stringify(_getTouchableUnit(mock[0], 0)));
});

test('PRIVATE FUNC: Renders image tag', () => {
  const imageTag = _getImageTag(mock[0], 9);
  expect(imageTag).toEqual(
      <Image key='http://test1.jpg' source={{ uri: 'http://test1.jpg' }} resizeMethod="auto" style={{ width: 100, height: 200, marginTop: 9 }} />);
});


test('PRIVATE FUNC: Renders touchable tag properly', () => {
  const imageTag = _getTouchableUnit(mock[0], 9);
  expect(JSON.stringify(imageTag)).toEqual(JSON.stringify(
      <TouchableHighlight
         key={mock[0].uri}
         onPress={() => mock[0].onPress(mock[0])}>
      { _getImageTag(mock[0], 9) }
    </TouchableHighlight>));
});
