Sample project that demonstrates how you can write regression tests for Watson Assistant

## Prerequisites

* Create an .env file in the root folder with the following content

1.  ASSISTANT_URL= Watson Assistant API URL, e.g. https://gateway-fra.watsonplatform.net/assistant/api for Germany region
2.  ASSISTANT_USERNAME= Watson Assistent - Instance Username
3.  ASSISTANT_PASSWORD= Watson Assistent - Instance Password
4.  ASSISTANT_WORKSPACEID= Watson Assistent - WorkspaceID you want to leverage
5.  ASSISTANT_VERSION = Watson Assistant - API Version to be used, e.g. 2018-02-16

* Run npm install to fetch the development dependencies

## Folder Structure

* test folder contains all the mocha test files, one file per intent
* workspace folder contains the current version of the Watson Assistant workspace, recommended as backup mechanism in general

## Execution

Run all tests or just one:

* npm test
* npm test test/<name>.js
