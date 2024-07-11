import { NavigationComponent } from "@/components/navigation.component.jsx";
import BackgroundComponent from "@/components/Background.component.jsx";
import { ListingFormComponent } from "@/components/Listing.component.jsx";
import { useFirebase } from "@/context/firebase.context.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ListingRoute = () => {
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
      <NavigationComponent initialSelected="Listing" />
      <BackgroundComponent>
        <ListingFormComponent />
      </BackgroundComponent>
    </>
  );
};

export default ListingRoute;
