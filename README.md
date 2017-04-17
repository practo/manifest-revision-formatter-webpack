# Manifest revision formatter for [this plugin](https://github.com/nickjj/manifest-revision-webpack-plugin)
Override the default formatter available in the plugin to output asset keys with their `paths` intact

# Usage
```
const manifestFormatter = require('@practo/manifest-revision-formatter-webpack');
...
...
...
new ManifestRevisionPlugin(resolve(__dirname, 'build', 'manifest.json'), {
  rootAssetPath: './path-to-assets',
  ignorePaths: ['/ignore-assets-in-this-path'],
  format: manifestFormatter
})
...
...
```
