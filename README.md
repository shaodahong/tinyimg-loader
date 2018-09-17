## tinyimg-loader

Use [tinypng.com](https://tinypng.com) upload/download achieve compress images

### Feature

- [X] Mini size
- [X] Cache

### Usage

```js
{
  test: /\.(png|jpg|gif)$/i,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'img/[name].[ext]',
        publicPath: '/'
      }
    },
    'tinyimg-loader'
  ]
}
```
