import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFirebase } from "@/context/firebase.context.jsx";
import { LoaderCircle } from "lucide-react";
import { NavigationComponent } from "@/components/Navigation.component.jsx";
import { BookDetailsComponent } from "@/components/BookDetails.component.jsx";

const BookDetailsRoute = () => {
  const { getBookById } = useFirebase();
  const params = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    getBookById(params.bookId).then((value) => {
      setData(value.data());
    });
  }, [getBookById, params.bookId]);

  if (!data)
    return (
      <>
        <NavigationComponent />
        <div className="grid min-h-[80svh] place-items-center">
          <div className="grid min-h-[80svh] place-items-center">
            <LoaderCircle className="h-20 w-20 animate-spin" />
          </div>
        </div>
      </>
    );

  return (
    <>
      <NavigationComponent />
      <BookDetailsComponent data={data} />
    </>
  );
};

export default BookDetailsRoute;
