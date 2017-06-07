import React, { Component } from 'react';
import { View, Image, TouchableHighlight } from 'react-native';

export default function Brick (props) {
  // Avoid margins for first element
  const image = (props.onPress) ? _getTouchableUnit(props, props.gutter) : _getImageTag(props, props.gutter);
  const footer = (props.renderFooter) ? props.renderFooter(props.data) : null;
  const header = (props.renderHeader) ? props.renderHeader(props.data) : null;

  return (
    <View key={props.brickKey}>
      {header}
      {image}
      {footer}
    </View>
  );
}

// _getImageTag :: Image, Gutter -> ImageTag
export function _getImageTag (image, gutter = 0) {
  return (
      <Image
        key={image.uri}
        source={{ uri: image.uri }}
        resizeMethod='auto'
        style={{ width: image.width, height: image.height, marginTop: gutter }} />
  );
}

// _getTouchableUnit :: Image, Number -> TouchableTag
export function _getTouchableUnit (image, gutter = 0) {
  return (
      <TouchableHighlight
         key={image.uri}
         onPress={() => image.onPress(image.data)}>
            { _getImageTag(image, gutter) }
      </TouchableHighlight>
  );
}
