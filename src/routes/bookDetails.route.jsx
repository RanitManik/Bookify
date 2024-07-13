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
                  "The book you are looking for does not exist. It might have been removed or the ID is incorrect.",
                code: "Not found",
              });
            }
          }
        } catch (error) {
          if (isMounted) {
            setDataError({
              message:
                "Could not reach Cloud Firestore. Please check your internet connection and try again.",
              code: error.code || "unavailable",
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
      case "unavailable":
        return (
          <>
            <div className="text-center">
              <DataOfflineErrorComponent dataError={dataError} />
            </div>
          </>
        );
      default:
        return (
          <>
            <div className="text-center">
              <DataErrorComponent dataError={dataError} />
            </div>
          </>
        );
    }
  }

  if (!data) {
    return (
      <>
        <main className="grid min-h-[80svh] place-items-center">
          <LoaderCircleComponent />
        </main>
      </>
    );
  }

  return (
    <>
      <BookDetailsComponent data={data} bookId={params.bookId} />
    </>
  );
};

export default BookDetailsRoute;
