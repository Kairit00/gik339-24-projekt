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
    ('To Kill a Mockingbird', 'Harper Lee', 'Skönlitteratur', 1960, 'red'),
    (1984, 'George Orwell', 'Dystopisk, Politisk skönlitteratur', 1949, 'blue'),
    ('Pride and Prejudice', 'Jane Austen', 'Klassisk, Romantik', 1813, 'red'),
    ('The Old Man and the Sea', 'Ernest Hemingway', 'Skönlitteratur, Novell',1952, 'blue'),
    ('Harry Potter and the Philosophers Stone', 'J.K. Rowling', 'Fantasy',1997, 'orange'),
    ('The Lord of the Rings', 'J.R.R. Tolkien', 'Fantasy', 1954, 'purple'),
    ('To the Lighthouse', 'Virginia Woolf', ' Modernistisk, Medvetandeström', 1927, 'green'),
    ('The Hunger Games', 'Suzanne Collins', 'Dystopisk, Science Fiction',2008, 'red'),
    ('The Great Gatsby', 'F.Scott Fitzgerald', 'Skönlitteratur, Jazzåldern, Tragedi', 1925, 'purple'),
    ('One Hundred Years of Solitude', 'Gabriel García Márquez', ' Magisk Realism', 1967, 'orange');


    

select * from books;