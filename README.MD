# Minimal repository to reproduce AJV oneOf incorrect validation issue

## Requirements
1. Node v14.17.3
2. NPM v8.0.0

## Quick Start
1. Install the npm package:

   `npm install`

2. Start script:

   `npm run start`

## What is going on?
AJV has [oneOf](https://ajv.js.org/json-schema.html#oneof) keyword. Validators have to validate data against all schemas to establish validity according to this keyword.

I have validation schema that has one field (field 'json') which may be one of two schemas (schema 'A' and schema 'B').
This two schemas have different fields and all of these fields are optional (not required).

```js
const schema = {
  type: 'object',
  properties: {
    json: {
      type: 'object',
      oneOf: [
        {
          title: 'A',
          type: 'object',
          properties: {
            propA: {
              type: 'number',
            }
          },
        },
        {
          title: 'B',
          type: 'object',
          properties: {
            propB: {
              type: 'number'
            }
          },
        }
      ]
    }
  },
  required: ['json']
};
```

```js
const data = {
  json: {
     propA: 123,
  },
};
```

When I'm trying to validate object with this schema where I have field 'json' with type of one of the validation schemas (schema 'A' or schema 'B') validator says `data.json should match exactly one schema in oneOf`.

You can find all tests in `index.js`. Start script with `npm run start`.

## Question
How to solve this issue?

[Link to opened issue](https://github.com/ajv-validator/ajv/issues/1794)
