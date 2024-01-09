//variabel som innehålller vår address
const url = "http://localhost:3000/books";

//Koppling mellan front-och-back end
fetch(url)
    .then((result) => result.json())
    .then(books => {
    let html = ``;
});