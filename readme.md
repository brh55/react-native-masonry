# react-native-masonry [![Travis](https://img.shields.io/travis/brh55/react-native-masonry.svg?style=flat-square)](https://travis-ci.org/brh55/react-native-masonry)
> A react-native component to render a masonry layout for local or remote images. Currently in the stages of development.

![screen-shot-2017-03-31-at-11-3](https://cloud.githubusercontent.com/assets/6020066/24564115/a48c07a0-1605-11e7-964d-2293a4b72ee6.png)

## Usage
1. Install the repository
    ```bash
    $ npm install --save react-native-masonry
    ```
2. Add an import to the top of your file
    ```js
    import Masonry from 'react-native-masonry';
    ```
3. Declare the component in the render method of your component
    ```js
    <Masonry
      data=[
        { uri: 'http://image1.jpg' },
        { uri: 'http://image2.jpg' },
        { uri: 'http://image3.jpg' }
      ]
    />
    ```

## Roadmap
- [ ] Support click handlers
- [ ] Support # columns
- [ ] Accept input of row rendering
- [ ] Handle fail image loading issues gracefully (improper urls)
- [ ] Create a demo

## Contribute
I'm still new to `react`, and `react-native`, and this project is  in the works. So PR's are welcomed, just abide by rules listed within [contributing.json](http://github.com/brh55/contributing.json).

## License
MIT © [Brandon Him](https://github.com/brh55/react-native-masonry)
