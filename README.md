# json-model-assign
Pure function for emitting factories for building models from JSON defaults, reusing the Object.assign signature and including derived non-null type validation.

# Install
```
npm install --save json-model-assign
```

or

```
yarn add json-model-assign
```

# Use Case
Predefining shared models (as factories) for use in both an API backend and consuming web client.

```
// MyModel.js
const json = '{ "id": 0, "title": "" }' // can also be an object
module.exports = require('json-model-assign')(json)
```

# Another Use Case
Preparing a model for transport.

```
const modelFactory = require('MyModel')
// ... form UI ...
// model for HTTP JSON POST
const model = modelFactory({ id: formResultsId, title: formResultsTitle });
```

# Another Use Case
Consuming an incoming event in an AWS Lambda.

```
const modelFactory = require('MyModel')

exports.handler = (event, context, callback) => {
  const model = modelFactory(event) // expected model with updates applied
}
