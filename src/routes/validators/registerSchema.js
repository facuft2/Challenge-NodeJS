module.exports = {
    type: 'object',
    required: ['email', 'firstName', 'lastName', 'password'],
    properties: {
        email: {
            type: 'string',
            pattern: '^\\S+@\\S+\\.\\S+$',
        },
        firstName: {
            type: 'string',
        },
        lastName: {
            type: 'string',
        },
        password: {
            type: 'string',
            minLength: 8,
        },
    },
    additionalProperties: false,
}