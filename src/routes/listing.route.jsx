import { NavigationComponent } from "@/components/Navigation.component.jsx";
import BackgroundComponent from "@/components/Background.component.jsx";
import { ListingFormComponent } from "@/components/Listing.component.jsx";
import { useFirebase } from "@/context/firebase.context.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { LoaderCircleComponent } from "@/components/LoaderCircle.component.jsx";

const ListingRoute = () => {
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
      <NavigationComponent initialSelected="Listing" />
      <BackgroundComponent>
        <ListingFormComponent />
      </BackgroundComponent>
    </>
  );
};

export default ListingRoute;
