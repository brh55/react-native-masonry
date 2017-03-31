# react-native-masonry [![Travis](https://img.shields.io/travis/brh55/react-native-masonry.svg?style=flat-square)](https://travis-ci.org/brh55/react-native-masonry)
> A react-native component to render a masonry layout for local or remote images

![screen-shot-2017-03-31-at-11-3](https://cloud.githubusercontent.com/assets/6020066/24564115/a48c07a0-1605-11e7-964d-2293a4b72ee6.png)

## Usage
Currently `react-native-masonry` only supports images, and is still being developed. But to get started using it with images, pass in an array of objects that contain a `uri` property set to the location of the image.

```js
import { Masonry } from 'react-native-masonry';

//...omit
  render () {
    return (
      <Masonry
        data=[
        	{ uri: 'http://image1.jpg' },
        	{ uri: 'http://image2.jpg' },
        	{ uri: 'http://image3.jpg' }
        ]
      />
    )
   )
```

## Roadmap
- [ ] Support click handlers
- [ ] Support # columns
- [ ] Accept input of row rendering
- [ ] Handle fail image loading issues gracefully (http/not real urls)
- [ ] Create a demo

## Contribute
I'm still very much new to `react`, and `react-native`, and this project is still in the works. So PR's are very much welcomed, just abide by the contribution.json`

## License
MIT © [Brandon Him](https://github.com/brh55/react-native-masonry)
