# react-native-masonry   [![Travis](https://img.shields.io/travis/brh55/react-native-masonry/master.svg?style=flat-square)](https://travis-ci.org/brh55/react-native-masonry) [![David](https://img.shields.io/david/dev/brh55/react-native-masonry.svg?style=flat-square)](https://david-dm.org/brh55/react-native-masonry?type=dev) [![npm](https://img.shields.io/npm/dt/react-native-masonry.svg?style=flat-square)](https://www.npmjs.com/package/react-native-masonry)
> :raised_hands: A easy to use react-native component to render a masonry~ish layout for local and remote images with support for dynamic column rendering, progressive image loading, device rotation, on-press handlers, and headers/captions.

![v0.1.0 Demo](http://g.recordit.co/SLAvTzf9HY.gif)

## Usage
1. Install the repository
    ```bash
    $ npm install --save react-native-masonry
    ```
2. Add an import to the top of your file
    ```js
    import Masonry from 'react-native-masonry';
    ```
3. At a minimal, declare the component in the render method prividing data for bricks
    ```js
    <Masonry
      sorted // optional - Default: false
      columns=4 // optional - Default: 2
      bricks=[
        { uri: 'http://image1.jpg' },
        { uri: 'http://image2.jpg' },
        { uri: 'http://image3.jpg' }
      ]
    />
    ```
4. Still a bit confused :confounded:, or want to see it in action? No worries, run the [example application](example) on your local machine to examine how to get started or try it out on [Expo.io](https://expo.io/@community/masonry-example).

## Component Props

| Props   | Type                     | Description                                                                                                                                                                                                                                                                                 | Default |
|---------|--------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| bricks    | array | A list of `Object:Bricks` to be passed into the row renderer. I.E:,`bricks=[{id: 1, uri: 'https://image.jpg', onPress: (brick) => this.redirect(brick.id)}, {id: 2, uri: 'https://hyper.jpg'}]` | []     |
| columns | num | Desired number of columns | 2 |
| sorted | bool | Whether to sort `bricks` according to their index position or allow bricks to fill in as soon as the `uri` is ready. | false |

### Brick Properties
"Bricks" are the basic building block of the masonry and are passed into the props.bricks. They essentially represent the items within each column and require a `uri` property at a minimum. However, you can freely add additional properties to the `data` property if you need access to certain data within your `brick.onPress` handler and `footer/header` renderer. The following properties are available:

#### brick.uri | **Required**
##### Type: `String`
The uri of the image location.

*e.g.:* `uri: 'http://cats.com/cat1.jpeg'`

#### brick.onPress
##### Type: `Func (brick.data)`
A function handler when the brick is pressed. The function will be called with the instance of the brick, which provides it's dimensions, columns, as well as any user defined properties passed into the `bricks` prop. An image will be wrapped by a [`<TouchableHighlight>`](https://facebook.github.io/react-native/docs/touchablehighlight.html).

*e.g.:* `onPress: (data) => goTo(data.id)`

#### brick.renderHeader
##### Type: `Func (brick.data) -> React Component`
A function that is executed **ABOVE** the brick image, this function must return a React Component. `renderHeader()` is passed `brick.data` to allow dynamic content rendering of components.

###### e.g.: Brick with renderHeader
```
{
  // User defined data
  data: {
    user: {
        name: 'Henry',
        profilePic: 'https://user.jpeg'
    }
  }
  uri: 'https://example.com/mainImage.jpeg',
  renderHeader: (data) => {
    return (
      <View>
          <Image source={{ uri: data.user.profilePic }} style={{ width: 50, height: 50}}>
          <Text>{data.user.name}</Text>
      </View>
    );
  }
}
```

#### brick.renderFooter
##### Type: `Func (brick.data) -> React Component`
A function that is executed **BELOW** the brick image `renderFooter()` is passed `brick.data` to allow dynamic content rendering of components.

###### e.g.: Brick with renderFooter
```
{
  data: {
    caption: 'Summer Recipies'
  },
  uri: 'https://example.com/mainImage.jpeg',
  renderFooter: (data) => {
    return (
        <View>
            <Text>{data.caption}</Text>
        </View>
    );
  }
}
```

## Contribute
### 👷🏽👷🏻‍♀️🐕<br>
Pull requests are welcomed, just abide by rules listed within [contributing.json](contributing.json).

### Beginners
Not sure where to start, or a beginner? Take a look at the [issues page](https://github.com/brh55/react-native-masonry/issues) for `low-hanging` or `beginner-friendly` labels as an easy ways to start contributing.

## Maintainers
- [Brandon Him](https://github.com/brh55)
- [Kevin McGill](https://github.com/kmcgill88)

## License
MIT © [Brandon Him](https://github.com/brh55/react-native-masonry)
