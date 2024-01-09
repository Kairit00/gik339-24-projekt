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
})

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
})