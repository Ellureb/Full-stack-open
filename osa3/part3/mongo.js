const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://elinatoivonen_db_user:${password}@cluster0.ouyveva.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

/*const note = new Note({
    content: 'HTML is easy',
    important: true,
})

const note2 = new Note({
    content: 'Testimuistiojee',
    important: true,
})

const note3 = new Note({
    content: 'Testimuistio2 jeeee',
    important: false,
})

Promise.all([
    note.save(),
    note2.save(),
    note3.save()
]).then(results => {
    console.log('notes saved!')
    mongoose.connection.close()
})*/

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})