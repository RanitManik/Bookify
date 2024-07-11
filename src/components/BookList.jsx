import { useEffect, useState } from "react";
import { useFirebase } from "@/context/firebase.jsx";
import { CardForListedBooks } from "@/components/CardForListedBooks.jsx";
import { LoaderCircle } from "lucide-react";

const BookList = () => {
  const { getListAllBooks } = useFirebase();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getListAllBooks().then((books) => {
      setBooks(books.docs);
    });
  }, [getListAllBooks]);

  if (books.length === 0) {
    return (
      <div className="grid min-h-[80svh] place-items-center">
        <LoaderCircle className="h-20 w-20 animate-spin" />
      </div>
    );
  }

  return (
    <div className="m-auto flex flex-wrap items-stretch justify-center gap-x-4 gap-y-8 py-8 sm:max-w-[min(90%,_1200px)]">
      {books.map((book) => (
        <CardForListedBooks key={book.id} id={book.id} {...book.data()} />
      ))}
    </div>
  );
};

export default BookList;
