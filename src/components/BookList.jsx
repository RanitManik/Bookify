import { useEffect, useState } from "react";
import { useFirebase } from "@/context/firebase.jsx";
import { CardForListedBooks } from "@/components/CardForListedBooks.jsx";

const BookList = () => {
  const { getListAllBooks } = useFirebase();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getListAllBooks().then((books) => {
      setBooks(books.docs);
    });
  }, []);

  return (
    <div className="m-auto flex flex-wrap items-stretch justify-center gap-x-4 gap-y-8 py-8 sm:max-w-[min(90%,_1200px)]">
      {books.map((book) => (
        <CardForListedBooks key={book.id} {...book.data()} />
      ))}
    </div>
  );
};

export default BookList;
