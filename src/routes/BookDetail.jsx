import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFirebase } from "@/context/firebase.jsx";
import { assets } from "@/assets/assets.js";

const BookDetail = () => {
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
        <assets.Progress className="h-20 w-20" />
      </div>
    );

  return (
    <>
      <p>{data.name}</p>
    </>
  );
};

export default BookDetail;
