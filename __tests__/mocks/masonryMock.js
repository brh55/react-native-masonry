
export const minimumBricks = [
  {
    uri: 'https://cat1.jpg',
  },
  {
    uri: 'https://cat2.jpg',
  },
  {
    uri: 'https://cat3.jpg',
  },
  {
    uri: 'https://cat4.jpg',
  },
];

export const brickSet = [
  {
    uri: 'https://cat1.jpg',
    data: {
      id: 1
    }
  },
  {
    data: {
      routeId: 'cat-3',
      id: 2,
    },
    uri: 'http://test.com/cat3.jpg',
    onPress: (brick) => redirect(brick.routeId)
  },
  {
    data: {
      id: 3
    },
    uri: 'http://test.com/cat2.jpg'
  },
  {
    uri: 'http://test.com/cat3.jpg'
  }
];
