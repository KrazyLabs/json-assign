module.exports = (json, strict) =>
  function factory() {
    let typedef
    try {
      if (typeof json === 'string') {
        typedef = JSON.parse(json)
      } else if (typeof json !== 'object') {
        throw new Error(
          'Supplied argument "json" can only be a string or an object'
        )
      }
    } catch (parseError) {
      throw parseError
    }

    const join = Object.assign({}, typedef /*, ...arguments*/)
    const model = {}

    // backwards support for AWS Nodejs 4.3
    for (var i = 0; i < arguments.length; i++) {
      Object.assign(join, arguments[i])
    }

    for (var key in join) {
      if (typedef.hasOwnProperty(key)) {
        let definedType = typeof typedef[key]
        let assignedType = typeof join[key]
        if (strict && definedType !== assignedType) {
          throw new Error(
            'Cannot assign new type ' +
              assignedType +
              ' over expected type ' +
              definedType +
              ' for ' +
              key
          )
        }
        model[key] = join[key]
      }
    }

    return model
  }
