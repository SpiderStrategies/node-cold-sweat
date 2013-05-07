node-cold-sweat
===============

Massage csv data into a specific json format

Pipe a stream of csv, and this returns a JSON object holding the properties. The returned object looks like this:

```
{
  graph: {
    title:
    datasequences: [ {
        title: <csv row 1, column n + 1>
        datapoints: [ {
            title:
            value:
          }, ...
        ]
      }
      ...
    ]
  }
}
```


Example

```
var sweat = require('cold-sweat')
  , fs = require('fs')

fs.createReadStream('./data.csv').pipe(sweat(function (err, result) {
  console.log(JSON.stringify(result))

})
```
