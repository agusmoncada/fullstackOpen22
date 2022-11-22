const { response, request } = require('express')
require('dotenv').config({ path: './.env' })
const Person = require('./models/person')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

app.use(express.static('build'))

app.use(express.json())

app.use(cors())

morgan.token('body', request => JSON.stringify(request.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (request, response) => {
    Person
        .find({})
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            response.status(500).end()
        })
})

app.get('/info', (request, response) => {
    Person
        .find({})
        .then(person => response.send(`phonebook has info for ${person.length} people <br> ${new Date()}`))    
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person
        .findByIdAndRemove(request.params.id)
        .then(result =>  response.status(204).end())
        .catch(error => next(error))
})

const generateID = () => {
    return Math.floor(Math.random() * 500);
}

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    //validation now occurs in personSchema by mongoose
    /*if (!body.name) {
        return response.status(400).json({error: 'name is missing'})
    }

    if (!body.number) {
        return response.status(400).json({error: 'number is missing'})
    }*/

    Person
        .find({})
        .then(persons => {
            const alreadyExists = persons.map(person => person.name.toLowerCase()).includes(body.name.toLowerCase())

            if (alreadyExists) {
                return response.status(400).json({error: 'name already exists'})
            }

            const person = new Person({
                id: generateID(),
                name: body.name,
                number: body.number,
                date: new Date() 
            })

            person
                .save()
                .then(savedPerson => response.json(savedPerson))
                .catch(error => next(error))
        })
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        number: body.number,
    }

    Person
        .findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
        .then(updatedPerson => response.json(updatedPerson))
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})