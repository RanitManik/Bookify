import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFirebase } from "@/context/firebase.context.jsx";
import { NavigationComponent } from "@/components/Navigation.component.jsx";
import { BookDetailsComponent } from "@/components/BookDetails.component.jsx";
import { LoaderCircleComponent } from "@/components/LoaderCircle.component.jsx";

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
    if (user) {
      const fetchData = async () => {
        setDataLoading(true);
        setDataError(null);
        try {
          const doc = await getBookById(params.bookId);
          setData(doc.data());
        } catch (error) {
          setDataError(error.message);
        } finally {
          setDataLoading(false);
        }
      };
      fetchData();
    }
  }, [user, getBookById, params.bookId]);

  if (loading || dataLoading) {
    return <LoaderCircleComponent />;
  }

  if (!user || dataError) {
    return null;
  }

  if (!data) {
    return (
      <>
        <NavigationComponent />
        <main className="grid min-h-[80svh] place-items-center">
          <LoaderCircleComponent />
        </main>
      </>
    );
  }

  return (
    <>
      <NavigationComponent />
      <BookDetailsComponent data={data} bookId={params.bookId} />
    </>
  );
};

export default BookDetailsRoute;
