console.log(process.cwd())

const csvtoJsonSync = require('csvtojsonsync')

let csv = csvtoJsonSync('../CSVs/mobileData.csv', ',') // default 2nd parameter ";"

console.log(csv) // [{...}]
