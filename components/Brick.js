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
export function _getImageTag (props, gutter = 0) {
  const imageProps = {
    key: props.uri,
    source: {
      uri: props.uri
    },
    resizeMethod: 'auto',
    style: {
       ...props.imageContainerStyle,

       width: props.width,
       height: props.height,
       marginTop: gutter,
    }
  };

  if (props.customImageComponent) {
    const CustomRender = props.customImageComponent;
    return (
      <CustomRender
        {...props.customImageProps}
        {...imageProps} />
    )
  } else {
    return (
      <Image
        {...imageProps} />
      );
  }
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
