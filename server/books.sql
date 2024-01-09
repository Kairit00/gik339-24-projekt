DROP TABLE IF EXISTS books;
CREATE TABLE books (
    book_id INTEGER PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    author VARCHAR(50) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    release_date INT NOT NULL,
    colour VARCHAR(10) NOT NULL
);
INSERT INTO books (title, author, genre, release_date, colour)
VALUES
    ('To Kill a Mockingbird', 'Harper Lee', 'Fiction, Southern', 1960, 'red'),
    (1984, 'George Orwell', 'Dystopian, Political fiction', 1949, 'blue'),
    ('Pride and Prejudice', 'Jane Austen', 'Classic, Romance', 1813, 'red'),
    ('The Old Man and the Sea', 'Ernest Hemingway', 'Fiction, Novella',1952, 'blue'),
    ('Harry Potter and the Philosophers Stone', 'J.K. Rowling', 'Fantasy',1997, 'orange'),
    ('The Lord of the Rings', 'J.R.R. Tolkien', 'Fantasy', 1954, 'purple'),
    ('To the Lighthouse', 'Virginia Woolf', 'Modernist, Stream of consciousness', 1927, 'green'),
    ('The Hunger Games', 'Suzanne Collins', 'Dystopian, Science Fiction',2008, 'red'),
    ('The Great Gatsby', 'F.Scott Fitzgerald', 'Fiction, Jazz Age, Tragedy', 1925, 'purple'),
    ('One Hundred Years of Solitude', 'Gabriel García Márquez', 'Magic Realism', 1967, 'orange');


    

select * from books;