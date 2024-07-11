import { useEffect, useState } from "react";
import { useFirebase } from "@/context/firebase.context.jsx";
import { CardForListedBooksComponent } from "@/components/CardForListedBooks.component.jsx";
import { LoaderCircle } from "lucide-react";

const BookListComponent = () => {
  const { getListAllBooks } = useFirebase();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getListAllBooks().then((books) => {
      setBooks(books.docs);
    });
  }, [getListAllBooks]);

  if (books.length === 0) {
    return (
      <div className="grid min-h-[min(80svh,_1000px)] place-items-center">
        <LoaderCircle className="h-20 w-20 animate-spin" />
      </div>
    );
  }

  return (
    <div className="m-auto flex flex-wrap items-stretch justify-center gap-x-4 gap-y-8 py-8 duration-200 animate-in fade-in sm:max-w-[min(90%,_1200px)]">
      {books.map((book) => (
        <CardForListedBooksComponent
          key={book.id}
          id={book.id}
          {...book.data()}
        />
      ))}
    </div>
  );
};

export default BookListComponent;
