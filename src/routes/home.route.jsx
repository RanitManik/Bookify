import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavigationComponent } from "@/components/Navigation.component.jsx";
import BackgroundComponent from "@/components/Background.component.jsx";
import { useFirebase } from "@/context/firebase.context.jsx";
import BookListComponent from "@/components/BookList.component.jsx";

const HomeRoute = () => {
  const { user } = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

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
