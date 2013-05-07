var byline = require('byline')

module.exports = function (next) {
  var stream = byline.createStream()

  var i = 0
    , result = {}
  stream.on('data', function (line) {
    var parts = line.split(',')
    if (i++ === 0) {
      result.graph = {}
      result.graph.title = parts[0]
      result.graph.datasequences = new Array(parts.length - 1)

      for (var j = 1; j < parts.length; j++) {
        result.graph.datasequences[j - 1] = {
          title: parts[j],
          datapoints: []
        }
      }
    } else {
      for (var j = 1; j < parts.length; j++) {
        result.graph.datasequences[j - 1].datapoints.push({
          title: parts[0],
          value: parts[j]
        })
      }
    }
  })

  stream.on('end', function () {
    next(null, result)
  })

  return stream
}
