const path = require('path');

var rules = [
  {
    test: /\.css$/i,
    use: [{ loader: "style-loader" }, { loader: "css-loader" }],
    exclude: [/katex\.css$/i]
  },
  {
    test: /katex\.css$/i,
    use: [{ loader: "css-loader" }],
  },
  {
    test: /\.scss$/,
    use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }]
  },
  {
    test: /\.(jpg|png|gif)$/,
    use: { loader: "file-loader" }
  },
  {
    test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 10000,
        mimetype: 'application/font-woff',
        name: './css/fonts/[name].[ext]',
      }
    },
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 10000,
        mimetype: 'application/octet-stream',
        name: "./css/fonts/[name].[ext]",
      }
    }
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    use: {
      loader: "file-loader"
    }
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    use: {
      loader: "url-loader",
      options: {
        limit: 10000,
        mimetype: "image/svg+xml",
        name: './css/fonts/[name].[ext]',
      }
    }
  }
];

module.exports = [
  // Notebook extension
  {
    "entry": './lib/jupyterlab-plugin.js',
    "output": {
      filename: 'jupyterlab-plugin.js',
      path: path.resolve(__dirname, '../beakerx_tabledisplay/beakerx_tabledisplay/static'),
      libraryTarget: 'amd',
    },
    devtool: 'inline-source-map',
    externals: ['@jupyter-widget/base'],
    mode: 'development'
  }
];
