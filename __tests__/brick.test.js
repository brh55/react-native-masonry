import Masonry from '../components/Masonry';
import { TouchableHighlight, Image, Text, View } from 'react-native';
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
  const imageTree = renderer.create(imageTag).toJSON();
  expect(imageTree.type).toEqual('Image');
  expect(imageTree.props.source.uri).toEqual('http://test1.jpg');
});

test('PRIVATE FUNC: Renders touchable tag properly', () => {
  const imageTag = _getTouchableUnit(mock[0], 9);
  expect(JSON.stringify(imageTag)).toEqual(JSON.stringify(
      <TouchableHighlight
         key={mock[0].uri}
         onPress={() => mock[0].onPress(mock[0])}>
      <View>
        { _getImageTag(mock[0], 9) }
     </View>
    </TouchableHighlight>));
});
