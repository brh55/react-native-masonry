import React from 'react';
import { TouchableHighlight, Image, Text } from 'react-native';
import renderer from 'react-test-renderer';

import Column from  '../components/Column';

import mock from './mocks/bricksMock';

// test('PRIVATE FUNC: Render bricks properly', () => {
//   const bricks = Column._renderBricks(mock);
//   expect(bricks.length).toBe(2);
//   expect(bricks[1]).toEqual(
//   	<Image key='http://test2.jpg' source={{ uri: 'http://test2.jpg' }} resizeMethod="auto" style={{ width: 100, height: 200, marginTop: 4 }} />
//   );
//   // Should be a touchable highlight instead, first brick has no margin top
//   expect(JSON.stringify(bricks[0])).toEqual(JSON.stringify(_getTouchableUnit(mock[0], 0)));
// });
//
// test('PRIVATE FUNC: Resize dimensions per columns', () => {
//   // gutter 3
//   expect(Column._resizeByColumns({ height: 100, width: 400}, {width: 300, height: 300}, 3)).toEqual({gutter: 3, height: 24.625, width: 98.5});
//   expect(Column._resizeByColumns({ height: 100, width: 400}, {width: 400, height: 300}, 2)).toEqual({gutter: 4, height: 49.5, width: 198});
//   expect(Column._resizeByColumns({ height: 100, width: 400}, {width: 700, height: 300}, 4)).toEqual({gutter: 7, height:  42.875, width: 171.5});
// });
