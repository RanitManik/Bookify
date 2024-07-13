import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFirebase } from "@/context/firebase.context.jsx";
import { BookDetailsComponent } from "@/components/BookDetails.component.jsx";
import { LoaderCircleComponent } from "@/components/LoaderCircle.component.jsx";
import { DataErrorComponent } from "@/components/DataError.component.jsx";
import { DataOfflineErrorComponent } from "@/components/DataOfflineError.component.jsx";

const BookDetailsRoute = () => {
  const { getBookById, user, loading } = useFirebase();
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataError, setDataError] = useState(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    let isMounted = true;

    if (user) {
      const fetchData = async () => {
        setDataLoading(true);
        setDataError(null);
        try {
          const doc = await getBookById(params.bookId);
          if (isMounted) {
            if (doc && doc.exists()) {
              setData(doc.data());
            } else {
              setDataError({
                message:
                  "The book you are looking for does not exist. It may have been removed, or the book ID you entered might be incorrect. Please verify the ID and try again.",
                code: "Book Not found",
              });
            }
          }
        } catch (error) {
          if (isMounted) {
            setDataError({
              message:
                "The server timed out waiting for your request. Please check your internet connection and try again. If the problem persists, contact support for assistance.",
              code: "Request timeout",
            });
          }
        } finally {
          if (isMounted) {
            setDataLoading(false);
          }
        }
      };
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [user, getBookById, params.bookId]);

  if (loading || dataLoading) {
    return <LoaderCircleComponent />;
  }

  if (!user) {
    return null;
  }

  if (dataError) {
    switch (dataError.code) {
      case "Request timeout":
        return <DataOfflineErrorComponent dataError={dataError} />;
      default:
        return <DataErrorComponent dataError={dataError} />;
    }
  }

  if (!data) {
    return <LoaderCircleComponent />;
  }

  return (
    <>
      <BookDetailsComponent data={data} bookId={params.bookId} />
    </>
  );
};

export default BookDetailsRoute;
