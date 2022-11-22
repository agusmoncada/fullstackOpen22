const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]
const username = 'agusmonc92'

const url = `mongodb+srv://${username}:${password}@fullstackopen.rnhnfrf.mongodb.net/phoneBook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')
    
    if (personName) {
        const person = new Person({
            name: personName,
            number: personNumber,
        })
      
        return person.save()
    } else {
        Person
        .find({})
        .then(result => {
            console.log('phonebook:')
            result.forEach(person => {
                console.log(person.name, person.number)
            })
            mongoose.connection.close()
        })
    }
  })
  .then(() => {
    if (personName) {
        console.log(`added ${personName} ${personNumber} to phonebook`)
    }
    
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))