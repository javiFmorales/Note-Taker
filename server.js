const express = require('express');
const app = express();
const PORT = process.env.Port || 3001;


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


function createNewNote(note, notesArray) {
    console.log(note)
    const newNote = {
        ...note,
        id:  short.generate() 
    }
    console.log(newNote)
    notesArray.push(newNote);
    fs.writeFileSync(path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2))
}  


//post route
app.post('/api/notes', (req, res) => {
    console.log("inside API")
    const note = createNewNote(req.body, db);
    res.json(note);
    //might not be right , trying to append the body i created 
    //note.push(req.body)
});


// function deleteNote(id, notesArray) {
//     for (let i = 0; i < notesArray.length; i++) {
//         let note = notesArray[i]
//         if (note.id == id) {
//             notesArray.splice(i, 1);
//             fs.writeFileSync(
//                 path.join(__dirname, './db/db.json'),
//                 JSON.stringify(notesArray, null, 2)
//             );
//             break;



//         }
//     }
// }

// app.delete('./api/notes/:id', (req, res) => {
//     deleteNote(req.params.id, db);
//     res.json("note has been added");
// });

app.listen(PORT, () => {
    console.log(`NOW LISTENING ON ${PORT}`);
})

