var sweat = require('./index')
  , assert = require('assert')
  , fs = require('fs')

fs.createReadStream('./data/npm-request.csv').pipe(sweat(function (err, result) {
  assert(!err)
  assert.equal(result.graph.title, 'request')
  assert.equal(result.graph.datasequences.length, 1)

  var downloads = result.graph.datasequences[0]

  assert.equal(downloads.title, 'downloads')
  assert.equal(downloads.datapoints.length, 318)

  var last = downloads.datapoints[downloads.datapoints.length - 1]

  assert.equal(last.title, '2013-05-07')
  assert.equal(last.value, 4052)
}))

fs.createReadStream('./data/commits.csv').pipe(sweat(function (err, result) {
  assert(!err)

  assert.equal(result.graph.title, 'Commits')
  assert.equal(result.graph.datasequences.length, 3)

  assert.equal(result.graph.datasequences[0].title, 'Dash')
  assert.equal(result.graph.datasequences[1].title, 'Inception')
  assert.equal(result.graph.datasequences[2].title, 'Scoreboard')

  assert.equal(result.graph.datasequences[0].datapoints.length, 3)
  assert.equal(result.graph.datasequences[0].datapoints[0].value, 15)
  assert.equal(result.graph.datasequences[0].datapoints[2].value, 30)

  assert.equal(result.graph.datasequences[2].datapoints.length, 3)
  assert.equal(result.graph.datasequences[2].datapoints[0].value, 7)
  assert.equal(result.graph.datasequences[2].datapoints[2].value, 9)
}))
