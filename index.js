const Ajv = require("ajv");
const ajv = new Ajv({allErrors: true});

function test(data) {
  const valid = validate(data)
  if (valid) console.log("Valid!\n")
  else console.log(`Invalid: ${ajv.errorsText(validate.errors)}\n`)
}

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
          }
        },
        {
          title: 'B',
          type: 'object',
          properties: {
            propB: {
              type: 'number'
            }
          }
        }
      ]
    }
  }
};

const validate = ajv.compile(schema)

const data = {
  json: {},
};

data.json.propA = 123;
console.log(`1: Should be VALID (because it fits object 'A') but it is INVALID => INCORRECT VALIDATION`);
test(data);

data.json.propA = '123';

console.log(`2: Should be INVALID (because of 'propA' must be number) but it's VALID => INCORRECT VALIDATION`);
test(data);

delete data.json.propA;
data.json.propB = 123;

console.log(`3: Should be VALID (because it fits object 'B') but it is INVALID => INCORRECT VALIDATION`);
test(data);

data.json.propB = '123';

console.log(`4: Should be INVALID (because of 'propA' must be number) but it's VALID => INCORRECT VALIDATION`);
test(data);

schema.properties.json.oneOf[0].required = ['propA'];
delete data.json.propB;

console.log(`5: Should be VALID (because it fits object 'B' -> 'propB' optional) but it is INVALID => INCORRECT VALIDATION`);
test(data);

console.log(`6: Should be VALID (because it fits object 'A' -> 'propA' number) but it is INVALID => INCORRECT VALIDATION`);
data.json.propA = 123;
test(data);

console.log(`7: Should be INVALID (because it doesn't fit object 'A' -> 'propA' must be number) but it's VALID => INCORRECT VALIDATION`);
data.json.propA = '123';
test(data);

delete data.json.propA;

console.log(`9: Should be VALID (because it fits object 'B' -> 'propB' number) but it's INVALID => INCORRECT VALIDATION`);
data.json.propB = 123;
test(data);

console.log(`10: Should be INVALID (because it doesn't fit object 'B' -> 'propB' must be number) but it's VALID => INCORRECT VALIDATION`);
data.json.propB = '123';
test(data);

delete schema.properties.json.oneOf[0].required;
schema.properties.json.oneOf[1].required = ['propB'];
console.log(`11: Should be VALID (because it fits object 'A' -> 'propA' optional) and it's VALID => CORRECT VALIDATION`);
test(data);

console.log(`12: Should be VALID (because it fits object 'A' -> 'propA' number) and it's VALID => CORRECT VALIDATION`);
data.json.propA = 123;
test(data);

console.log(`13: Should be INVALID (because it doesn't fit object 'B' -> 'propB' must be number) and it's INVALID => CORRECT VALIDATION`);
data.json.propA = '123';
test(data);

delete data.json.propA;

console.log(`14: Should be VALID (because it fits object 'B' -> 'propB' number) but it's INVALID => INCORRECT VALIDATION`);
data.json.propB = 123;
test(data);

console.log(`15: Should be INVALID (because it doesn't fit object 'B' -> 'propB' must be number) but it's VALID => INCORRECT VALIDATION`);
data.json.propB = '123';
test(data);
