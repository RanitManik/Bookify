import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "@/context/firebase.context.jsx";
import BookListComponent from "@/components/BookList.component.jsx";
import { LoaderCircleComponent } from "@/components/LoaderCircle.component.jsx";

const HomeRoute = () => {
  const { user, loading } = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <LoaderCircleComponent />;
  }

  if (!user) return null;

  return <BookListComponent />;
};

export default HomeRoute;
