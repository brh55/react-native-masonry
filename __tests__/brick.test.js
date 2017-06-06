import Masonry from '../components/Masonry';
import { TouchableHighlight, Image } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import mock from './mocks/bricksMock';

import {
  _getImageTag,
  _getTouchableUnit
} from '../components/Brick';

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
