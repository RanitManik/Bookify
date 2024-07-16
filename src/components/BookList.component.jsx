import { useEffect, useState } from "react";
import { useFirebase } from "@/context/firebase.context.jsx";
import { CardForListedBooksComponent } from "@/components/CardForListedBooks.component.jsx";
import { LoaderCircleComponent } from "@/components/LoaderCircle.component.jsx";
import { DataOfflineErrorComponent } from "@/components/DataOfflineError.component.jsx";
import { NoBookDataErrorComponent } from "@/components/NoBookDataError.component.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Loader2 } from "lucide-react";

const BookListComponent = () => {
  const { getListBooks, resetPagination } = useFirebase();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataError, setDataError] = useState(null);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    resetPagination();

    const fetchBooks = async () => {
      setLoading(true);
      setDataError(null);
      try {
        const booksSnapshot = await getListBooks();
        if (booksSnapshot) {
          const isFromCache = booksSnapshot.metadata.fromCache;
          if (isFromCache) {
            console.warn("Data is from cache.");
            setDataError({
              message:
                "The server timed out waiting for your request. Please check your internet connection and try again. If the problem persists, contact support for assistance.",
              code: "Request timeout",
            });
          } else {
            setBooks(
              booksSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
            );

            setHasMore(booksSnapshot.docs.length > 0);
          }
        } else {
          console.warn("No books found in the fetched snapshot.");
          setBooks([]);
        }
      } catch (err) {
        console.error("Error fetching books:", err);
        setDataError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [getListBooks, resetPagination]);

  const fetchNextPage = async () => {
    if (!hasMore || isNextPageLoading) return;

    setIsNextPageLoading(true);
    setDataError(null);
    try {
      const booksSnapshot = await getListBooks(12, true);
      if (booksSnapshot) {
        const isFromCache = booksSnapshot.metadata.fromCache;
        if (isFromCache) {
          console.warn("Data is from cache.");
          setDataError({
            message:
              "The server timed out waiting for your request. Please check your internet connection and try again. If the problem persists, contact support for assistance.",
            code: "Request timeout",
          });
        } else {
          const newBooks = booksSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setBooks((prevBooks) => [...prevBooks, ...newBooks]);
          setHasMore(booksSnapshot.docs.length > 0);
        }
      } else {
        console.warn("No more books to fetch.");
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching next page:", err);
      setDataError(err.message);
    } finally {
      setIsNextPageLoading(false);
    }
  };

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
    <main className="relative m-auto mb-20 flex flex-wrap items-stretch justify-center gap-x-4 gap-y-8 px-4 py-8 pb-20 pt-10 duration-200 animate-in fade-in slide-in-from-bottom-48 sm:max-w-[min(90%,_1200px)] sm:px-6">
      {books.map((book) => (
        <CardForListedBooksComponent key={book.id} id={book.id} {...book} />
      ))}
      <div className="absolute bottom-0">
        {isNextPageLoading ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button onClick={fetchNextPage} disabled={!hasMore}>
            {hasMore ? "See More" : "No more books available"}
          </Button>
        )}
      </div>
    </main>
  );
};

export default BookListComponent;
