const router = require('express').Router();
const db = require('../db/db.json') 
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helper/fsutils');

router.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


router.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

router.delete('/:id', (req, res) => {
  readFromFile('./db/db.json').then((data) => {
    let notes = JSON.parse(data)
    console.log(notes)

    let filteredNotes = notes.filter(note => note.id != req.params.id)
    console.log(filteredNotes)

    writeToFile('./db/db.json' ,filteredNotes, './db/db.json');
    res.json(`Note deleted successfully 🚀`);
  });
})

module.exports = router