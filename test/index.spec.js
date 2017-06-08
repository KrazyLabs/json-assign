const jsonAssign = require('../index.js')
const expect = require('chai').expect
const TEST_JSON = `{ "id": 1 }`

describe('model', function() {
  it('should provide the default value when no new values are supplied', () => {
    let model = jsonAssign(TEST_JSON)()
    expect(model.id).to.equal(1)
  })

  it('should allow passing an anoymous object as json', () => {
    let model = jsonAssign(JSON.parse(TEST_JSON))()
    expect(model.id).to.equal(1)
  })

  it('should assign the last value over the first values', () => {
    let model = jsonAssign(TEST_JSON)({ id: 2 }, { id: 3 })
    expect(model.id).to.equal(3)
  })

  it('should not return properties that are not in the JSON model', () => {
    let model = jsonAssign(TEST_JSON)({ id: 2 }, { foo: 3 })
    expect(model.foo).to.be.undefined
  })

  describe('strict mode', function() {
    it('should not let a string be assigned to a number', () => {
      const test = () => jsonAssign(TEST_JSON, true)({ id: '2' })
      expect(test).to.throw(/.*/)
    })
  })
})
