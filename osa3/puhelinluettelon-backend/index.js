require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', (req, res) => {
    return req.method === 'POST'
      ? JSON.stringify(req.body)
      : ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// teinkin tehtävän 3.18 jo aiemmassa commitissa huomaamattani :-)
app.get('/info', (req, res) => {
    Person.countDocuments({}).then(count => {
        const currentTime = new Date()
        const info = `
          <p>Phonebook has info for ${count} people</p>
          <p>${currentTime}</p>
        `
        res.send(info)
    })
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

// teinkin tehtävän 3.18 jo aiemmassa commitissa huomaamattani :-)
app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
      .then(person => {
        if(person) {
            res.json(person)
        } else {
            res.status(404).end()
        }
      })
      .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
      .then(result => {
        res.status(204).end()
      })
      .catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'name and number required'
        })
    }

    /*if (persons.find(person => person.name === body.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    } */

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})