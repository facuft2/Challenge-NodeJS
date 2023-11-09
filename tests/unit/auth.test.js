const request = require('supertest')
const app = require('../../app')

describe('POST /register', () => {
  it('should respond with a 200 status code', async () => {
    const data = {
      firstName: 'Jhon',
      lastName: 'Doe',
      email: 'example@example.com',
      password: 'example123',
    }
    const response = await request(app).post('/auth/register').send(data)
    expect(response.statusCode).toBe(201)
  }),
    it('should return that there are missing fields', async () => {
      const data = {}
      const response = await request(app).post('/auth/register').send(data)
      expect(response.statusCode).toBe(400)
    }),
    it('should return that the email is invalid', async () => {
      const data = {
        firstName: 'Jhon',
        lastName: 'Doe',
        email: 'exampleexample.com',
        password: 'example123',
      }
      const response = await request(app).post('/auth/register').send(data)
      expect(response.statusCode).toBe(400)
    }),
    it('should return that the password is invalid', async () => {
      const data = {
        firstName: 'Jhon',
        lastName: 'Doe',
        email: 'example@example.com',
        password: 'example',
      }
      const response = await request(app).post('/auth/register').send(data)
      expect(response.statusCode).toBe(400)
    }),
    it('should return that the email is already registered', async () => {
      const data = {
        firstName: 'Jhon',
        lastName: 'Doe',
        email: 'example@example.com',
        password: 'example123',
      }
      const response = await request(app).post('/auth/register').send(data)
      expect(response.statusCode).toBe(400)
    })
})

describe('POST /login', () => {
  it('should respond with a 200 status code', async () => {
    const data = {
      email: 'example@example.com',
      password: 'example123',
    }
    const response = await request(app).post('/auth/login').send(data)
    expect(response.statusCode).toBe(200)
  })

  it('should return that there are missing fields', async () => {
    const data = {}
    const response = await request(app).post('/auth/login').send(data)
    expect(response.statusCode).toBe(400)
  })

  it('should return that the email is invalid', async () => {
    const data = {
      email: 'exampleexample.com',
      password: 'example123',
    }
    const response = await request(app).post('/auth/login').send(data)
    expect(response.statusCode).toBe(400)
  })

  it('should return that the password is invalid', async () => {
    const data = {
      email: 'example@example.com',
      password: 'example',
    }
    const response = await request(app).post('/auth/login').send(data)
    expect(response.statusCode).toBe(400)
  })

  it('should return that the email is not registered', async () => {
    const data = {
      email: 'example123@example.com',
      password: 'example123',
    }
    const response = await request(app).post('/auth/login').send(data)
    expect(response.statusCode).toBe(400)
  })
})
