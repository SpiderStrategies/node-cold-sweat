var byline = require('byline')

module.exports = function (next) {
  var stream = byline.createStream()

  var i = 0
    , result = {}
  stream.on('data', function (line) {
    var parts = line.split(',')
    if (i++ === 0) {
      // Header row is the first row, so initialize the graph
      result.graph = {}
      result.graph.title = parts[0]
      result.graph.datasequences = new Array(parts.length - 1)

      for (var j = 1; j < parts.length; j++) {
        result.graph.datasequences[j - 1] = { title: parts[j], datapoints: [] }
      }
    } else {
      result.graph.datasequences.forEach(function (dataset, i) {
        dataset.datapoints.push({
          title: parts[0],
          value: i + 1 < parts.length ? parts[i + 1] : null
        })
      })
    }
  })

  stream.on('end', function () {
    next(null, result)
  })

  return stream
}
