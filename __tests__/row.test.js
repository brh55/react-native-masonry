import React from 'react';
import { Image } from 'react-native';

import {
	Row,
	 __resizeByColumns,
	__renderImages
} from  '../components/Row';


test('Resize dimensions per columns', () => {
  expect(__resizeByColumns({ height: 100, width: 400}, 2)).toEqual({gutter: 15, height: 90, width: 360});
  expect(__resizeByColumns({ height: 100, width: 400}, 4)).toEqual({gutter: 15, height: 43.125, width: 172.5});
});

test('Render image components', () => {
  const mock = [
  	{
  		uri: 'http://test1.jpg',
  		height: 200,
  		width: 100,
  		gutter: 4
  	},
  	{
  	  	uri: 'http://test2.jpg',
  		height: 200,
  		width: 100,
  		gutter: 4
  	}
  ];

  expect(__renderImages(mock).length).toBe(2);
  expect(__renderImages(mock)[0]).toEqual(
  	<Image key='http://test1.jpg' source={{ uri: 'http://test1.jpg' }} resizeMethod="auto" style={{ width: 100, height: 200, marginTop: 0 }} />
  )
  expect(__renderImages(mock)[1]).toEqual(
  	<Image key='http://test2.jpg' source={{ uri: 'http://test2.jpg' }} resizeMethod="auto" style={{ width: 100, height: 200, marginTop: 4 }} />
  )
});
