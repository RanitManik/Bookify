import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFirebase } from "@/context/firebase.jsx";
import { LoaderCircle } from "lucide-react";

const BookDetailRoute = () => {
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
      <div className="grid min-h-[80svh] place-items-center">
        <div className="grid min-h-[80svh] place-items-center">
          <LoaderCircle className="h-20 w-20 animate-spin" />
        </div>
      </div>
    );

  return (
    <>
      <p>{data.name}</p>
    </>
  );
};

export default BookDetailRoute;
