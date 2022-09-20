const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;


const fs = require('fs');
const path = require('path');

const short = require('short-uuid');





const db = require('./db/db.json');

//middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//get routes
app.get('/api/notes', (req, res) => {
    res.json(db)
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


function createNewNote(note, notesArr) {
    console.log(note)
    const newNote = {
        ...note,
        id:  short.generate() 
    }
    console.log(newNote)
    notesArr.push(newNote);
    fs.writeFileSync(path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArr, null, 2))
}  


//post route
app.post('/api/notes', (req, res) => {
    console.log("inside API")
    const note = createNewNote(req.body, db);
    res.json(note);
   
});


app.listen(PORT, () => {
    console.log(`NOW LISTENING ON ${PORT}`);
})

