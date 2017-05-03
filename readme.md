# react-native-masonry [![Travis](https://img.shields.io/travis/brh55/react-native-masonry.svg?style=flat-square)](https://travis-ci.org/brh55/react-native-masonry)
> :raised_hands: A easy to use react-native component to render a masonry~ish layout for local and remote images with support for dynamic column rendering, progressive image loading, device rotation, and on-press handlers.

![v0.1.0 Demo](http://g.recordit.co/n4D5WW0Y6U.gif)

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
      bricks=[
        { uri: 'http://image1.jpg' },
        { uri: 'http://image2.jpg' },
        { uri: 'http://image3.jpg' }
      ]
    />
    ```
4. Still a bit confused? No worries, run the [example application](/tree/master/example) on your local machine to examine how to get started.
    
## Component Props

| Props   | Type                     | Description                                                                                                                                                                                                                                                                                 | Default |
|---------|--------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| bricks    | array | A list of `Object:Bricks` to be passed into the row renderer. IE:,`data=[{id: 1, uri: 'https://image.jpg', onPress: (brick) => this.redirect(brick.id)}, {id: 2, uri: 'https://hyper.jpg'}]` | N/A     |
| columns | num                      | Desired number of columns                                                                                                                                                                                                                                                                   | 2       |

### Brick Properties
"Bricks" are the basic building block of the masonry and are passed into the props.bricks. They essentially represent the items within each column. The following properties are available:

#### brick.uri | **Required**
##### Type: `String`
The uri of the image location.

IE: `uri: 'http://cats.com/cat1.jpeg'`

#### brick.onPress
##### Type: `Func (brick)`
A function handler when the brick is pressed. The function will be called with the instance of the brick, which provides it's dimensions, columns, as well as any user defined properties passed into the `bricks` prop. An image will be wrapped by a "TouchableHighlight".

IE: `onPress: (brick) => goTo(brick.id)`

## Contribute
:octocat: PR's are welcomed, just abide by rules listed within [contributing.json](http://github.com/brh55/react-native-masonry/contributing.json).

### Beginners
Not sure where to start, or a beginner? No problemo! Take a look at the [issues page](https://github.com/brh55/react-native-masonry/issues) for `low-hanging` or `beginner-friendly` labels as an easy ways to start contributing.

## License
MIT © [Brandon Him](https://github.com/brh55/react-native-masonry)
