import Masonry from '../components/Masonry';
import { TouchableHighlight, Image, Text } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import mock from './mocks/bricksMock';

import Brick, {
  _getImageTag,
  _getTouchableUnit
} from '../components/Brick';

test('Render Brick', () => {
    const renderedBrick = renderer.create(
      <Brick
        uri={'http://test.com/1.jpg'}
        gutter={4}
        renderHeader={() => <Text>Header</Text>}
        renderFooter={() => <Text>Footer</Text>} />
    ).toJSON();
    expect(renderedBrick.children[1].props.source.uri).toBe('http://test.com/1.jpg');
    expect(renderedBrick.children[0].children[0]).toBe('Header');
    expect(renderedBrick.children[2].children[0]).toBe('Footer');
    // expect(renderedBrick.children[0)).toBe(
});

test('PRIVATE FUNC: Renders image tag', () => {
  const imageTag = _getImageTag(mock[0], 9);
  expect(imageTag).toEqual(
    <Image
      key='http://test1.jpg'
      source={{ uri: 'http://test1.jpg' }}
      resizeMethod="auto"
      style={{ width: 100, height: 200, marginTop: 9 }} />);
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
