const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const user = require('../models/user')

const api = supertest(app)

describe('posting users is rejected if', () => {
    
    test('username has less than 2 characters', async () => {
        const badUsername = await helper.newBadUser    
        
        const response = await api
            .post('/api/users')
            .send(badUsername[0])
            .expect(400)
        
        expect(response._body.error).toBe('username must be longer than 2 characters')
    })

    test('password has less than 2 characters, with suitable error mesagge', async () => {
        const badUsername = await helper.newBadUser    
        
        const response = await api
            .post('/api/users')
            .send(badUsername[1])
            .expect(400)
        
        expect(response._body.error).toBe('password must be 3 characters or more')
    })
})

afterAll(() => {
    mongoose.connection.close()
})

