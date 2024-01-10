//npm install --save express sqlite3
const sqlite = require('sqlite3').verbose(); //för att använda sqlite3
const db = new sqlite.Database("./gik339.db"); //databaskoppling

//db.all("SELECT * FROM books", (err, rows) => console.log(rows));//testa databas så att allting fungerar
//Sätta upp webbservern
const express = require('express'); //exprpess modulen
const server = express(); //vår server

//standardinställningar
//skicka och få data genom JSON format, hur data avkodas i våran server
server.use(express.json()).use(express.urlencoded({extended: false}))
.use((req, res, next) => { 
    res.header('Access-Control-Allow-Origin', '*'); //tillåter kommunikation från vissa ställen, alla anropar vår server, typ.
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');

    next(); //Nu ska den forstätta att processa förfrågan enligt kommande regler, alltså att det föregående fortsätter
});

//starta upp servern på port 3000
server.listen(3000, () => {
    console.log('Servern körs på http://localhost:3000')
});

//get-request, /books är våran route för get-förfrågningar
server.get('/books', (req, res) => { //req- (request) arbeta med förfårgan, res -  (response) arbeta med svar
    const sql = 'SELECT * FROM books'; //väljer allt från table books

    db.all(sql, (err, rows) => { 
        if(err) { //om det blir fel, visa vad felet blev
            res.status(500).send(err);
        } else {
            res.send(rows); //om allt gick bra så skickar vi raderna som kommer från förfrågningen
        }
    })
});
//hämta upp en användare för att kunna ändra
server.get('/books/:id', (req, res) => {
    const id = req.params.id;

    const sql = `SELECT * FROM books WHERE book_id=${id}`; //väljer allt från table books

    db.all(sql, (err, rows) => { 
        if(err) { //om det blir fel, visa vad felet blev
            res.status(500).send(err);
        } else {
            res.send(rows[0]); //om allt gick bra så skickar vi raderna som kommer från förfrågningen
        }
    })
});

//post-request
server.post('/books', (req, res) => { // vi kan tillochmed se i terminalen vad man har skrivit
    const book = req.body;
    const sql = `INSERT INTO books(title, author, genre, release_date, colour) VALUES
    (?, ?, ?, ?, ?)`;

    db.run(sql, Object.values(book), (err) => { 
        if(err) { //om nått skulle gå fel, skicka felmeddelandet
            console.log(err); 
            res.status(500).send(err);
        } else {
            res.send('Boken sparades');
        }
    });
});

//put-update
server.put('/books', (req, res) => {
    //mål: UPDATE users SET title="something", samma med alla kategorier, where id=1
    const bodyData = req.body;

    const id = bodyData.book_id;
    const book = {
        title: bodyData.title, 
        author: bodyData.author,
        genre: bodyData.genre,
        release_date: bodyData.release_date,
        colour: bodyData.colour
    };
    let updateString = '';
    const columnsArray = Object.keys(book);
    columnsArray.forEach((column, i) => {
        updateString += `${column}="${book[column]}"`;//hämta ut värdet hos varje key (title, author, osv.)
        if(i !== columnsArray.length -1) updateString += ','; //om vi inte står på sista elementet, lägg till ett kommatecken

    });
    const sql = `UPDATE books SET ${updateString} WHERE book_id=${id}`;

    db.run(sql, (err) => { 
        if(err) { //om nått skulle gå fel, skicka felmeddelandet
            console.log(err); 
            res.status(500).send(err);
        } else {
            res.send('Boken uppdaterades');
        }
    });

});

//delete - funktion
server.delete('/books/:id', (req, res) => {
    const id = req.params.id; //få tag i boken som ska tas bort
    const sql = `DELETE FROM books WHERE book_id=${id}`; //sql query för att ta bort boken

    db.run(sql, (err) => {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send('Boken borttagen');
        }
    });

});

