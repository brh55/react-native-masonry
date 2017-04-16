import React from 'react';
import { Dimensions, View, Image, TouchableHighlight } from 'react-native';
import styles from '../styles/main';

// Takes props and returns a masonry column
const Row = (props) => {
  const data = props.data;
  // Resize based on columns
  const images = Object.keys(data).map((key) => {
    const image = data[key];
    const column = __resizeByColumns(data[key].dimensions, props.columns);
    // Return a image object that width will be equivilent to
    // the column dimension, while retaining original image properties
    return {
      ...image,
      ...column
    };
  });

  return (
    <View style={styles.masonry__column}>
      {__renderBricks(images)}
    </View>
  )
}

// A, B -> A
export function __resizeByColumns (imgDimensions, nColumns=2) {
  const { height, width } = Dimensions.get('window');

  const gutterBase = width / 100; // 1% = X px
  const gutterSize = gutterBase * 1;

  const columnWidths = (width / nColumns) - gutterSize;
  const divider = imgDimensions.width / columnWidths;

  const newWidth = imgDimensions.width / divider;
  const newHeight = imgDimensions.height / divider;

  return { width: newWidth, height: newHeight, gutter: gutterSize };
}

// Renders the bricks within the columns
// A -> B
export function __renderBricks (images) {
  return images.map((image, index) => {
    // Avoid margins for first element
    const gutter = (index === 0) ? 0 : image.gutter;
    const brick = (image.onPress) ? __getTouchableUnit(image, gutter) : __getImageTag(image, gutter);
    return brick;
  });
}           

// A -> B
export function __getImageTag (image, gutter) {
  return (
      <Image
        key={image.uri}
        source={{ uri: image.uri }}
        resizeMethod='auto'
        style={{ width: image.width, height: image.height, marginTop: gutter }} />
  )
}

// A -> B
export function __getTouchableUnit (image, gutter) {
  return (
      <TouchableHighlight
        onPress={image.onPress}>
      { __getImageTag(image, gutter) }
      </TouchableHighlight>
  )
}

export default Row;
