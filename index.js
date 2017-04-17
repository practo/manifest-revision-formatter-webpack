module.exports = manifestFormatter;

function manifestFormatter(data, parsedAssets) {
  var manifest;

  var normalizeChunks = function () {
    var output = {};
    var chunk;
    var chunkValue;

    for (chunk in data.assetsByChunkName) {
      chunkValue = data.assetsByChunkName[chunk];

      if (typeof chunkValue === 'string') {
        output[chunk] = [chunkValue];
      }
      else {
        chunkValue = chunkValue.filter(function(item) {
          return item.indexOf('hot-update.js') === -1;
        });
        output[chunk] = chunkValue;
      }
    }

    return output;
  };

  var mergeChunksIntoAssets = function () {
    var output = {};
    var asset, chunk, fileExtension, fileName, chunkWithExtension;
    var assetsByChunkName = normalizeChunks();

    output.assets = parsedAssets;

    for (chunk in assetsByChunkName) {
      for (asset in assetsByChunkName[chunk]) {
        asset = assetsByChunkName[chunk][asset];
        fileExtension = asset.split('.').slice(-1)[0];
        fileName = asset.split('.')[0];
        chunkWithExtension = fileName + '.' + fileExtension;

        if(chunkWithExtension.indexOf('map') < 0)
          output.assets[chunkWithExtension] = asset;
      }
    }

    return output;
  };

  manifest = mergeChunksIntoAssets();
  manifest.publicPath = data.publicPath;

  return manifest;
}
