const ajv = require('ajv')

const validator = new ajv({ allErrors: true, async: true })

const validateInput =
  (inputValidator, ctx = 'body') =>
  (req, res, next) => {
    const validate = validator.compile(inputValidator)
    const valid = validate(req[`${ctx}`])

    if (!valid) {

      if (validate.errors[0].keyword === 'required') {
        return res.status(400).send({
          error: `${validate.errors[0].params.missingProperty} is required`,
        })
      }

      if (validate.errors[0].keyword === 'minLength') {
        return res.status(400).send({
          error: 'Password must be at least 8 characters',
        })
      }

      if (validate.errors[0].keyword === 'pattern') {
        return res.status(400).send({
          error: 'Invalid email',
        })
      }
    }

    return next()
  }

module.exports = validateInput
