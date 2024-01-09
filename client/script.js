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
                            <button class="btn custom-grey-btn">
                                Ändra
                            </button>
                            <button class="btn custom-grey-btn">
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
        } else {
            console.log("No books found.");
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}


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

console.log(booksForm);
booksForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
}
