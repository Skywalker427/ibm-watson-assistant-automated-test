console.time('start')
const csv = require('csvtojson/v2')
let content = []
csv()
  .fromFile('../CSVs/mobileData.csv')
  .then((jsonObj) => {
    console.table(jsonObj)
    console.log(jsonObj)
  }).catch()

console.log(content)
console.timeEnd('start')
// exports.read = read
