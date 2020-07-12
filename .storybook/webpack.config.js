const path = require("path");
const { lstatSync, readdirSync } = require("fs");

const basePath = path.resolve(__dirname, "../", "packages");
const packages = readdirSync(basePath).filter((name) =>
    lstatSync(path.join(basePath, name)).isDirectory()
);

module.exports = ({ config }) => {

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('awesome-typescript-loader'),
    options: {
      configFileName: path.join(__dirname, '../tsconfig.storybook.json'),
    },
  });

  config.resolve.extensions.push('.ts', '.tsx');
  
  Object.assign(config.resolve.alias, {
    ...packages.reduce(
      (acc, name) => ({
        ...acc,
        [`@opr-finance/${name}`]: path.join(basePath, name, 'src'),
      }),
      {},
    ),
  });

  return config

};
