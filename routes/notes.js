const router = require('express').Router();
const db = require('../db/db.json') //if can't reach server look at this pathing.
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helper/fsutils');
// GET /api/notes should read the db.json file and return all saved notes as JSON.
router.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
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

    writeToFile('./db/db.json' ,filteredNotes);
    res.json(`Note deleted successfully 🚀`);
  });
})

module.exports = router