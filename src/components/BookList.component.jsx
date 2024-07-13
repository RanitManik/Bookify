import { useEffect, useState } from "react";
import { useFirebase } from "@/context/firebase.context.jsx";
import { CardForListedBooksComponent } from "@/components/CardForListedBooks.component.jsx";
import { LoaderCircleComponent } from "@/components/LoaderCircle.component.jsx";
import { DataOfflineErrorComponent } from "@/components/DataOfflineError.component.jsx";
import { NoBookDataErrorComponent } from "@/components/NoBookDataError.component.jsx";

const BookListComponent = () => {
  const { getListAllBooks } = useFirebase();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataError, setDataError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setDataError(null);
      try {
        const booksSnapshot = await getListAllBooks();

        if (booksSnapshot) {
          // Check if the data is from the cache
          const isFromCache = booksSnapshot.metadata.fromCache;
          if (isFromCache) {
            console.warn("Data is from cache.");
            // Handle case where books might be empty due to cache
            setDataError({
              message:
                "The server timed out waiting for your request. Please check your internet connection and try again. If the problem persists, contact support for assistance.",
              code: "Request timeout",
            });
          } else {
            setBooks(booksSnapshot.docs);
          }
        } else {
          console.warn("No books found in the fetched snapshot.");
          setBooks([]);
        }
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [getListAllBooks]);

  if (loading) {
    return <LoaderCircleComponent />;
  }

  if (dataError) {
    return <DataOfflineErrorComponent dataError={dataError} />;
  }

  if (books.length === 0) {
    return <NoBookDataErrorComponent />;
  }

  return (
    <main className="m-auto flex flex-wrap items-stretch justify-center gap-x-4 gap-y-8 py-8 duration-200 animate-in slide-in-from-bottom sm:max-w-[min(90%,_1200px)]">
      {books.map((book) => (
        <CardForListedBooksComponent
          key={book.id}
          id={book.id}
          {...book.data()}
        />
      ))}
    </main>
  );
};

export default BookListComponent;
