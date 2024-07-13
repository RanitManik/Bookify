import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavigationComponent } from "@/components/Navigation.component.jsx";
import BackgroundComponent from "@/components/Background.component.jsx";
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

  return (
    <>
      <NavigationComponent />
      <BackgroundComponent>
        <BookListComponent />
      </BackgroundComponent>
    </>
  );
};

export default HomeRoute;
