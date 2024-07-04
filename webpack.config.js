import path from 'path';

export const webpackConfig = (isMinify) => {
  const paths = {
    src: path.resolve('src'),
    build: path.resolve('dist'),
  };

  const optimization = isMinify
      ? { minimize: true }
      : { minimize: false };

  return {
    entry: path.join(paths.src, 'js/app.js'),
    mode: isMinify ? 'development' : 'production',
    output: {
      path: path.join(paths.build, 'js'),
      filename: isMinify ? 'app.min.js' : 'app.js',
      publicPath: '/',
    },
    optimization: optimization,
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
          resolve: {
            fullySpecified: false,
          },
        },
      ],
    },
  };
};