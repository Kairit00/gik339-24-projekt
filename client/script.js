//variabel som innehålller vår address
const url = "http://localhost:3000/books";

window.addEventListener("load", fetchData) //när sidan laddats anropar vi det
function fetchData() {
    //Koppling mellan front-och-back end
    fetch(url)
        .then((result) => result.json())
        .then(books => {
            if(books.length > 0) {
                let html = `<div class="row mt-3 justify-content-center px-5">`; 
                //loop för att rita ut li element för varje book
                books.forEach((book) => {
                
                    html += ` <div class="col-md-5 mb-2">
                    <div class="card">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item bg-${getColourClass(book.colour)} text-black">
                                <h4>${book.title}</h4>
                                <h5>${book.author}</h5>
                                <h5>${book.genre}</h5>
                                <p>Året den släpptes: ${book.release_date}</p>
                                <div>
                                    <button class="btn custom-grey-btn" onclick="setCurrentBook(${book.book_id}, event)"> 
                                        Ändra
                                    </button>
                                    <button class="btn custom-grey-btn" onclick="deleteBook(${book.book_id}, event)">
                                        Ta bort
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>`
                });

                html += '</div>';

                //få tag på själva listContainern
                const listContainer = document.getElementById('listContainer');
                    listContainer.innerHTML = "";
                    listContainer.insertAdjacentHTML('beforeend', html);
                }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function setCurrentBook(id) {
    fetch(`${url}/${id}`)
        .then(result => result.json())
        .then(book => {
            console.log(book);
            booksForm.title.value = book.title; //få fram det som ståd i card till fältet
            booksForm.author.value = book.author;
            booksForm.genre.value = book.genre;
            booksForm.release_date.value = book.release_date;
            booksForm.colour.value = book.colour;

            //kolla om det är en ny eller befintlig bok
            const operationType = id ? "Update" : "Create";
            localStorage.setItem("currentId", book.book_id);
            showMessage(`${operationType} Editing book with ID ${id || book.book_id}`);
        });
}

function deleteBook(id) {
    console.log('delete',id);
    fetch(`${url}/${id}`, {method: 'DELETE'})
    .then(result => {
        showMessage("The Book was deleted")
        fetchData();
    })
    .catch(error => {
        console.error('Error deleting book:', error);
    });
}



//få färgerna
function getColourClass(colourName) {
    const colourMap = {
        'blue': 'primary',
        'green' : 'success',
        'red': 'danger',
        'purple': 'purple',
        'orange' : 'orange'
    };

    const colorClass = colourMap[colourName] || 'secondary';
        return colorClass;
}

//Få tag i formuläret
booksForm.addEventListener('submit', handleSubmit); //submitknappen

//ta hand om submitknappen
function handleSubmit(event) {
    event.preventDefault(); //eventlyssanre till submitknappen//nu laddar inte sidan om, standard är att sidan laddart om när man trycker på en submit knapp
    const serverBookObject = {
        title: booksForm.title.value,
        author: booksForm.author.value,
        genre: booksForm.genre.value,
        release_date: booksForm.release_date.value,
        colour: booksForm.colour.value
    };
    // serverBookObject.title = booksForm.title.value; //Få tag i vad som skrivits i formulärobjektet
    // serverBookObject.author = booksForm.author.value;
    // serverBookObject.genre = booksForm.genre.value;
    // serverBookObject.release_date = booksForm.release_date.value;
    // serverBookObject.colour = booksForm.colour.value; 

    //nu ska vi skicka den till servern
    const id = localStorage.getItem("currentId");
    if(id) {
        serverBookObject.book_id = id
    };

    const request = new Request(url, { //vi skapar ett nytt requestelement
        method: serverBookObject.book_id ? 'PUT' : 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(serverBookObject)
    });

    fetch(request)
    .then(response => {
        const operationType = id ? "Update" : "Create";
        showMessage(`${operationType} Book ${operationType.toLowerCase()}d successfully.`);
        fetchData();

        localStorage.removeItem('currentId');
        booksForm.reset();
    });
}
function showMessage(message) {
    // Set the message text in the modal
    document.getElementById("messageText").innerText = message;

    // Show the modal
    const messageModal = new bootstrap.Modal(document.getElementById('messageModal'));
    messageModal.show();
}