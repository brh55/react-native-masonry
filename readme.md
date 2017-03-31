# react-native-masonry [![Travis](https://img.shields.io/travis/brh55/react-native-masonry.svg?style=flat-square)](https://travis-ci.org/brh55/react-native-masonry)
> A react-native component to render a masonry layout for images (currently)

![screen-shot-2017-03-31-at-11-3](https://cloud.githubusercontent.com/assets/6020066/24564115/a48c07a0-1605-11e7-964d-2293a4b72ee6.png)

## Usage
```js
import { Masonry } from 'react-native-masonry';

//..omit
	render(
		<Masonry
			data=['http://image1.jpg', 'http://image2.jpg', 'http://image3.jpg']
		/>
	)
```

## Roadmap
- [] Support click handlers
- [] Support # columns
- [] Accept input of row rendering
- [] Handle fail image loading issues gracefully (http/not real urls)
- [] Create a demo

## License
MIT © [Brandon Him](https://github.com/brh55/react-native-masonry)
