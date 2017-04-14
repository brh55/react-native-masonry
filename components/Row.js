import React from 'react';
import { Dimensions, View, Image } from 'react-native';
import styles from '../styles/main';

const Row = (props) => {
  const data = props.data;
  // Resize based on columns
  const images = Object.keys(data).map((key) => {
	   const { width, height, gutter } = __resizeByColumns(data[key].dimensions, props.columns);
	   return { uri: data[key].uri, width, height, gutter };
  });

  return (
    <View style={styles.masonry__column}>
      {__renderImages(images)}
    </View>
  )
}

export function __resizeByColumns (imgDimensions, nColumns=2) {
    const { height, width } = Dimensions.get('window');

    const gutterBase = width / 100; // 1% = X px
    const gutterSize = gutterBase * 1;

    const columnWidths = (width/ nColumns) - gutterSize;
    const divider = imgDimensions.width / columnWidths;

    const newWidth = imgDimensions.width / divider;
    const newHeight = imgDimensions.height / divider;

    return { width: newWidth, height: newHeight, gutter: gutterSize };
}

export function __renderImages (images) {
    return images.map((image, index) => {
    // Avoid margins for first element
    const gutter = (index === 0) ? 0 : image.gutter;
    return (
    	<Image
    	  key={image.uri}
    	  source={{ uri: image.uri }}
    	  resizeMethod='auto'
    	  style={{ width: image.width, height: image.height, marginTop: gutter }} />
    );
  });
}

export default Row;
