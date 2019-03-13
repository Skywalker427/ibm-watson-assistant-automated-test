/* eslint-env node, mocha */

const chai = require('chai')
const dotenv = require('dotenv')
const AssistantV1 = require('watson-developer-cloud/assistant/v1')
const winston = require('winston')
const csvtoJsonSync = require('csvtojsonsync')

const expect = chai.expect
winston.level = 'debug'
dotenv.config()

const ASSISTANT_WORKSPACEID = process.env.ASSISTANT_WORKSPACEID
const ASSISTANT_USERNAME = process.env.ASSISTANT_USERNAME
const ASSISTANT_PASSWORD = process.env.ASSISTANT_PASSWORD
const ASSISTANT_URL = process.env.ASSISTANT_URL
const ASSISTANT_VERSION = process.env.ASSISTANT_VERSION

let assistant
const minConfidence = 0.5

// Open Watson Assistant service
before(function (done) {
  assistant = new AssistantV1({
    username: ASSISTANT_USERNAME,
    password: ASSISTANT_PASSWORD,
    url: ASSISTANT_URL,
    version: ASSISTANT_VERSION
  })
  done()
})

let csvData = csvtoJsonSync('./CSVs/mobileData.csv', ',')

describe('Validating intent data from CSV file..../', function () {
  let flow = false
  let context = null
  let tests = csvData

  tests.forEach(function (test) {
    it('should return the following' + ' #' + test.expected_intent, function (
      done
    ) {
      this.timeout(5000)

      let intent
      let entityType
      let entityValue

      assistant.message({
        workspace_id: ASSISTANT_WORKSPACEID,
        input: {
          text: test.question
        },
        context: context
      },
      function (err, response) {
        if (err) winston.error('error:', err)
        if (flow) context = response.context

        intent = response.intents[0].intent
        const confidence = response.intents[0].confidence

        expect(intent).to.be.equal(test.expected_intent)
        expect(confidence).to.be.least(minConfidence)

        // tbd deep equal
        if (test.expected_entity_type) {
          entityType = response.entities[0].entity
          expect(entityType).to.be.equal(test.expected_entity_type)
        }

        if (test.expected_entity_value) {
          entityValue = response.entities[0].value
          expect(entityValue).to.be.equal(test.expected_entity_value)
        }

        if (flow) winston.info('answer: ' + response.output.text)
        else {
          winston.info(
            'intent: ',
            intent,
            ' confidence: ',
            parseFloat(confidence).toFixed(2)
          )
        }
        done()
      }
      )
    })
  })
})
